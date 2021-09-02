import * as React from "react"

import { Steps } from "../../util/factory-steps"
import Card from "../cardSelect/card"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine"

import "./style/factory.scss"
import { useBalance, useNetwork } from "../../hooks/useNetwork"
import {
  Error,
  FeatureIds,
  NetworkConstants,
  NetworkFromChainId,
  NumberMap,
  TokenTypeIds,
  TokenTypes,
} from "../../util/Constants"
import { useAuthState } from "../../context"
import { useCartDispatch, useCartState } from "../../context/context"
import { useImageForData } from "../../hooks/useAllImages"
import { CartContent } from "../Cart/cart"

const FactorySteps = props => {
  const [successStep, setSuccessStep] = React.useState(new Set([0]))
  const [currentStep, setCurrentStep] = React.useState(1)
  const [index, setIndex] = React.useState(0)
  const [tokenType, setTokenType] = React.useState(null)
  const [tokenDetails, setTokenDetails] = React.useState({
    Name: null,
    Symbol: null,
    Supply: null,
    SupplyUnit: null,
    Decimals: 18,
  })
  const incrementStep = () => {
    console.debug("Current Step: ", currentStep, " Success Step", successStep)

    if (successStep.has(currentStep)) {
      setIndex(index + 1)
      setCurrentStep(currentStep + 1)
    }
    console.log("Moving to step number: ", currentStep)
  }

  const decrementStep = () => {
    console.debug("Current Step: ", currentStep, " Success Step", successStep)
    if (currentStep !== 1) {
      setIndex(index - 1)
      setCurrentStep(currentStep - 1)
      console.debug("Moving to step number: ", currentStep)
    }
  }

  const moveToStep = step => {
    console.debug("Current Step: ", currentStep, " Moving to Step", step)
    if (successStep.has(step)) {
      setCurrentStep(step)
    }
  }

  const setTypeAndSuccess = (typeSelected, newSuccessStep) => {
    setTokenType(typeSelected)
    setSuccessStep(new Set(successStep).add(newSuccessStep))
  }

  const setTokenDetailsAndSuccess = (tokenDetailsProvided, newSuccessStep) => {
    console.debug("TOKEN DETAILS: ", tokenDetailsProvided)
    setTokenDetails(tokenDetailsProvided)
    setSuccessStep(new Set(successStep).add(newSuccessStep))
  }

  const handleFailure = index => {
    successStep.delete(index)
    setSuccessStep(new Set(successStep))
  }

  React.useEffect(() => {
    console.debug("EFFECT 5")
    // if ((currentStep === 3 && tokenType === 0) || currentStep == 4) {
    if (currentStep === 3 && tokenType === 0) {
      console.debug(
        "Effect: Current Step: ",
        currentStep,
        " tokenType: ",
        tokenType
      )
      setSuccessStep(new Set(successStep).add(currentStep))
    }
  }, [currentStep, tokenType])

  return (
    <div className="custom-steps-container">
      <div className="columns" id="chevrom-left">
        <div className="column chevrons" type="button">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={`${
              currentStep == 1 ? "chevron-inactive" : "chevron-active"
            }`}
            onClick={() => decrementStep()}
          />
        </div>
      </div>
      <div className="columns step-columns" id="steps-container">
        <div className="column is-full" id="steps">
          {currentStep === 1 ? (
            <Step1
              network={props.network}
              onSuccess={typeSelected => setTypeAndSuccess(typeSelected, 1)}
              key={0}
            />
          ) : currentStep === 2 ? (
            <Step2
              className="ind-step"
              network={props.network}
              onSuccess={tokenDetailsProvided =>
                setTokenDetailsAndSuccess(tokenDetailsProvided, 2)
              }
              key={1}
              type={tokenType}
            />
          ) : currentStep === 3 ? (
            <Step3
              className="ind-step"
              network={props.network}
              onSuccess={() => setSuccessStep(new Set(successStep).add(3))}
              onFailure={() => handleFailure(3)}
              key={2}
              type={tokenType}
              tokenDetails={tokenDetails}
            />
          ) : currentStep === 4 ? (
            // <Step4
            //   className="ind-step"
            //   network={props.network}
            //   onSuccess={() => setSuccessStep(new Set(successStep).add(4))}
            //   key={3}
            // />
            <FinalStep />
          ) : (
            // <Step5 network={props.network} key={4} />
            ``
          )}
        </div>
        <div className="column" id="breadcrumb">
          <StepBreadCrumb
            key={[successStep, currentStep]}
            activeStep={currentStep}
            successStep={successStep}
            moveToStep={moveToStep}
          />
        </div>
      </div>
      <div className="columns" id="chevrom-right">
        <div
          className={`column chevrons`}
          type="button"
          disabled={
            successStep.has(currentStep) && currentStep !== 5 ? false : true
          }
          onClick={() => incrementStep()}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`${
              successStep.has(currentStep) && currentStep !== 5
                ? "chevron-active"
                : "chevron-inactive"
            }`}
          />
        </div>
      </div>
    </div>
  )
}

