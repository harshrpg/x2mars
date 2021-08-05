import * as React from "react"
import "./style/card.scss"
import { Steps } from "../../util/factory-steps"
import { StaticImage } from "gatsby-plugin-image"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GatsbyImage } from "gatsby-plugin-image"
// import { BsArrowRight } from "react-icons/all-files/bs/BsArrowRight";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import { BsQuestion } from "@react-icons/all-files/bs/BsQuestion"
import { AiOutlineCodeSandbox } from "@react-icons/all-files/ai/AiOutlineCodeSandbox"
import { GoCheck } from "@react-icons/all-files/go/GoCheck"
import { GoX } from "@react-icons/all-files/go/GoX"
import { RiErrorWarningFill } from "@react-icons/all-files/ri/RiErrorWarningFill"
import { RiCheckboxCircleFill } from "@react-icons/all-files/ri/RiCheckboxCircleFill"

const Card = props => {
  let style = { opacity: 1 }
  if (props.error !== null) {
    style = { opacity: 1 }
  }
  if (!props.selected) {
    style = { opacity: 1 }
  }
  return (
    <div className="conatiner card-container">
      <div className="columns custom-card">
        <div className="column is-full">
          <div className="columns">
            <div className="column is-8">
              {props.error !== null ? <ErrorBox error={props.error} /> : ``}
            </div>
            <div className="column is-4">
              <HelpButton cardData={props.cardData} />
            </div>
          </div>
        </div>
        {props.mandatory !== undefined ? (
          <div className="column is-full has-text-centered">
            <ShowCardSelectability isMandatory={props.mandatory} />
          </div>
        ) : (
          ``
        )}

        <div className="column is-full">
          {props.type === "custom" ? (
            <CustomData
              cardData={props.cardData}
              network={props.network}
              callback={props.callback}
            />
          ) : props.type === "summary" ? (
            <SummaryData displayData={props.cardData} network={props.network} />
          ) : (
            <Data
              cardData={props.cardData}
              network={props.network}
              cardImage={props.cardImage}
              type={props.type}
              disabled={props.disabled}
              selected={props.selected}
              callback={props.callback}
              maxTxnAmount={props.maxTxnAmount}
            />
          )}
        </div>
        {props.type === "select" || props.type === "feature-select" ? (
          <div className="column is-full has-text-centered">
            <AddToCartButton
              selectionText={props.selectionText}
              key={props.selected}
              index={props.cardIndex}
              selected={props.selected}
              onPress={props.onPress}
              isError={props.error !== null}
              disabled={props.disabled}
              isMandatory={props.mandatory}
            />
          </div>
        ) : (
          ``
        )}
      </div>
    </div>
  )
}

const CustomCheckBox = props => {
  const [checked, setChecked] = React.useState(props.selected)
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        key={checked}
        checked={checked ? `checked` : ``}
        onClick={event => props.onPress(event)}
        disabled={props.disabled ? true : props.isError !== null ? true : false}
      />
      <span className="checkmark"></span>
    </label>
  )
}

const ShowCardSelectability = ({ isMandatory }) => {
  return (
    <>
      <div
        className={`columns selectability-container ${
          isMandatory ? "mandatory" : "optional"
        } `}
      >
        <div className="column">
          {isMandatory ? (
            <>
              <RiErrorWarningFill /> {` `}Mandatory
            </>
          ) : (
            <>
              <RiCheckboxCircleFill /> {` `}Optional
            </>
          )}
        </div>
      </div>
    </>
  )
}

const AddToCartButton = props => {
  const [selected, setSelected] = React.useState(props.selected)
  const [waitForSelection, setWaitForSelection] = React.useState(true)

  const handleButtonClick = () => {
    if (!selected) {
      setSelected(!selected)
    } else if (props.isMandatory !== undefined && !props.isMandatory) {
      setSelected(!selected)
    }
  }

  React.useEffect(() => {
    console.debug("EFFECT 1");
    const timer = setTimeout(() => {
      setWaitForSelection(!waitForSelection)
    }, 500)
    return () => clearTimeout(timer)
  }, [selected])

  React.useEffect(() => {
    console.debug("EFFECT 2");
    props.onPress(selected)
  }, [selected, waitForSelection])
  return (
    <button
      className={`button add-to-cart-button ${
        props.isError || props.disabled ? "inactive" : ""
      } ${
        selected && !waitForSelection
          ? props.isMandatory !== undefined
            ? !props.isMandatory
              ? " remove"
              : "mandatory"
            : "success"
          : props.isMandatory !== undefined && !props.isMandatory
          ? "success"
          : ""
      } `}
      type="button"
      onClick={handleButtonClick}
      disabled={props.isError || props.disabled}
    >
      <span>{props.selectionText}</span>
      <span className="icon">
        {selected ? (
          waitForSelection ? (
            <AiOutlineCodeSandbox className="spinner" />
          ) : props.selectionText === "Remove from Contract" ? (
            <GoX />
          ) : (
            <GoCheck />
          )
        ) : waitForSelection ? (
          <AiOutlineCodeSandbox className="spinner" />
        ) : props.selectionText === "Add to Contract" ? (
          <GoCheck />
        ) : (
          <BsArrowRight />
        )}
      </span>
    </button>
  )
}

