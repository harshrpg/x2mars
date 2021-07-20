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

const TestSteps = props => {
  return <Step1 network={props.network} />
}

const Step1 = props => {
  const [step1, setStep1] = React.useState(Steps.Step1)
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

  return (
    <div className="container has-text-centered custom-steps-container">
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
                onPress={() => setSelectedOption(0)}
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
                onPress={() => setSelectedOption(1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StepTitle = props => {
  return (
    <div className="constainer has-text-centered custom-step-title">
      <div className="is-size-3 is-size-5-mobile">{props.title}</div>
    </div>
  )
}

export default TestSteps
