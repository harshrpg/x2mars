import * as React from "react"
import "./style/cardstyle.css"
import { StaticImage } from "gatsby-plugin-image"
import Card from "./card"

const Cardselect = props => {
  return (
    <div className="selection-wrapper">
      <a href="#">
        <div>
          <label for={props.id1} className="selected-label">
            <input type="radio" name="selected-item" id={props.id1}></input>
            <span className="icon"></span>
            <div className="selected-content">
              <img src={props.img} alt=""></img>
              {/* <StaticImage src={props.img} /> */}
              <h4>
                <strong>{props.title1}</strong>
              </h4>
              <div className="fees">
                <span className="feeslabel">Fees</span>
                <span className="feestag">{props.subtitle1}</span>
              </div>
            </div>
          </label>
        </div>
      </a>
    </div>
  )
}

const TestCardSelect = ({
  type,
  error,
  cardData,
  network,
  cardImage,
  stepCallback,
  cardIndex,
  selected,
}) => {
  console.log("TOKEN STEPS: Rendering Card, Selected value: ", selected, " for index: ", cardIndex)
  return (
    <Card
      type={type}
      error={error}
      cardData={cardData}
      network={network}
      cardImage={cardImage}
      stepCallback={stepCallback}
      cardIndex={cardIndex}
      selected={selected}
    />
  )
}

export default TestCardSelect
