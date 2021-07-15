import * as React from "react"
import "./style/cardstyle.css"
import { StaticImage } from "gatsby-plugin-image"
import Card from "./card"

const Cardselect = props => {

  return (
    <div class="selection-wrapper">
      <a href="#">
        <div>
          <label for={props.id1} class="selected-label">
            <input
              type="radio"
              name="selected-item"
              id={props.id1}
            ></input>
            <span class="icon"></span>
            <div class="selected-content">
              <img
                src={props.img}
                alt=""
              ></img>
              {/* <StaticImage src={props.img} /> */}
              <h4>
                <strong>{props.title1}</strong>
              </h4>
              <div class="fees">
              <span class="feeslabel">Fees</span><span class="feestag">{props.subtitle1}</span>
              </div>
            </div>
          </label>
        </div>
      </a>
    </div>
  )
}

const TestCardSelect = ({type, error, cardData, network, cardImage}) => {
  console.log("Card Image Found: ", cardImage);
  return (
    <Card type={type} error={error} cardData={cardData} network={network} cardImage={cardImage} />
  )
}

export default TestCardSelect
