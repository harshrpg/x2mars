import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import { Steps } from "../../util/factory-steps"
import Card from "../cardSelect/card"

import "./style/factory.scss"

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

const setActiveStep = (activeStepNumber) => {

}

const TestSteps = props => {
  const [successStep, setSuccessStep] = React.useState(-1);
  console.log('CARD: success step ', successStep);
  return (
    <div className="container has-text-centered custom-steps-container">
      <div className="columns step-columns">
        <div className="column">
        <Step1 network={props.network} onSuccess={() => setSuccessStep(1)}/>
        </div>
        <div className="column">
          <StepBreadCrumb key={successStep} activeStep={1} successStep={successStep} />
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

  const setSelection = (selectedOption) => {
    setSelectedOption(selectedOption);
    props.onSuccess(1);
  }


  return (
    
      <div class="columns step-columns">
        <div class="column">
          <StepTitle title={step1.title} />
        </div>
        <div class="column">
          <div class="columns step-rows">
            <div class="column">
              <Card
                className="card-steps"
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

  console.log("CARD::BREADCRUMB:: success step ", successStep);

  return (
    <div className="columns step-rows">
      <div className="column">
        <BreadCrumbButton
          value="Step 1"
          disabled={activeStep !== 1 ? true : false}
          isSuccess={successStep === 1 ? true : false}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 2"
          disabled={activeStep !== 2 ? true : false}
          isSuccess={successStep === 2 ? true : false}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 3"
          disabled={activeStep !== 3 ? true : false}
          isSuccess={successStep === 3 ? true : false}
        />
      </div>
      <div className="column">
        <BreadCrumbButton
          value="Step 4"
          disabled={activeStep !== 4 ? true : false}
          isSuccess={successStep === 4 ? true : false}
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

export default TestSteps