const HelpButton = props => {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <>
      <button
        className="button help-button"
        type="button"
        onClick={() => setIsActive(!isActive)}
      >
        <span className="icon">
          <BsQuestion />
        </span>
      </button>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <HelpDescription cardData={props.cardData} />
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setIsActive(!isActive)}
        ></button>
      </div>
    </>
  )
}

const HelpDescription = props => {
  return (
    <>
      <div className="container modal-container is-clipped">
        <div className="columns">
          <div className="column">
            <span className="is-size-2">{props.cardData.title}</span>
          </div>
        </div>
        <div className="columns">
          <div className="column">{props.cardData.description}</div>
        </div>
      </div>
    </>
  )
}

const ErrorBox = ({ error }) => {
  return <div className="error-container">{error}</div>
}

const Data = ({
  cardData,
  network,
  cardImage,
  type,
  disabled,
  selected,
  callback,
  maxTxnAmount
}) => {
  let fees = cardData.price !== undefined ? cardData.price[network] : "Free"
  const [featureInput, setFeatureInput] = React.useState({ features: [] })

  const handleFeatureInputChange = (i, event, input) => {
    console.debug("TOTAL FEE: Feature Input recorded: ", event.target.value)
    const newArray = Array.from(featureInput.features)
    let value = parseFloat(event.target.value)
    if (value >= parseFloat(input.min) && value <= parseFloat(input.max)) {
      newArray[i] = value
      setFeatureInput({ features: newArray })
      callback(value)
    } else {
      event.target.value = ""
    }
  }

  const resetStateInput = i => {
    console.debug("TOTAL FEE: Resseting input")
    if (
      featureInput.features[i] !== undefined &&
      featureInput.features[i] !== ""
    ) {
      const newArray = Array.from(featureInput.features)
      newArray[i] = ""
      setFeatureInput({ features: newArray })
      callback(0)
    }
  }
  return (
    <div className="conatiner has-text-centered">
      <div className="columns">
        <div className="column">
          {cardImage !== undefined || cardImage !== null ? (
            <GatsbyImage image={cardImage} width={30} height={30} alt="" />
          ) : (
            `Some other hero data`
          )}
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <CardTitle title={cardData.title} size="small" />
        </div>
      </div>
      {type === "feature-select" ? (
        <div className="columns">
          <div className="column">
            <div className="centerinput">
              {cardData.inputData !== null && cardData.inputData !== undefined
                ? cardData.inputData.map((input, i) => {
                    if ((!selected || disabled) && input.idx !== undefined && input.idx !== 2) {
                      resetStateInput(i)
                    }
                    return (
                      <>
                        <div
                          className={`input-block ${
                            !selected || disabled
                              ? "disabled"
                              : input.idx === 2
                              ? "pre-selected"
                              : featureInput.features[i] !== undefined &&
                                featureInput.features[i] !== ""
                              ? "success"
                              : ""
                          }`}
                        >
                          <input
                            type={input.type}
                            onBlur={event =>
                              handleFeatureInputChange(i, event, input)
                            }
                            id="featureInput"
                            required="required"
                            spellcheck="false"
                            min={input.min}
                            max={input.max}
                            step="0.01"
                            disabled={disabled || !selected || input.idx === 2}
                            value={
                              selected
                                ? input.idx === 2
                                  ? maxTxnAmount
                                  : null
                                : ""
                            }
                          />

                          <span className="placeholder">
                            {input.min !== "" && input.max !== ""
                              ? input.name +
                                ` (` +
                                input.min +
                                `% - ` +
                                input.max +
                                `%)`
                              : input.name}
                          </span>
                        </div>
                      </>
                    )
                  })
                : ``}
            </div>
          </div>
        </div>
      ) : (
        ``
      )}
      <div className="columns">
        <div className="column">
          {fees !== undefined ? <Fee fee={fees} network={network} /> : ``}
        </div>
      </div>
    </div>
  )
}

