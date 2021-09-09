import * as React from "react"
import "./style/card.scss"
import { StepsModel } from "../../util/factory-steps"
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
import { NetworkIcon } from "../Icons/icons"
import { useNetwork } from "../../hooks/useNetwork"
import { useAuthState, useCartDispatch, useCartState } from "../../context"
import {
  FeatureIds,
  NetworkConstants,
  NetworkFromChainId,
  NumberMap,
  TokenTypeIds,
} from "../../util/Constants"
import ErrorBox from "../Error/errorbox"

const Card = props => {
  let style = { opacity: 1 }
  if (props.error !== null) {
    style = { opacity: 1 }
  }
  if (!props.selected) {
    style = { opacity: 1 }
  }
  return (
    <div className="conatiner card-container mobileContainer">
      <div className="columns custom-card">
        <div className="column is-full">
          <div className="columns">
            <div data-testid="step-1" className="column is-8">
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
              id={props.id}
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
        
      </div>
    </div>
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
    console.debug("Selection: In Card: ", selected)
    if (!selected) {
      setSelected(!selected)
    } else if (props.isMandatory !== undefined && !props.isMandatory) {
      setSelected(!selected)
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setWaitForSelection(!waitForSelection)
    }, 500)
    return () => clearTimeout(timer)
  }, [selected])

  React.useEffect(() => {
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
        <div className="modal-content file-summary-board">
          <HelpDescription cardData={props.cardData} />
          <div className="modal-close-custom">
            <button
              className="button close-modal-button"
              aria-label="close"
              onClick={() => setIsActive(!isActive)}
            >
              <span className="icon is-large">
                <GoX />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const HelpDescription = props => {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <>
      <div className="container has-text-centered">
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

const Data = ({
  cardData,
  // network,
  cardImage,
  type,
  disabled,
  selected,
  callback,
  maxTxnAmount,
  id,
}) => {
  // STATES
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )
  const [fees, setFees] = React.useState(cardData.price[network])

  // REUSABLE HOOKS
  const user = useAuthState()
  const cartState = useCartState()

  // EFFECTS
  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])
  React.useEffect(() => {
    if (id === "step2-card3") {
      if (cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER) {
        setFees("Free")
      }
    } else {
      setFees(cardData.price[network])
    }
  }, [cartState])

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
        <FeatureInputData
          cardData={cardData}
          selected={selected}
          disabled={disabled}
          callback={callback}
        />
      ) : (
        // `TEST`
        ``
      )}
      <div className="columns">
        <div className="column feeSpacing">
          {fees !== undefined ? <Fee fee={fees} network={network} /> : ``}
        </div>
      </div>
    </div>
  )
}

