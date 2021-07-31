import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import { Steps } from "../../util/factory-steps"
import Card from "../cardSelect/card"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine"

import "./style/factory.scss"

// TODO: Make this into a reusable hook and use it in the rest of the application
const GetAllImages = () => {
  const { images } = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childrenImageSharp {
              gatsbyImageData(
                width: 200
                height: 200
                webpOptions: { quality: 100 }
              )
            }
          }
        }
      }
    }
  `)
  return images
}

const getImageDataForCard = data => {
  const images = GetAllImages()
  const myImage = images.edges.find(n => {
    return n.node.relativePath.includes(data)
  })
  return getImage(myImage.node.childrenImageSharp[0])
}

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
    console.debug("EFFECT 5");
    if ((currentStep === 3 && tokenType === 0) || currentStep == 4) {
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
            <Step4
              className="ind-step"
              network={props.network}
              onSuccess={() => setSuccessStep(new Set(successStep).add(4))}
              key={3}
            />
          ) : (
            <Step5 network={props.network} key={4} />
          )}
        </div>
        <div className="column" id="breadcrumb">
          <StepBreadCrumb
            key={[successStep, currentStep]}
            activeStep={currentStep}
            successStep={successStep}
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
  // there are two parts in step1
  const step1Card1 = step1.cardData[0]
  const step1Card2 = step1.cardData[1]

  const [selectedOption, setSelectedOption] = React.useState(-1)

  // TODO: call metamask hook here
  // TODO: Get metamask balance
  // TODO: Set errors based on balances
  // const [card1Error, setCard1Error] = React.useState("Connect Wallet");
  // const [card2Error, setCard2Error] = React.useState("Not Enough Balance");

  // TODO: Set check status based on balances

  // const [ableToPurchase, setAbleToPurchase] = React.useState({card1: true, card2: true});
  // if (ableToPurchase.card1) {
  //   setCard1Error(null);
  // }
  // if (ableToPurchase.card2) {
  //   setCard2Error(null);
  // }

  const setSelection = (selectedOption, selection) => {
    console.debug("STEP 1: Callback:: ", selectedOption)
    if (selection) {
      setSelectedOption(selectedOption)
      props.onSuccess(selectedOption)
    }
  }

  return (
    <div class="columns step-columns has-text-centered step-ind">
      <div class="column">
        <StepTitle title={step1.title} />
      </div>
      <div class="column">
        <div class="columns step-rows">
          <div class="column">
            <Card
              id="step1-card1"
              type={step1Card1.type}
              error={null}
              cardData={step1Card1}
              cardImage={getImageDataForCard(step1Card1.img)}
              network={props.network}
              cardIndex={0}
              selected={selectedOption === 0 ? true : false}
              onPress={selection => setSelection(0, selection)}
              selectionText="Select"
            />
          </div>
          <div class="column">
            <Card
              id="step1-card2"
              type={step1Card2.type}
              error={null}
              cardData={step1Card2}
              cardImage={getImageDataForCard(step1Card2.img)}
              network={props.network}
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
  const [step, _] = React.useState(Steps.Step2)
  const card1 = step.cardData[0]
  const card2 = step.cardData[1]
  const card3 = step.cardData[2]

  let tokenType =
    props.type === 0 ? "Governance Token" : "Fee on Transfer Token"

  const [tokenDetails, setTokenDetails] = React.useState({
    Name: null,
    Symbol: null,
    Supply: null,
    SupplyUnit: null,
    Decimals: 18,
  })

  const [dexSelected, setDexSelected] = React.useState(
    props.type === 0 ? false : true
  )
  const setSelection = selection => {
    console.debug(
      "CARD2:: dex selected",
      dexSelected,
      " props.type:: ",
      props.type
    )
    if (props.type === 0) {
      setDexSelected(selection)
    }
  }

  if (props.type === 1) {
    card3.price = undefined
  }

  const tokenNameCb = tokenName => {
    console.debug("TOKEN STEPS:: TOKEN Name SUPPLIED", tokenName.target.value)
    tokenDetails.Name = tokenName.target.value
    setTokenDetails({
      ...tokenDetails,
    })
    console.debug("TOKEN STEPS:: STATE is at", tokenDetails)
  }

  const tokenSymbolCb = tokenSymbol => {
    console.debug("TOKEN STEPS:: TOKEN Name SUPPLIED", tokenSymbol.target.value)
    tokenDetails.Symbol = tokenSymbol.target.value
    setTokenDetails({
      ...tokenDetails,
    })
    console.debug("TOKEN STEPS:: STATE is at", tokenDetails)
  }

  const tokenSupplyCb = (tokenSupply, tokenSupplyUnit) => {
    console.debug(
      "TOKEN STEPS:: TOKEN SUPPLY SUPPLIED",
      tokenSupply + " " + tokenSupplyUnit
    )
    tokenDetails.Supply = tokenSupply
    tokenDetails.SupplyUnit = tokenSupplyUnit
    setTokenDetails({
      ...tokenDetails,
    })
    console.debug("TOKEN STEPS:: STATE is at", tokenDetails)
  }

  React.useEffect(() => {
    console.debug("EFFECT 6");
    if (
      tokenDetails.Name !== null &&
      tokenDetails.Symbol !== null &&
      tokenDetails.Supply !== null &&
      tokenDetails.SupplyUnit !== null &&
      tokenDetails.Decimals !== 0
    ) {
      props.onSuccess(tokenDetails, 2)
    }
  }, [tokenDetails])

  return (
    <div class="columns step-columns step-ind">
      <div class="column">
        <StepTitle title={step.title} />
      </div>
      <div className="column has-text-centered sub-title-container">
        <StepSubTitle
          subtitleMain={`Creating a ${tokenType}`}
          subtitleSub={`${
            tokenDetails.Supply !== null && tokenDetails.Symbol !== null
              ? `Creating ` +
                tokenDetails.Supply +
                ` ` +
                tokenDetails.Symbol +
                ` ` +
                tokenType
              : ` Your tokenomics should display here`
          }`}
        />
        <span className="floating-warn">
          <RiErrorWarningLine />
        </span>
      </div>
      <div class="column">
        <div class="columns step-rows">
          <div class="column">
            <Card
              id="step2-card1"
              type={card1.type}
              error={null}
              cardData={card1}
              callback={[tokenNameCb, tokenSymbolCb]}
              network={props.network}
              cardIndex={0}
              mandatory={true}
            />
          </div>
          <div class="column">
            <Card
              id="step2-card2"
              type={card2.type}
              error={null}
              cardData={card2}
              callback={tokenSupplyCb}
              network={props.network}
              cardIndex={1}
              mandatory={true}
            />
          </div>
          <div class="column">
            <Card
              id="step2-card3"
              type={card3.type}
              error={null}
              cardData={card3}
              cardImage={getImageDataForCard(card3.img[props.network])}
              network={props.network}
              cardIndex={2}
              selected={dexSelected}
              onPress={selection => setSelection(selection)}
              selectionText={
                props.type === 0
                  ? dexSelected
                    ? "Remove from Contract"
                    : "Add to Contract"
                  : "In Your Contract"
              }
              mandatory={props.type === 0 ? false : true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Step3 = props => {
  const [step, _] = React.useState(Steps.Step3)
  const card1 = step.cardData[0]
  const card2 = step.cardData[1]
  const card3 = step.cardData[2]
  const card4 = step.cardData[3]
  const card5 = step.cardData[4]
  var tokenDetails = props.tokenDetails
  const numberMap = {
    Thousand: 10 ** 3,
    Million: 10 ** 6,
    Billion: 10 ** 9,
    Trillion: 10 ** 12,
    Quadrillion: 10 ** 15,
  }
  var tokenSupply = parseFloat(tokenDetails.Supply)
  const multiplier = numberMap[tokenDetails.SupplyUnit]
  console.debug("TOKEN SUPPLY: ", tokenSupply*multiplier)
  let tokenType =
    props.type === 0 ? "Governance Token" : "Fee on Transfer Token"

  const featureSelectionArr =
    props.type === 1
      ? [true, false, false, false, false]
      : [false, false, false, false, false]
  const [featuresSelected, setFeaturesSelected] = React.useState({
    features: featureSelectionArr,
  })
  const [featureFees, setFeatureFees] = React.useState({
    featureFees: [0, 0, 50000, 0, 0],
  })

  const [totalFees, setTotalFees] = React.useState(0)
  const setSelection = (index, isSelected) => {
    console.debug("Selection: ", featuresSelected)
    const newArray = Array.from(featuresSelected.features)
    newArray[index] = isSelected
    setFeaturesSelected({ features: newArray })
    console.debug("Selection: ", featuresSelected)
  }

  const setFees = (index, fee) => {
    console.debug("TOTAL FEE: Fee selected: ", fee)
    const newArray = Array.from(featureFees.featureFees)
    newArray[index] = fee
    setFeatureFees({ featureFees: newArray })
  }

  React.useEffect(() => {
    console.debug("EFFECT 7");
    if (props.type === 1) {
      console.debug("Feature Effect: ", featuresSelected, featureFees)
      let reqFullfilled = 0
      let failedReq = 0
      step.cardData.map((_, index) => {
        if (
          (index !== 2 &&
            featuresSelected.features[index] &&
            featureFees.featureFees[index] > 0) ||
          index === 2
        ) {
          reqFullfilled++
        }
        if (
          index !== 2 &&
          ((featuresSelected.features[index] &&
            featureFees.featureFees[index] === 0) ||
            (!featuresSelected.features[index] &&
              featureFees.featureFees[index] > 0))
        ) {
          failedReq++
        }
      })
      if (reqFullfilled > 0) {
        console.debug(
          "Features Selected: ",
          featuresSelected,
          " Fees provided: ",
          featureFees
        )
        props.onSuccess()
      }
      if (failedReq > 0) {
        console.debug(
          "Feature Effect failed: ",
          featuresSelected.features,
          featureFees.featureFees
        )
        props.onFailure()
      }
    } else if (props.type === 0) {
      props.onSuccess()
    }
  }, [featuresSelected, featureFees])

  React.useEffect(() => {
    console.debug("EFFECT 8");
    calculateTotalFees()
  }, [featureFees])

  const calculateTotalFees = () => {
    let fees = 0
    featuresSelected.features.map((isFeatureSelected, i) => {
      if (i !== 2) {
        if (isFeatureSelected) {
          fees += parseFloat(featureFees.featureFees[i])
        }
      }
    })
    console.debug("TOTAL FEE: ", fees)
    setTotalFees(fees)
  }

  return (
    <>
      <div className="columns step-columns step-ind">
        <div className="column">
          <StepTitle title={step.title} />
        </div>
        <div className="column has-text-centered sub-title-container">
          <StepSubTitle
            subtitleMain={`Creating a ${tokenType}`}
            subtitleSub={`${
              props.type === 0
                ? `These options can only be selected for Fee On Transfer type tokens`
                : `You are charging ${totalFees}% fee per transaction`
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
                network={props.network}
                selected={featuresSelected.features[0]}
                disabled={props.type === 1 ? false : true}
                cardImage={getImageDataForCard(card1.img[props.network])}
                cardIndex={0}
                onPress={() => setSelection(0, true)}
                callback={value => setFees(0, value)}
                selectionText={
                  props.type === 0 ? "Cannot add to token" : "In Your Contract"
                }
                mandatory={props.type === 1 ? true : undefined}
              />
            </div>
          </div>
          <div className="columns step-rows">
            <div class="column">
              <Card
                id="step3-card2"
                type={card2.type}
                error={null}
                cardData={card2}
                network={props.network}
                // selected={props.type === 1 ? true : false}
                selected={featuresSelected.features[1]}
                disabled={props.type === 1 ? false : true}
                cardImage={getImageDataForCard(card2.img)}
                cardIndex={1}
                onPress={select => setSelection(1, select)}
                callback={value => setFees(1, value)}
                selectionText={
                  props.type === 0
                    ? "Cannot add to token"
                    : featuresSelected.features[1]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={props.type === 1 ? false : undefined}
              />
            </div>
            <div class="column">
              <Card
                id="step3-card3"
                type={card3.type}
                error={null}
                cardData={card3}
                network={props.network}
                selected={featuresSelected.features[2]}
                disabled={props.type === 1 ? false : true}
                cardImage={getImageDataForCard(card3.img)}
                cardIndex={2}
                onPress={select => setSelection(2, select)}
                callback={value => setFees(2, value)}
                selectionText={
                  props.type === 0
                    ? "Cannot add to token"
                    : featuresSelected.features[2]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={props.type === 1 ? false : undefined}
                maxTxnAmount={0.005 * (tokenSupply * multiplier)}
              />
            </div>
          </div>

          <div className="columns step-rows">
            <div className="column">
              <Card
                id="step3-card4"
                type={card4.type}
                error={null}
                cardData={card4}
                network={props.network}
                selected={featuresSelected.features[3]}
                disabled={props.type === 1 ? false : true}
                cardImage={getImageDataForCard(card4.img)}
                cardIndex={3}
                onPress={select => setSelection(3, select)}
                callback={value => setFees(3, value)}
                selectionText={
                  props.type === 0
                    ? "Cannot add to token"
                    : featuresSelected.features[3]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={props.type === 1 ? false : undefined}
              />
            </div>
            <div className="column">
              <Card
                id="step3-card5"
                type={card5.type}
                error={null}
                cardData={card5}
                network={props.network}
                selected={featuresSelected.features[4]}
                disabled={props.type === 1 ? false : true}
                cardImage={getImageDataForCard(card5.img)}
                cardIndex={4}
                onPress={select => setSelection(4, select)}
                callback={value => setFees(4, value)}
                selectionText={
                  props.type === 0
                    ? "Cannot add to token"
                    : featuresSelected.features[4]
                    ? "Remove from Contract"
                    : "Add to Contract"
                }
                mandatory={props.type === 1 ? false : undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
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
                cardImage={getImageDataForCard(card1.img)}
                cardIndex={0}
                onPress={() => setIsLaunchpad(!isLaunchpad)}
                mandatory={false}
                selectionText={
                  "Coming Soon"
                }
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
    <div className="constainer has-text-centered custom-step-title">
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
    <div className="columns step-rows">
      <div className="column">
        <BreadCrumbButton
          value="Step 1"
          disabled={activeStep !== 1 ? true : false}
          isSuccess={
            activeStep === 1 ? false : successStep.has(1) ? true : false
          }
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 2"
          disabled={activeStep !== 2 ? true : false}
          isSuccess={
            activeStep === 2 ? false : successStep.has(2) ? true : false
          }
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 3"
          disabled={activeStep !== 3 ? true : false}
          isSuccess={
            activeStep === 3 ? false : successStep.has(3) ? true : false
          }
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 4"
          disabled={activeStep !== 4 ? true : false}
          isSuccess={
            activeStep === 4 ? false : successStep.has(4) ? true : false
          }
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 5"
          disabled={activeStep !== 5 ? true : false}
          isSuccess={
            activeStep === 5 ? false : successStep.has(5) ? true : false
          }
        />
      </div>
    </div>
  )
}

const BreadCrumbButton = props => {
  return (
    <div
      className={`button is-light custom-button app-button${
        props.disabled ? " disabled" : ""
      }${props.isSuccess ? " success" : ""}`}
      type="button"
    >
      {props.value}
    </div>
  )
}

export default FactorySteps