const CustomData = ({ cardData, network, callback }) => {
  return (
    <div className="container has-text-centered">
      <div className="columns">
        <div className="column">
          {cardData.id === "step2-1" ? (
            <Step2Card1
              cardData={cardData}
              network={network}
              callback={callback}
            />
          ) : cardData.id === "step2-2" ? (
            <Step2Card2
              cardData={cardData}
              network={network}
              callback={callback}
            />
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  )
}

const SummaryData = props => {
  return (
    <>
      <div className="box columns summary-columns">
        <div className="column">Type of Token</div>
        <div className="column">Type of Token </div>
        <div className="column is-2">
          <NetworkIcon network={props.network} />
        </div>
      </div>
      <div className="box columns summary-columns">
        <div className="column">Type of Token</div>
        <div className="column">Type of Token </div>
        <div className="column is-2">
          <NetworkIcon network={props.network} />
        </div>
      </div>
      <div className="box columns summary-columns">
        <div className="column">Type of Token</div>
        <div className="column">Type of Token </div>
        <div className="column is-2">
          <NetworkIcon network={props.network} />
        </div>
      </div>
      <div className="box columns summary-columns">
        <div className="column">Type of Token</div>
        <div className="column">Type of Token </div>
        <div className="column is-2">
          <NetworkIcon network={props.network} />
        </div>
      </div>
      <div className="box columns summary-columns">
        <div className="column">Type of Token</div>
        <div className="column">Type of Token </div>
        <div className="column is-2">
          <NetworkIcon network={props.network} />
        </div>
      </div>
      <div className="box columns summary-columns">
        <div className="column">Type of Token</div>
        <div className="column">Type of Token </div>
        <div className="column is-2">
          <NetworkIcon network={props.network} />
        </div>
      </div>
      <div className="columns summary-columns">
        <div className="column is-half">
          <PaymmentButton />
        </div>
        <div className="column is-half">
          <DeployButton />
        </div>
      </div>
    </>
  )
}

const Step2Card1 = ({ cardData, network, callback }) => {
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
      {/* <div className="columns">
        <div className="column">
          <NetworkIcon network={network} />
        </div>
        <div className="column">
          <span className="is-size-4">{tokenSymbol}</span>
        </div>
      </div> */}
      <div className="columns">
        <div className="column">
          <div className="centerinput">
            <div className={`input-block ${tokenName !== "" ? "success" : ""}`}>
              <input
                type="text"
                onChange={handleTokenNameChange}
                id="nameinput"
                required="required"
                spellcheck="false"
                onBlur={callback[0]}
              />
              <span className="placeholder">Token Name</span>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="centerinput">
            <div
              className={`input-block ${tokenSymbol !== "" ? "success" : ""}`}
            >
              <input
                type="text"
                onChange={handleTokenSymbolChange}
                id="symbolinput"
                required="required"
                spellcheck="false"
                onBlur={callback[1]}
              />
              <span className="placeholder">Token Symbol</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Step2Card2 = ({ cardData, network, callback }) => {
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

  React.useEffect(() => {
    console.debug("EFFECT 3");
    if (tokenSupply !== 0 && tokenSupplyUnits !== "Units") {
      console.debug(
        "Effect in supply details: ",
        tokenSupply + " " + tokenSupplyUnits
      )
      callback(tokenSupply, tokenSupplyUnits)
    }
  }, [tokenSupply, tokenSupplyUnits])
  return (
    <>
      <div className="columns">
        <div className="column">
          <CardTitle title={cardData.title} size="small" />
        </div>
      </div>
      {/* <div className="columns">
        <div className="column">
          <NetworkIcon network={network} />
        </div>
        <div className="column">
          <span className="is-size-6">
            {tokenSupply}
            {` `}
            {tokenSupplyUnits}
            {` tokens`}
          </span>
        </div>
      </div> */}
      <div className="columns">
        <div className="column is-half">
          <div className="centerinput">
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
              <span className="placeholder">1-100</span>
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
              <option>Million</option>
              <option>Billion</option>
              <option>Trillion</option>
              <option>Quadrillion</option>
            </select>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="centerinput">
            <div className={`input-block inactive`}>
              <input
                type="text"
                id="symbolinput"
                required="required"
                spellcheck="false"
                disabled={true}
                value={decimals}
              />
              <span className="placeholder">Decimals</span>
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
      <div className="columns">
        <div className="column is-one-quarter is-half-mobile static-fee-column">
          <span className="is-size-7 is-size-8-mobile has-text-centered">Fees</span>
        </div>
        <div className="column">
          <span className="is-size-6 is-size-7-mobile has-text-centered">
            {fee}
            {` `}
            {fee !== "Free" ? (network === "eth" ? `ETH` : `BNB`) : ``}
          </span>
        </div>
        <div className="column is-one-quarter">
          <NetworkIcon network={network} />
        </div>
      </div>
    </div>
  )
}

const NetworkIcon = ({ network }) => {
  return (
    <span className="is-size-5 is-size-7-mobile has-text-centered icon-style">
      {network === "eth" ? (
        <FontAwesomeIcon icon={["fab", "ethereum"]} />
      ) : (
        <StaticImage src="../../images/assets/bnb.svg" width={30} height={30} />
      )}
    </span>
  )
}

const PaymmentButton = props => {
  return (
    <>
      <div className="custom-card-button has-text-centered" type="button">
        Pay Now
      </div>
    </>
  )
}

const DeployButton = props => {
  return (
    <>
      <div className="custom-card-button has-text-centered" type="button">
        Deploy & Create Contract
      </div>
    </>
  )
}
export default Card
