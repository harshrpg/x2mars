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

  React.useEffect(() => {
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
              onSuccess={() => setSuccessStep(new Set(successStep).add(2))}
              key={1}
              type={tokenType}
            />
          ) : currentStep === 3 ? (
            <Step3
              className="ind-step"
              network={props.network}
              onSuccess={() => setSuccessStep(new Set(successStep).add(3))}
              key={2}
              type={tokenType}
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
            successStep.has(currentStep) && currentStep !== 4 ? false : true
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

  const setSelection = selectedOption => {
    setSelectedOption(selectedOption)
    props.onSuccess(selectedOption)
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
              onPress={() => setSelection(0)}
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
              onPress={() => setSelection(1)}
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
    props.type === 0 ? "Governance Tokens" : "Fee on Transfer Tokens"

  const [tokenDetails, setTokenDetails] = React.useState({
    Name: null,
    Symbol: null,
    Supply: null,
    Decimals: 18,
  })

  const [dexSelected, setDexSelected] = React.useState(false)
  const setSelection = () => {
    setDexSelected(!dexSelected)
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

  const tokenSupplyCb = tokenSupplyDetails => {
    console.debug("TOKEN STEPS:: TOKEN SUPPLY SUPPLIED", tokenSupplyDetails)
    tokenDetails.Supply = tokenSupplyDetails
    setTokenDetails({
      ...tokenDetails,
    })
    console.debug("TOKEN STEPS:: STATE is at", tokenDetails)
  }

  React.useEffect(() => {
    if (
      tokenDetails.Name !== null &&
      tokenDetails.Symbol !== null &&
      tokenDetails.Supply !== null &&
      tokenDetails.Decimals !== 0
    ) {
      props.onSuccess(2)
    }
  }, [tokenDetails])

  return (
    <div class="columns step-columns step-ind">
      <div class="column">
        <StepTitle title={step.title} />
      </div>
      <div className="column">
        {tokenDetails.Supply !== null && tokenDetails.Symbol !== null
          ? `Creating ` +
            tokenDetails.Supply +
            ` ` +
            tokenDetails.Symbol +
            ` ` +
            tokenType
          : ` Your tokenomics should display here`}
        {/* TODO */}
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
              onPress={setSelection}
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

  return (
    <>
      <div className="columns step-columns step-ind">
        <div className="column">
          <StepTitle title={step.title} />
        </div>
        <div className="column">
          {props.type === 0
            ? `These options can only be selected for Fee On Transfer type tokens`
            : `Total Fee Charged Placeholder`}
          {/* TODO */}
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
                selected={props.type === 1 ? true : false}
                disabled={props.type === 1 ? false : true}
                cardImage={getImageDataForCard(card1.img[props.network])}
                cardIndex={0}
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
                selected={props.type === 1 ? true : false}
                disabled={props.type === 1 ? false : true} // TODO: Remove False and make it selectable using callback
                cardImage={getImageDataForCard(card2.img)}
                cardIndex={1}
              />
            </div>
            <div class="column">
              <Card
                id="step3-card3"
                type={card3.type}
                error={null}
                cardData={card3}
                network={props.network}
                selected={props.type === 1 ? true : false}
                disabled={props.type === 1 ? false : true} // TODO: Remove False and make it selectable using callback
                cardImage={getImageDataForCard(card3.img)}
                cardIndex={2}
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
                selected={props.type === 1 ? true : false}
                disabled={props.type === 1 ? false : true} // TODO: Remove False and make it selectable using callback
                cardImage={getImageDataForCard(card4.img)}
                cardIndex={3}
              />
            </div>
            <div className="column">
              <Card
                id="step3-card5"
                type={card5.type}
                error={null}
                cardData={card5}
                network={props.network}
                selected={props.type === 1 ? true : false}
                disabled={props.type === 1 ? false : true} // TODO: Remove False and make it selectable using callback
                cardImage={getImageDataForCard(card5.img)}
                cardIndex={4}
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

  return (
    <>
      <div className="columns step-columns step-ind">
        <div className="column">
          <StepTitle title={step.title} />
        </div>
        <div className="column">
          Decription goes here
          {/* TODO */}
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
                selected={isLaunchpad} // TODO: Remove False and make it selectable using callback
                cardImage={getImageDataForCard(card1.img)}
                cardIndex={0}
                onPress={() => setIsLaunchpad(!isLaunchpad)}
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
