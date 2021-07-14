import * as React from "react"
import "./style/card.scss"
import { Steps } from "../../util/factory-steps"
import { StaticImage } from "gatsby-plugin-image"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Card = props => {
  return (
    <div class="conatiner">
      <div class="columns custom-card">
        <div class="column is-full">
          <div class="columns">
            <div class="column is-one-quarter">
              {props.type === "select" ? <CheckBox /> : `No Change`}
            </div>
            <div class="column">
              {props.error !== null ? <ErrorBox error={props.error} /> : ``}
            </div>
          </div>
        </div>
        <div class="column is-full">
          <Data cardData={props.cardData} network={props.network}/>
        </div>
      </div>
    </div>
  )
}

const CheckBox = () => {
  const [checked, setChecked] = React.useState(false)
  return (
    <div class="field">
      <input
        class="is-checkradio is-success is-circle"
        id="exampleCheckboxSuccessCircle"
        type="checkbox"
        name="exampleCheckboxSuccessCircle"
        checked={checked ? `checked` : ``}
        onClick={() => setChecked(!checked)}
      />
      <label for="exampleCheckboxSuccessCircle"> </label>
    </div>
  )
}

const ErrorBox = ({ error }) => {
  return <div class="error-container">{error}</div>
}

const Data = ({ cardData, network }) => {
    let fees = cardData.price[network];

  return (
    <div className="conatiner has-text-centered">
      <div class="columns">
        <div class="column">
          <StaticImage src="../../images/gtoken.png" height={200} width={200} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <CardTitle title={cardData.title} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Fee fee={fees} network={network}/>
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
        <div class="column"><span class="is-size-5 is-size-7-mobile has-text-centered">{fee}{` `}{network === "eth" ? `ETH` : `BNB`}</span></div>
        <div class="column"><span class="is-size-5 is-size-7-mobile has-text-centered icon-style"><FontAwesomeIcon icon={["fab", "ethereum"]} /></span></div>
      </div>
    </div>
  )
}

export default Card