const Step1 = props => {
  const [step1, _] = React.useState(Steps.Step1)
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const step1Card1 = step1.cardData[0]
  const step1Card2 = step1.cardData[1]

  const [selectedOption, setSelectedOption] = React.useState(
    cartState.step1.selectedToken
  )
  const [card1Error, setCard1Error] = React.useState()
  const [card2Error, setCard2Error] = React.useState()
  const [step1Fee, setStep1Fee] = React.useState(cartState.step1.totalFees)

  const [ableToPurchase, setAbleToPurchase] = React.useState({
    card1: false,
    card2: false,
  })
  const network = useNetwork()
  const balance = useBalance()
  React.useEffect(() => {
    if (network === undefined) {
      setCard1Error(Error.CONNECT_WALLET)
      setCard2Error(Error.CONNECT_WALLET)
    } else {
      setCard1Error(null)
      setCard2Error(null)
    }
  }, [network])

  React.useEffect(() => {
    if (!!balance) {
      if (balance >= step1Card1.price[network]) {
        setAbleToPurchase({
          ...ableToPurchase,
          card1: true,
        })
        setCard1Error(null)
      } else {
        setCard1Error(Error.NOT_ENOUGH_BALANCE)
      }
      if (balance >= step1Card2.price[network]) {
        setAbleToPurchase({
          ...ableToPurchase,
          card2: true,
        })
        setCard2Error(null)
      } else {
        setCard2Error(Error.NOT_ENOUGH_BALANCE)
      }
    }
  }, [balance])

  React.useEffect(() => {
    var fee = 0.0
    if (selectedOption === TokenTypeIds.GOVERNANCE) {
      fee = step1Card1.price[network]
    } else if (selectedOption === TokenTypeIds.FEE_ON_TRANSFER) {
      fee = step1Card2.price[network]
    }
    setStep1Fee(parseFloat(fee))
  }, [selectedOption])

  const setSelection = (selectedOption, selection) => {
    console.debug("STEP 1: Callback:: ", selectedOption)
    if (selection) {
      setSelectedOption(selectedOption)
      props.onSuccess(selectedOption)
    }
  }

  React.useEffect(() => {
    cartDispatch({
      step: 1,
      payload: {
        step1: {
          selectedToken: selectedOption,
          totalFees: cartState.step1.totalFees,
        },
      },
    })
    if (selectedOption === TokenTypeIds.FEE_ON_TRANSFER) {
      cartDispatch({
        step: 2,
        payload: {
          step2: {
            tokenName: cartState.step2.tokenName,
            tokenSymbol: cartState.step2.tokenSymbol,
            tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
            tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
            tokenDecimals: cartState.step2.tokenDecimals,
            dexSelected: cartState.step2.dexSelected,
            totalFees: 0,
          },
        },
      })
    } else if (selectedOption === TokenTypeIds.GOVERNANCE) {
      cartDispatch({
        step: 2,
        payload: {
          step2: {
            tokenName: cartState.step2.tokenName,
            tokenSymbol: cartState.step2.tokenSymbol,
            tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
            tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
            tokenDecimals: cartState.step2.tokenDecimals,
            dexSelected: false,
            totalFees: 0,
          },
        },
      })
    }
  }, [selectedOption])

  React.useEffect(() => {
    if (step1Fee !== cartState.step1.totalFees) {
      cartDispatch({
        step: 1,
        payload: {
          step1: {
            selectedToken: cartState.step1.selectedToken,
            totalFees: step1Fee,
          },
        },
      })
    }
  }, [step1Fee])

  const step1Card1Img = useImageForData(step1Card1.img)
  const step1Card2Img = useImageForData(step1Card2.img)

  return (
    <div className="columns step-columns has-text-centered step-ind">
      <div className="column">
        <StepTitle title={step1.title} />
      </div>
      <div className="column">
        <div className="columns step-rows">
          <div className="column">
            <Card
              id="step1-card1"
              type={step1Card1.type}
              error={card1Error}
              cardData={step1Card1}
              cardImage={step1Card1Img}
              network={network}
              cardIndex={0}
              selected={selectedOption === 0 ? true : false}
              onPress={selection => setSelection(0, selection)}
              selectionText="Select"
            />
          </div>
          <div className="column">
            <Card
              id="step1-card2"
              type={step1Card2.type}
              error={card2Error}
              cardData={step1Card2}
              cardImage={step1Card2Img}
              network={network}
              cardIndex={1}
              selected={selectedOption === 1 ? true : false}
              onPress={selection => setSelection(1, selection)}
              selectionText="Select"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Step2 = props => {
  // CONTEXT
  const user = useAuthState()
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()

  // STATE
  const [step, _] = React.useState(Steps.Step2)
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )
  const [dexSelected, setDexSelected] = React.useState(
    cartState.step2.dexSelected
  )
  const [tokenType, __] = React.useState(cartState.step1.selectedToken)
  const [tokenDetails, setTokenDetails] = React.useState({
    Name: cartState.step2.tokenName,
    Symbol: cartState.step2.tokenSymbol,
    Supply: cartState.step2.tokenSupplyNumber,
    SupplyUnit: cartState.step2.tokenSupplyUnits,
    Decimals: cartState.step2.tokenDecimals,
  })
  const [step2Fee, setStep2Fee] = React.useState(cartState.step2.totalFees)

  // DATA
  const card1 = step.cardData[0]
  const card2 = step.cardData[1]
  const card3 = step.cardData[2]

  // EFFECTS
  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])
  React.useEffect(() => {
    if (
      tokenDetails.Name !== null &&
      tokenDetails.Symbol !== null &&
      tokenDetails.Supply !== null &&
      tokenDetails.SupplyUnit !== null &&
      tokenDetails.Decimals !== 0
    ) {
      props.onSuccess(tokenDetails, 2)
      cartDispatch({
        step: 2,
        payload: {
          step2: {
            tokenName: tokenDetails.Name,
            tokenSymbol: tokenDetails.Symbol,
            tokenSupplyNumber: tokenDetails.Supply,
            tokenSupplyUnits: tokenDetails.SupplyUnit,
            tokenDecimals: tokenDetails.Decimals,
            dexSelected: dexSelected,
            totalFees: step2Fee,
          },
        },
      })
    }
  }, [tokenDetails, dexSelected])
  React.useEffect(() => {
    if (step2Fee !== cartState.step2.totalFees) {
      cartDispatch({
        step: 2,
        payload: {
          step2: {
            tokenName: cartState.step2.tokenName,
            tokenSymbol: cartState.step2.tokenSymbol,
            tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
            tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
            tokenDecimals: cartState.step2.tokenDecimals,
            dexSelected: cartState.step2.dexSelected,
            totalFees: step2Fee,
          },
        },
      })
    }
  }, [cartDispatch, step2Fee, cartState])
  React.useEffect(() => {
    if (tokenType === TokenTypeIds.GOVERNANCE && dexSelected) {
      setStep2Fee(card3.price[network])
    } else if (tokenType === TokenTypeIds.FEE_ON_TRANSFER || !dexSelected) {
      setStep2Fee(0)
    }
  }, [dexSelected, network])
  React.useEffect(() => {
    if (tokenType === TokenTypeIds.FEE_ON_TRANSFER) {
      setDexSelected(true)
    } else if (tokenType === TokenTypeIds.GOVERNANCE) {
      setDexSelected(cartState.step2.dexSelected)
    }
  }, [tokenType])

  // CALLBACKS
  const setSelection = selection => {
    if (tokenType === TokenTypeIds.GOVERNANCE) {
      setDexSelected(selection)
    }
  }
  const tokenNameCb = tokenName => {
    setTokenDetails({
      ...tokenDetails,
      Name: tokenName.target.value,
    })
  }
  const tokenSymbolCb = tokenSymbol => {
    setTokenDetails({
      ...tokenDetails,
      Symbol: tokenSymbol.target.value,
    })
  }
  const tokenSupplyCb = (tokenSupply, tokenSupplyUnit) => {
    setTokenDetails({
      ...tokenDetails,
      Supply: tokenSupply,
      SupplyUnit: tokenSupplyUnit,
    })
  }

  const step2Card3Img = useImageForData(card3.img[network])

  return (
    <div className="columns step-columns step-ind">
      <div className="column">
        <StepTitle title={step.title} />
      </div>
      <div className="column has-text-centered sub-title-container">
        <StepSubTitle
          subtitleMain={`Creating a ${TokenTypes[tokenType]}`}
          subtitleSub={`${
            tokenDetails.Supply !== null && tokenDetails.Symbol !== null
              ? `Creating ` +
                tokenDetails.Supply +
                ` ` +
                tokenDetails.SupplyUnit +
                ` ` +
                tokenDetails.Symbol +
                ` ` +
                TokenTypes[tokenType]
              : ` Your tokenomics should display here`
          }`}
        />
        <span className="floating-warn">
          <RiErrorWarningLine />
        </span>
      </div>
      <div className="column">
        <div className="columns step-rows">
          <div className="column">
            <Card
              id="step2-card1"
              type={card1.type}
              error={null}
              cardData={card1}
              callback={[tokenNameCb, tokenSymbolCb]}
              network={network}
              cardIndex={0}
              mandatory={true}
            />
          </div>
          <div className="column">
            <Card
              id="step2-card2"
              type={card2.type}
              error={null}
              cardData={card2}
              callback={tokenSupplyCb}
              network={network}
              cardIndex={1}
              mandatory={true}
            />
          </div>
          <div className="column">
            <Card
              id="step2-card3"
              type={card3.type}
              error={null}
              cardData={card3}
              cardImage={step2Card3Img}
              network={network}
              cardIndex={2}
              selected={dexSelected}
              onPress={selection => setSelection(selection)}
              selectionText={
                tokenType === TokenTypeIds.GOVERNANCE
                  ? dexSelected
                    ? "Remove from Contract"
                    : "Add to Contract"
                  : "In Your Contract"
              }
              mandatory={tokenType === TokenTypeIds.GOVERNANCE ? false : true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Step3 = props => {
  // CONTEXT
  const user = useAuthState()
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()

  // STATE
  const [step, _] = React.useState(Steps.Step3)
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )
  const [tokenType, __] = React.useState(cartState.step1.selectedToken)
  const [featuresSelected, setFeaturesSelected] = React.useState({
    features: [false, false, false, false, false],
  })
  const [featureFees, setFeatureFees] = React.useState({
    featureFees: [
      cartState.step3.auto_liquidation,
      cartState.step3.rfi_rewards,
      cartState.step3.anti_whale_protection,
      cartState.step3.auto_burn,
      cartState.step3.auto_charity,
    ],
  })
  const [totalFees, setTotalFees] = React.useState(
    parseFloat(cartState.step3.totalFees)
  )

  // DATA
  const card1 = step.cardData[0]
  const card2 = step.cardData[1]
  const card3 = step.cardData[2]
  const card4 = step.cardData[3]
  const card5 = step.cardData[4]

  // EFFECTS
  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])
  React.useEffect(() => {
    if (tokenType === TokenTypeIds.FEE_ON_TRANSFER) {
      setFeaturesSelected({
        features: [
          true,
          !!cartState.step3.rfi_rewards,
          !!cartState.step3.anti_whale_protection,
          !!cartState.step3.auto_burn,
          !!cartState.step3.auto_charity,
        ],
      })
    } else if (tokenType === TokenTypeIds.GOVERNANCE) {
      setFeaturesSelected({ features: [false, false, false, false, false] })
    }
  }, [tokenType])
  React.useEffect(() => {
    if (tokenType === TokenTypeIds.FEE_ON_TRANSFER) {
      let reqFullfilled = 0
      let failedReq = 0
      step.cardData.map((_, index) => {
        if (index !== 2) {
          if (
            (featuresSelected.features[index] &&
              featureFees.featureFees[index] > 0) ||
            !featuresSelected.features[index]
          ) {
            reqFullfilled++
          } else if (
            featuresSelected.features[index] ||
            featureFees.featureFees[index] <= 0
          ) {
            failedReq++
          }
        }
      })
      if (reqFullfilled > 0) {
        calculateTotalFees()
        props.onSuccess()
      }
      if (failedReq > 0) {
        props.onFailure()
      }
    } else if (tokenType === TokenTypeIds.GOVERNANCE) {
      props.onSuccess()
    }
  }, [featuresSelected, featureFees])
  React.useEffect(() => {
    cartDispatch({
      step: 3.6,
      payload: {
        step3: {
          auto_liquidation: cartState.step3.auto_liquidation,
          rfi_rewards: cartState.step3.rfi_rewards,
          anti_whale_protection: cartState.step3.anti_whale_protection,
          auto_burn: cartState.step3.auto_burn,
          auto_charity: cartState.step3.auto_charity,
          totalFees: totalFees,
        },
      },
    })
  }, [totalFees])

  // CALLBACKS
  const setSelection = (index, isSelected) => {
    const newArray = Array.from(featuresSelected.features)
    newArray[index] = isSelected
    setFeaturesSelected({ features: newArray })
  }

  const setFees = (index, fee) => {
    const newArray = Array.from(featureFees.featureFees)
    newArray[index] = parseFloat(fee)
    setFeatureFees({ featureFees: newArray })
  }

  const calculateTotalFees = () => {
    let fees = null
    featuresSelected.features.map((isFeatureSelected, i) => {
      if (i !== 2) {
        if (isFeatureSelected && featureFees.featureFees[i] !== null) {
          fees += parseFloat(featureFees.featureFees[i])
        }
      }
    })
    console.debug("Cart Selection: Step: Total fees calculated", fees)
    setTotalFees(fees)
  }

  const card1Img = useImageForData(card1.img[network])
  const card2Img = useImageForData(card2.img)
  const card3Img = useImageForData(card3.img)
  const card4Img = useImageForData(card4.img)
  const card5Img = useImageForData(card5.img)

  return (
    <>
      <div className="columns step-columns step-ind">
        <div className="column">
          <StepTitle title={step.title} />
        </div>
        <div className="column has-text-centered sub-title-container">
          <StepSubTitle
            subtitleMain={`Creating a ${TokenTypes[tokenType]}`}
            subtitleSub={`${
              tokenType === TokenTypeIds.GOVERNANCE
                ? `These options can only be selected for Fee On Transfer type tokens`
                : `You are charging ${
                    totalFees === null ? "0" : totalFees
                  }% fee per transaction`
            }`}
          />
          <span className="floating-warn">
            <RiErrorWarningLine />
          </span>
        </div>
        <div className="column">
          <div className="columns step-rows">
            <div className="column">
              <Card
                id="step3-card1"
                type={card1.type}
                error={null}
                cardData={card1}
                network={network}
                selected={featuresSelected.features[0]}
                disabled={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : true
                }
                cardImage={card1Img}
                cardIndex={0}
                onPress={() =>
                  setSelection(FeatureIds.AUTOMATIC_LIQUIDATION, true)
                }
                callback={value =>
                  setFees(FeatureIds.AUTOMATIC_LIQUIDATION, value)
                }
                selectionText={
                  tokenType === TokenTypeIds.GOVERNANCE
                    ? "Cannot add to token"
                    : "In Your Contract"
                }
                mandatory={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? true : undefined
                }
              />
            </div>
            <div className="column">
              <Card
                id="step3-card3"
                type={card3.type}
                error={null}
                cardData={card3}
                network={network}
                selected={featuresSelected.features[2]}
                disabled={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : true
                }
                cardImage={card3Img}
                cardIndex={2}
                onPress={select =>
                  setSelection(FeatureIds.ANTI_WHALE_PROTECTION, select)
                }
                callback={value =>
                  setFees(FeatureIds.ANTI_WHALE_PROTECTION, value)
                }
                selectionText={
                  tokenType === TokenTypeIds.GOVERNANCE
                    ? "Cannot add to token"
                    : featuresSelected.features[2]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : undefined
                }
              />
            </div>
          </div>
          <div className="columns step-rows">
            <div className="column">
              <Card
                id="step3-card2"
                type={card2.type}
                error={null}
                cardData={card2}
                network={network}
                selected={featuresSelected.features[1]}
                disabled={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : true
                }
                cardImage={card2Img}
                cardIndex={1}
                onPress={select =>
                  setSelection(FeatureIds.RFI_STATIC_REWARDS, select)
                }
                callback={value =>
                  setFees(FeatureIds.RFI_STATIC_REWARDS, value)
                }
                selectionText={
                  tokenType === TokenTypeIds.GOVERNANCE
                    ? "Cannot add to token"
                    : featuresSelected.features[1]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : undefined
                }
              />
            </div>
            <div className="column">
              <Card
                id="step3-card4"
                type={card4.type}
                error={null}
                cardData={card4}
                network={network}
                selected={featuresSelected.features[3]}
                disabled={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : true
                }
                cardImage={card4Img}
                cardIndex={3}
                onPress={select => setSelection(FeatureIds.AUTO_BURN, select)}
                callback={value => setFees(FeatureIds.AUTO_BURN, value)}
                selectionText={
                  tokenType === TokenTypeIds.GOVERNANCE
                    ? "Cannot add to token"
                    : featuresSelected.features[3]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : undefined
                }
              />
            </div>
            <div className="column">
              <Card
                id="step3-card5"
                type={card5.type}
                error={null}
                cardData={card5}
                network={network}
                selected={featuresSelected.features[4]}
                disabled={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : true
                }
                cardImage={card5Img}
                cardIndex={4}
                onPress={select =>
                  setSelection(FeatureIds.AUTO_CHARITY, select)
                }
                callback={value => setFees(FeatureIds.AUTO_CHARITY, value)}
                selectionText={
                  tokenType === TokenTypeIds.GOVERNANCE
                    ? "Cannot add to token"
                    : featuresSelected.features[4]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={
                  tokenType === TokenTypeIds.FEE_ON_TRANSFER ? false : undefined
                }
              />
            </div>
          </div>

          {/* <div className="columns step-rows">
            
          </div> */}
        </div>
      </div>
    </>
  )
}

