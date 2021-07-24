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
    // if (currentStep == successStep) {
    //   setSuccessStep(successStep - 1)
    // }
    setIndex(index - 1)
    setCurrentStep(currentStep - 1)
    console.log("Moving to step number: ", currentStep)
  }
  console.log("CARD: success step ", successStep)
  return (
    <div className="custom-steps-container">
      <div className="columns">
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
      <div className="columns step-columns">
        <div className="column">
          <div className="steps-displayer">
            <div
              className="columns steps-slider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)`}}
            >
              <div className="column is-full">
                <Step1
                  className="ind-step"
                  network={props.network}
                  onSuccess={() => setSuccessStep(new Set(successStep).add(1))}
                  key={0}
                />
              </div>
              <div className="column is-full">
                <Step2
                  className="ind-step"
                  network={props.network}
                  onSuccess={() => setSuccessStep(new Set(successStep).add(2))}
                  key={1}
                />
              </div>
              <div className="column">
                <Step1
                  className="ind-step"
                  network={props.network}
                  onSuccess={() => setSuccessStep(new Set(successStep).add(3))}
                  key={2}
                />
              </div>
              <div className="column">
                <Step1
                  className="ind-step"
                  network={props.network}
                  onSuccess={() => setSuccessStep(new Set(successStep).add(4))}
                  key={3}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <StepBreadCrumb
            key={[successStep, currentStep]}
            activeStep={currentStep}
            successStep={successStep}
          />
        </div>
      </div>
      <div className="columns">
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
              successStep.has(currentStep) && currentStep !== 4
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
    props.onSuccess(1)
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
  const [step, _] = React.useState(Steps.Step2);
  const card1 = step.cardData[0]
  const card2 = step.cardData[1]
  const card3 = step.cardData[2]

  const [selectedOption, setSelectedOption] = React.useState(-1)
  const setSelection = selectedOption => {
    setSelectedOption(selectedOption)
    props.onSuccess(1)
  }

  return (
    <div class="columns step-columns step-ind">
      <div class="column">
        <StepTitle title={step.title} />
      </div>
      <div class="column">
        <div class="columns step-rows">
          <div class="column">
            <Card
              id="step2-card1"
              type={card1.type}
              error={null}
              cardData={card1}
              // cardImage={getImageDataForCard(card1.img)}
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
              // cardImage={getImageDataForCard(card2.img)}
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
              // cardImage={getImageDataForCard(card2.img)}
              network={props.network}
              cardIndex={1}
            />
          </div>
        </div>
      </div>
    </div>
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

  console.debug("CARD::BREADCRUMB:: success step ", successStep, " :: active step", activeStep)

  return (
    <div className="columns step-rows">
      <div className="column">
        <BreadCrumbButton
          value="Step 1"
          disabled={activeStep !== 1 ? true : false}
          isSuccess={activeStep === 1 ? false : successStep.has(1) ? true : false}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 2"
          disabled={activeStep !== 2 ? true : false}
          isSuccess={activeStep === 2 ? false : successStep.has(2) ? true : false}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 3"
          disabled={activeStep !== 3 ? true : false}
          isSuccess={activeStep === 3 ? false : successStep.has(3) ? true : false}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 4"
          disabled={activeStep !== 4 ? true : false}
          isSuccess={activeStep === 4 ? false : successStep.has(4) ? true : false}
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
