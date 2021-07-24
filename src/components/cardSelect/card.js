import * as React from "react"
import "./style/card.scss"
import { Steps } from "../../util/factory-steps"
import { StaticImage } from "gatsby-plugin-image"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GatsbyImage } from "gatsby-plugin-image"
import BNB from "../../images/assets/bnb.svg"

const Card = props => {
  let style = { opacity: 1 }
  if (props.error !== null) {
    style = { opacity: 0.5 }
  }
  if (!props.selected) {
    style = { opacity: 0.5 }
  }
  return (
    <div
      class="conatiner card-container"
      style={props.type === "select" ? style : { opacity: 1 }}
    >
      <div class="columns custom-card">
        {props.type === "select" || props.error !== null ? (
          <div class="column is-full">
            <div class="columns">
              {props.type === "select" ? (
                <div class="column is-one-quarter">
                  <CustomCheckBox
                    key={props.selected}
                    index={props.cardIndex}
                    selected={props.selected}
                    onPress={props.onPress}
                    isError={props.error}
                  />
                </div>
              ) : (
                ``
              )}

              {props.error !== null ? (
                <div class="column">
                  <ErrorBox error={props.error} />
                </div>
              ) : (
                ``
              )}
            </div>
          </div>
        ) : (
          ``
        )}

        <div class="column is-full">
          {props.type === "custom" ? (
            <CustomData cardData={props.cardData} network={props.network} />
          ) : (
            <Data
              cardData={props.cardData}
              network={props.network}
              cardImage={props.cardImage}
            />
          )}
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
        disabled={props.isError !== null ? true : false}
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
          {fees !== undefined ? <Fee fee={fees} network={network} /> : ``}
        </div>
      </div>
    </div>
  )
}

const CustomData = ({ cardData, network }) => {
  return (
    <div className="container has-text-centered">
      <div className="columns">
        <div className="column">
          {cardData.id === "step2-1" ? (
            <Step2Card1 cardData={cardData} network={network} />
          ) : cardData.id === "step2-2" ? (
            <Step2Card2 cardData={cardData} network={network} />
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  )
}

const Step2Card1 = ({ cardData, network }) => {
  const [tokenSymbol, setTokenSymbol] = React.useState("")
  const [tokenName, setTokenName] = React.useState("")

  const handleTokenNameChange = event => {
    console.debug("Token Name changed to: ", event.target.value)
    setTokenName(event.target.value)
  }

  const handleTokenSymbolChange = event => {
    console.debug("Token Symbol changed to: ", event.target.value)
    setTokenSymbol(event.target.value)
  }
  return (
    <>
      <div className="columns">
        <div className="column">
          <CardTitle title={cardData.title} size="small" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <NetworkIcon network={network} />
        </div>
        <div className="column">
          <span className="is-size-4">{tokenSymbol}</span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div class="centerinput">
            <div className={`input-block ${tokenName !== "" ? "success" : ""}`}>
              <input
                type="text"
                onChange={handleTokenNameChange}
                id="nameinput"
                required="required"
                spellcheck="false"
              />
              <span class="placeholder">Token Name</span>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div class="centerinput">
            <div
              className={`input-block ${tokenSymbol !== "" ? "success" : ""}`}
            >
              <input
                type="text"
                onChange={handleTokenSymbolChange}
                id="symbolinput"
                required="required"
                spellcheck="false"
              />
              <span class="placeholder">Token Symbol</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const Step2Card2 = ({ cardData, network }) => {
  const [tokenSupply, setTokenSupply] = React.useState(0)
  const [tokenSupplyUnits, setTokenSupplyUnits] = React.useState("Units")
  const [decimals, setDecimals] = React.useState(18)

  const handleTokenSupplyChange = event => {
    let supply = event.target.value
    if (supply < 1 || supply > 100) {
      setTokenSupply(0)
    } else {
      setTokenSupply(event.target.value)
    }
  }

  const handleTokenSupplyUnitsChange = event => {
    console.debug("Token Supply Units changed", event.target.value)
    setTokenSupplyUnits(event.target.value)
  }
  return (
    <>
      <div className="columns">
        <div className="column">
          <CardTitle title={cardData.title} size="small" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <NetworkIcon network={network} />
        </div>
        <div className="column">
          <span className="is-size-6">{tokenSupply}{` `}{tokenSupplyUnits}{` tokens`}</span>
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <div class="centerinput">
            <div
              className={`input-block ${tokenSupply !== 0 ? "success" : ""}`}
            >
              <input
                type="number"
                onChange={handleTokenSupplyChange}
                id="supplyinput"
                required="required"
                spellcheck="false"
                min="1"
                max="100"
              />
              <span class="placeholder">1-100</span>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div
            className={`select custom-select ${
              tokenSupplyUnits !== "Units" ? "success" : ""
            }`}
          >
            <select
              className="is-hovered"
              onChange={handleTokenSupplyUnitsChange}
            >
              <option>Units</option>
              <option>Thousand</option>
              <option>Millions</option>
              <option>Billions</option>
              <option>Trillions</option>
              <option>Quadrillions</option>
            </select>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div class="centerinput">
            <div
              className={`input-block inactive`}
            >
              <input
                type="text"
                id="symbolinput"
                required="required"
                spellcheck="false"
                disabled={true}
                value={decimals}
              />
              <span class="placeholder">Decimals</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const CardTitle = ({ title, size }) => {
  return (
    <div
      className={`${
        size === "small"
          ? "is-size-5 is-size-7-mobile"
          : "is-size-3 is-size-5-mobile"
      } is-capitalized has-text-centered`}
    >
      {title}
    </div>
  )
}

const Fee = ({ fee, network }) => {
  return (
    <div className="container custom-container-fees">
      <div class="columns">
        <div class="column is-one-quarter is-half-mobile static-fee-column">
          <span class="is-size-7 is-size-8-mobile has-text-centered">Fees</span>
        </div>
        <div class="column">
          <span class="is-size-6 is-size-7-mobile has-text-centered">
            {fee}
            {` `}
            {network === "eth" ? `ETH` : `BNB`}
          </span>
        </div>
        <div class="column is-one-quarter">
          <NetworkIcon network={network} />
        </div>
      </div>
    </div>
  )
}

const NetworkIcon = ({ network }) => {
  return (
    <span class="is-size-5 is-size-7-mobile has-text-centered icon-style">
      {network === "eth" ? (
        <FontAwesomeIcon icon={["fab", "ethereum"]} />
      ) : (
        <StaticImage src="../../images/assets/bnb.svg" width={30} height={30} />
      )}
    </span>
  )
}

export default Card