const FinalStep = props => {
  return <CartContent />
}

const Step4 = props => {
  const [step, _] = React.useState(Steps.Step4)
  const [isLaunchpad, setIsLaunchpad] = React.useState(true)
  const card1 = step.cardData[0]

  const setLaunchpadDetails = ({ website, email, whitepaperUrl }) => {
    console.debug("Launchpad: ", website, email, whitepaperUrl)
  }

  const testCb = () => {
    console.log("test")
  }

  const cardImg = useImageForData(card1.img)

  return (
    <>
      <div className="columns step-columns step-ind">
        <div className="column">
          <StepTitle title={step.title} />
        </div>
        <div className="column has-text-centered sub-title-container">
          <StepSubTitle
            subtitleMain={`Launchpad is Coming Soon.`}
            subtitleSub={`Stay Connected`}
          />
          <span className="floating-warn">
            <RiErrorWarningLine />
          </span>
        </div>
        <div className="column">
          <div className="columns step-rows">
            <div className="column">
              <Card
                id="step4-card1"
                type={card1.type}
                error={null}
                cardData={card1}
                network={props.network}
                selected={false} // TODO: Remove False and make it selectable using callback
                cardImage={cardImg}
                cardIndex={0}
                onPress={() => setIsLaunchpad(!isLaunchpad)}
                mandatory={false}
                selectionText={"Coming Soon"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Step5 = props => {
  const [step, _] = React.useState(Steps.Step5)
  const card1 = step.cardData[0]
  return (
    <>
      <div className="columns step-columns step-ind">
        <div className="column">
          <StepTitle title={step.title} />
        </div>
        <div className="column">
          <div className="columns step-rows">
            <div className="column">
              <Card
                id="step5-card1"
                type={card1.type}
                error={null}
                cardData={card1.displayData}
                network={props.network}
                cardIndex={0}
              />
            </div>
          </div>
          {/* <div className="columns step-rows">
            <div className="column">
              <Card
                id="step5-card2"
                type={`payment-button`}
                error={null}
                network={props.network}
                cardData={card1}
                cardIndex={1}
              />
            </div>
            <div className="column">
              <Card
                id="step5-card3"
                type={`deploy-button`}
                error={null}
                cardData={card1}
                network={props.network}
                cardIndex={2}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

const StepTitle = props => {
  return (
    <div className="container has-text-centered custom-step-title">
      <div className="is-size-5 is-size-6-mobile">{props.title}</div>
    </div>
  )
}

const StepSubTitle = props => {
  return (
    <>
      <div className="columns">
        <div className="column">{props.subtitleMain}</div>
      </div>
      <div className="columns">
        <div className="column">{props.subtitleSub}</div>
      </div>
    </>
  )
}

const StepBreadCrumb = props => {
  const [activeStep, setActiveStep] = React.useState(props.activeStep)
  const [successStep, setSuccessStep] = React.useState(props.successStep)
  if (activeStep === null || activeStep === undefined) {
    setActiveStep(1)
  }

  if (successStep === null || successStep === undefined) {
    setSuccessStep(-1)
  }

  console.debug(
    "CARD::BREADCRUMB:: success step ",
    successStep,
    " :: active step",
    activeStep
  )

  return (
    <div className="columns step-rows-bottom">
      <div className="column">
        <BreadCrumbButton
          value="Step 1"
          disabled={activeStep !== 1 ? true : false}
          isSuccess={
            activeStep === 1 ? false : successStep.has(1) ? true : false
          }
          moveToStep={() => props.moveToStep(1)}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 2"
          disabled={activeStep !== 2 ? true : false}
          isSuccess={
            activeStep === 2 ? false : successStep.has(2) ? true : false
          }
          moveToStep={() => props.moveToStep(2)}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 3"
          disabled={activeStep !== 3 ? true : false}
          isSuccess={
            activeStep === 3 ? false : successStep.has(3) ? true : false
          }
          moveToStep={() => props.moveToStep(3)}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 4"
          disabled={activeStep !== 4 ? true : false}
          isSuccess={
            activeStep === 4 ? false : successStep.has(4) ? true : false
          }
          moveToStep={() => props.moveToStep(4)}
        />
      </div>
      {/* <div className="column">
        <BreadCrumbButton
          value="Step 5"
          disabled={activeStep !== 5 ? true : false}
          isSuccess={
            activeStep === 5 ? false : successStep.has(5) ? true : false
          }
          moveToStep={() => props.moveToStep(5)}
        />
      </div> */}
    </div>
  )
}

const BreadCrumbButton = props => {
  return (
    <div
      className={`button is-light custom-button-bottom app-button${
        props.disabled ? " disabled" : ""
      }${props.isSuccess ? " success" : ""}`}
      type="button"
      onClick={props.moveToStep}
    >
      {props.value}
    </div>
  )
}

export default FactorySteps