const FeatureInputData = ({ cardData, disabled, selected, callback }) => {
  // CONTEXT
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()

  // STATE
  const [input, _] = React.useState(cardData.inputData[0])
  const [featureValue, setFeatureValue] = React.useState(null)
  const [charityAddress, setCharityAddress] = React.useState(
    cartState.step3.charity_address !==
      "0x000000000000000000000000000000000000dEaD"
      ? cartState.step3.charity_address
      : null
  )
  const [validCharityAddress, setValidCharityAddress] = React.useState(false)

  // EFFECTS
  React.useEffect(() => {
    switch (input.idx) {
      case FeatureIds.AUTOMATIC_LIQUIDATION:
        setFeatureValue(cartState.step3.auto_liquidation)
        break
      case FeatureIds.RFI_STATIC_REWARDS:
        if (!selected) {
          setFeatureValue("")
        } else {
          setFeatureValue(cartState.step3.rfi_rewards)
        }
        break
      case FeatureIds.WHALE_PROTECTION:
        if (!selected && input.idx !== undefined && input.idx === 2) {
          setFeatureValue("")
        } else if (selected && input.idx !== undefined && input.idx === 2) {
          setFeatureValue(cartState.step3.WHALE_PROTECTION)
        }
        break
      case FeatureIds.AUTO_BURN:
        if (!selected) {
          setFeatureValue("")
        } else {
          setFeatureValue(cartState.step3.auto_burn)
        }
        break
      case FeatureIds.AUTO_CHARITY:
        if (!selected) {
          setFeatureValue("")
        } else {
          setFeatureValue(cartState.step3.auto_charity)
        }

        break
      default:
        break
    }
  }, [cartState])
  React.useEffect(() => {
    if (!selected) {
      resetStateInput()
    } else {
      if (input.idx === FeatureIds.WHALE_PROTECTION) {
        var value =
          0.005 *
          (parseFloat(cartState.step2.tokenSupplyNumber) *
            NumberMap[cartState.step2.tokenSupplyUnits])
        dispatchValues(value)
      }
    }
  }, [selected])

  function dispatchValues(value) {
    console.debug("Changing Cart State")
    switch (input.idx) {
      case FeatureIds.AUTOMATIC_LIQUIDATION:
        cartDispatch({
          step: 3.1,
          payload: {
            step3: {
              auto_liquidation: value,
              rfi_rewards: cartState.step3.rfi_rewards,
              WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
              auto_burn: cartState.step3.auto_burn,
              auto_charity: cartState.step3.auto_charity,
              charity_address: cartState.step3.charity_address,
              totalFees: cartState.step3.totalFees,
            },
          },
        })
        break
      case FeatureIds.RFI_STATIC_REWARDS:
        cartDispatch({
          step: 3.2,
          payload: {
            step3: {
              auto_liquidation: cartState.step3.auto_liquidation,
              rfi_rewards: value,
              WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
              auto_burn: cartState.step3.auto_burn,
              auto_charity: cartState.step3.auto_charity,
              charity_address: cartState.step3.charity_address,
              totalFees: cartState.step3.totalFees,
            },
          },
        })
        break
      case FeatureIds.WHALE_PROTECTION:
        cartDispatch({
          step: 3.3,
          payload: {
            step3: {
              auto_liquidation: cartState.step3.auto_liquidation,
              rfi_rewards: cartState.step3.rfi_rewards,
              WHALE_PROTECTION: value,
              auto_burn: cartState.step3.auto_burn,
              auto_charity: cartState.step3.auto_charity,
              charity_address: cartState.step3.charity_address,
              totalFees: cartState.step3.totalFees,
            },
          },
        })
        break
      case FeatureIds.AUTO_BURN:
        cartDispatch({
          step: 3.4,
          payload: {
            step3: {
              auto_liquidation: cartState.step3.auto_liquidation,
              rfi_rewards: cartState.step3.rfi_rewards,
              WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
              auto_burn: value,
              auto_charity: cartState.step3.auto_charity,
              charity_address: cartState.step3.charity_address,
              totalFees: cartState.step3.totalFees,
            },
          },
        })
        break
      case FeatureIds.AUTO_CHARITY:
        cartDispatch({
          step: 3.5,
          payload: {
            step3: {
              auto_liquidation: cartState.step3.auto_liquidation,
              rfi_rewards: cartState.step3.rfi_rewards,
              WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
              auto_burn: cartState.step3.auto_burn,
              auto_charity: value,
              charity_address: cartState.step3.charity_address,
              totalFees: cartState.step3.totalFees,
            },
          },
        })
        break
      default:
        break
    }
  }

  // CALLBACKS
  const handleFeatureInputChange = event => {
    dispatchValues(event.target.value)
    callback(event.target.value)
  }
  const resetStateInput = () => {
    if (featureValue !== null) {
      dispatchValues(null)
      callback(null)
      setCharityAddress("")
    }
  }

  const handleCharityAddressChange = event => {
    setCharityAddress(event.target.value)
  }

  React.useEffect(() => {
    if (!!charityAddress) {
      var pattern = "^0x[a-fA-F0-9]{40}$"
      var result = charityAddress.match(pattern)
      if (result === null) {
        setValidCharityAddress(false)
      } else {
        setValidCharityAddress(true)
      }
    }
  }, [charityAddress])

  React.useEffect(() => {
    if (validCharityAddress) {
      cartDispatch({
        step: 3.7,
        payload: {
          step3: {
            auto_liquidation: cartState.step3.auto_liquidation,
            rfi_rewards: cartState.step3.rfi_rewards,
            WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
            auto_burn: cartState.step3.auto_burn,
            auto_charity: cartState.step3.auto_charity,
            charity_address: charityAddress,
            totalFees: cartState.step3.totalFees,
          },
        },
      })
    } else {
      cartDispatch({
        step: 3.7,
        payload: {
          step3: {
            auto_liquidation: cartState.step3.auto_liquidation,
            rfi_rewards: cartState.step3.rfi_rewards,
            WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
            auto_burn: cartState.step3.auto_burn,
            auto_charity: cartState.step3.auto_charity,
            charity_address: "0x000000000000000000000000000000000000dEaD",
            totalFees: cartState.step3.totalFees,
          },
        },
      })
    }
  }, [validCharityAddress])

  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="centerinput">
            <div
              className={`input-block ${
                !selected || disabled
                  ? "disabled"
                  : input.idx === 2
                  ? "pre-selected"
                  : featureValue !== null && featureValue !== ""
                  ? "success"
                  : ""
              }`}
            >
              <input
                type={input.type}
                onChange={handleFeatureInputChange}
                id="featureInput"
                required="required"
                spellcheck="false"
                min={input.min}
                max={input.max}
                step="1"
                disabled={disabled || !selected || input.idx === 2}
                value={featureValue}
              />
              <span className="placeholder">
                {input.min !== "" && input.max !== ""
                  ? input.name + ` (` + input.min + `% - ` + input.max + `%)`
                  : input.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {input.idx === 4 ? (
        <div className="columns">
          <div className="column">
            <div className="centerinput">
              <div
                className={`input-block ${
                  !selected || disabled
                    ? "disabled"
                    : input.idx === 2
                    ? "pre-selected"
                    : featureValue !== null
                    ? validCharityAddress
                      ? "success"
                      : ""
                    : ""
                }`}
              >
                <input
                  type="text"
                  onChange={handleCharityAddressChange}
                  id="featureInput"
                  required="required"
                  spellcheck="false"
                  disabled={disabled || !selected || input.idx === 2}
                  value={charityAddress}
                  pattern="^0x[a-fA-F0-9]{40}$"
                />
                <span className="placeholder">Charity Address</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ``
      )}
    </>
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
  const cartState = useCartState()
  const [tokenSymbol, setTokenSymbol] = React.useState(
    cartState.step2.tokenSymbol
  )
  const [tokenName, setTokenName] = React.useState(cartState.step2.tokenName)

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
          <div className="centerinput">
            <div className={`input-block ${!!tokenName ? "success" : ""}`}>
              <input
                type="text"
                onChange={handleTokenNameChange}
                id="nameinput"
                required="required"
                spellcheck="false"
                onBlur={callback[0]}
                value={tokenName}
              />
              <span className="placeholder">Token Name</span>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="centerinput">
            <div className={`input-block ${!!tokenSymbol ? "success" : ""}`}>
              <input
                type="text"
                onChange={handleTokenSymbolChange}
                id="symbolinput"
                required="required"
                spellcheck="false"
                onBlur={callback[1]}
                value={tokenSymbol}
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
  const cartDispatch = useCartDispatch()
  const [antiWhaleProtection, setAntiWhaleProtection] = React.useState(null)
  const cartState = useCartState()
  const [tokenSupply, setTokenSupply] = React.useState(
    cartState.step2.tokenSupplyNumber
  )
  const [tokenSupplyUnits, setTokenSupplyUnits] = React.useState(
    cartState.step2.tokenSupplyUnits
  )
  const [decimals, _] = React.useState(cartState.step2.tokenDecimals)

  const handleTokenSupplyChange = event => {
    let supply = event.target.value
    if (supply < 1 || supply > 100) {
      setTokenSupply(0)
    } else {
      setTokenSupply(event.target.value)
    }
  }

  const handleTokenSupplyUnitsChange = event => {
    setTokenSupplyUnits(event.target.value)
  }

  React.useEffect(() => {
    if (tokenSupply !== 0 && tokenSupplyUnits !== "Units") {
      setAntiWhaleProtection(
        0.005 * (parseFloat(tokenSupply) * NumberMap[tokenSupplyUnits])
      )
      callback(tokenSupply, tokenSupplyUnits)
    }
  }, [tokenSupply, tokenSupplyUnits])

  // React.useEffect(() => {
  //   if (antiWhaleProtection !== null) {
  //     cartDispatch({
  //       step: 3.3,
  //       payload: {
  //         step3: {
  //           auto_liquidation: cartState.step3.auto_liquidation,
  //           rfi_rewards: cartState.step3.rfi_rewards,
  //           WHALE_PROTECTION: antiWhaleProtection,
  //           auto_burn: cartState.step3.auto_burn,
  //           auto_charity: cartState.step3.auto_charity,
  //           totalFees: cartState.step3.totalFees,
  //         },
  //       },
  //     })
  //   }
  // }, [antiWhaleProtection])
  return (
    <>
      <div className="columns">
        <div className="column">
          <CardTitle title={cardData.title} size="small" />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <div className="centerinput">
            <div className={`input-block ${!!tokenSupply ? "success" : ""}`}>
              <input
                type="number"
                onChange={handleTokenSupplyChange}
                id="supplyinput"
                required="required"
                spellcheck="false"
                min="1"
                max="100"
                value={tokenSupply}
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
              value={tokenSupplyUnits}
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
      <div className="columns feesGroup">
        <div className="column is-one-quarter is-half-mobile static-fee-column feeSpacing">
          <span className="is-size-7 is-size-8-mobile has-text-centered">
            Fees
          </span>
        </div>
        <div className="column">
          <span className="is-size-6 is-size-7-mobile has-text-centered feeNetwork">
            <span className="feeNumber">{fee}</span>
            <span>{` `}</span>
            <span className="feeMeasure">{fee !== "Free" ? (network === "eth" ? `ETH` : `BNB`) : ``}</span>
          </span>
        </div>
        <div className="column is-one-quarter">
          <NetworkIcon network={network} />
        </div>
      </div>
    </div>
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
