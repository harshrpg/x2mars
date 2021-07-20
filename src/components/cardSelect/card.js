import * as React from "react"
import "./style/card.scss"
import { Steps } from "../../util/factory-steps"
import { StaticImage } from "gatsby-plugin-image"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GatsbyImage } from "gatsby-plugin-image"
import BNB from "../../images/assets/bnb.svg"

const Card = props => {
  return (
    <div class="conatiner card-container">
      <div class="columns custom-card">
        <div class="column is-full">
          <div class="columns">
            <div class="column is-one-quarter">
              {props.type === "select" ? (
                <CustomCheckBox
                  key={props.selected}
                  index={props.cardIndex}
                  selected={props.selected}
                  onPress={props.onPress}
                />
              ) : (
                `No Change`
              )}
            </div>
            <div class="column">
              {props.error !== null ? <ErrorBox error={props.error} /> : ``}
            </div>
          </div>
        </div>
        <div class="column is-full">
          <Data
            cardData={props.cardData}
            network={props.network}
            cardImage={props.cardImage}
          />
        </div>
      </div>
    </div>
  )
}

const CustomCheckBox = props => {
  const [checked, setChecked] = React.useState(props.selected)
  return (
    <label class="checkbox-container">
      <input
        type="checkbox"
        key={checked}
        checked={checked ? `checked` : ``}
        onClick={() => props.onPress(props.index)}
      />
      <span class="checkmark"></span>
    </label>
  )
}

const ErrorBox = ({ error }) => {
  return <div class="error-container">{error}</div>
}

const Data = ({ cardData, network, cardImage }) => {
  let fees = cardData.price !== undefined ? cardData.price[network] : undefined

  return (
    <div className="conatiner has-text-centered">
      <div class="columns">
        <div class="column">
          {cardImage !== undefined || cardImage !== null ? (
            <GatsbyImage image={cardImage} />
          ) : (
            `Some other hero data`
          )}
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <CardTitle title={cardData.title} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          {fees !== undefined ? (
            <Fee fee={fees} network={network} />
          ) : (
            `Free of cost`
          )}
        </div>
      </div>
    </div>
  )
}

const CardTitle = ({ title }) => {
  return (
    <div className="is-size-3 is-size-5-mobile is-capitalized has-text-centered">
      {title}
    </div>
  )
}

const Fee = ({ fee, network }) => {
  return (
    <div className="container custom-container-fees">
      <div class="columns">
        <div class="column is-one-quarter is-half-mobile static-fee-column">
          <span class="is-size-5 is-size-7-mobile has-text-centered">Fees</span>
        </div>
        <div class="column">
          <span class="is-size-5 is-size-7-mobile has-text-centered">
            {fee}
            {` `}
            {network === "eth" ? `ETH` : `BNB`}
          </span>
        </div>
        <div class="column">
          <span class="is-size-5 is-size-7-mobile has-text-centered icon-style">
            {network === "eth" ? (
              <FontAwesomeIcon icon={["fab", "ethereum"]} />
            ) : (
              <StaticImage
                src="../../images/assets/bnb.svg"
                width={30}
                height={30}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
