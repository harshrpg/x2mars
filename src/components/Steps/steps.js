import { GatsbyImage } from "gatsby-plugin-image"
import { useImageForData } from "../../hooks/useAllImages"
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft"
import { BsCheck } from "@react-icons/all-files/bs/BsCheck"
import { BsX } from "@react-icons/all-files/bs/BsX"
import { BsQuestionCircle } from "@react-icons/all-files/bs/BsQuestionCircle"
import * as React from "react"

import "./style/steps-style.scss"
import { NetworkIcon } from "../Icons/icons"
import { useWeb3React } from "@web3-react/core"
import {
  NetworkConstants,
  NetworkFromChainId,
  TokenTypeIds,
  TokenTypes,
} from "../../util/Constants"
import { StepsModel } from "../../util/factory-steps"
import { useCartDispatch, useCartState } from "../../context"

const Steps = () => {
  const image = useImageForData("tailCur.png")
  const image2 = useImageForData("sum.png")
  const image3 = useImageForData("mac.png")

  const { chainId } = useWeb3React()

  const [isTestNetwork, setIsTestNetwork] = React.useState(true)
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    if (!!chainId) {
      setNetwork(NetworkFromChainId[chainId])
      if (chainId === 1 || chainId === 56) {
        setIsTestNetwork(false)
      } else {
        setIsTestNetwork(true)
      }
    }
  }, [chainId])
  return (
    <>
      {step === 0 ? (
        <StepsExplaination
          step1Image={image}
          step2Image={image2}
          step3Image={image3}
          setStep={setStep}
        />
      ) : step === 1 ? (
        <Step1
          image={image}
          setStep={setStep}
          step={step}
          network={network}
          isTestNetwork={isTestNetwork}
        />
      ) : step === 2 ? (
        <Step2
          image={image}
          image2={image2}
          setStep={setStep}
          step={step}
          network={network}
          isTestNetwork={isTestNetwork}
        />
      ) : step === 3 ? (
        <Step3
          image={image}
          image2={image2}
          setStep={setStep}
          step={step}
          network={network}
          isTestNetwork={isTestNetwork}
        />
      ) : (
        ``
      )}
    </>
  )
}

const StepsExplaination = ({ step1Image, step2Image, step3Image, setStep }) => {
  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column">
            <span className="is-size-1">
              Create your currency in 3 simple steps
            </span>
          </div>
        </div>
        <div className="container columns">
          <div className="column is-4">
            <div className="columns">
              <div className="column">
                <div className="theme-view-box">
                  <div className="columns" style={{ paddingLeft: "2rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <span
                            className="is-size-4"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Step 1
                          </span>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <span className="is-size-7">
                            Select between Governance DAO Coins or Fee On
                            Transfer (Meme) Coins
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <GatsbyImage
                        image={step1Image}
                        alt={"token type"}
                        width={2}
                        height={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="columns">
              <div className="column">
                <div className="theme-view-box">
                  <div className="columns" style={{ paddingLeft: "2rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <span
                            className="is-size-4"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Step 2
                          </span>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <span className="is-size-7">
                            Provide Coin Details, such as Coin Name, Coin
                            Ticker, Coin Supply
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <GatsbyImage
                        image={step2Image}
                        alt={"coin details"}
                        width={2}
                        height={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="columns">
              <div className="column">
                <div className="theme-view-box">
                  <div className="columns" style={{ paddingLeft: "2rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <span
                            className="is-size-4"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Step 3
                          </span>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <span className="is-size-7">
                            Select additional features for your coins
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <GatsbyImage
                        image={step3Image}
                        alt={"token type"}
                        width={2}
                        height={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container columns has-text-centered">
          <div className="column">
            <button
              className="button theme-action-button-gradient-green padded contained"
              type="button"
              onClick={() => setStep(1)}
            >
              <span>Lets Create My Currency</span>
              <span class="icon is-size-3">
                <BsArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const Step1 = ({ image, setStep, step, network, isTestNetwork }) => {
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const fotImage = useImageForData("fot.png")
  const [steps, _] = React.useState(StepsModel.Step1)
  const [nextStepDisabledToolTip, setNextStepDisabledToolTip] = React.useState(
    null
  )
  const [coinSelected, setCoinSelected] = React.useState(
    cartState.step1.selectedToken
  )

  React.useEffect(() => {
    if (coinSelected === -1) {
      setNextStepDisabledToolTip("Please select a token type first")
    } else if (coinSelected !== -1) {
      setNextStepDisabledToolTip(null)
      dispatchCoinSelection()
    }
  }, [coinSelected])

  function dispatchCoinSelection() {
    var selectionPrice = 0.0
    if (!isTestNetwork) {
      selectionPrice = steps.cardData[coinSelected].price[network]
    }
    cartDispatch({
      step: 1,
      payload: {
        step1: {
          selectedToken: coinSelected,
          totalFees: selectionPrice,
        },
      },
    })
    switch (coinSelected) {
      case TokenTypeIds.GOVERNANCE:
        cartDispatch({
          step: 2,
          payload: {
            step2: {
              tokenName: cartState.step2.tokenName,
              tokenSymbol: cartState.step2.tokenSymbol,
              tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
              tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
              tokenDecimals: cartState.step2.tokenDecimals,
              dexSelected: false,
              totalFees: 0,
            },
          },
        })
        break
      case TokenTypeIds.FEE_ON_TRANSFER:
        cartDispatch({
          step: 2,
          payload: {
            step2: {
              tokenName: cartState.step2.tokenName,
              tokenSymbol: cartState.step2.tokenSymbol,
              tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
              tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
              tokenDecimals: cartState.step2.tokenDecimals,
              dexSelected: cartState.step2.dexSelected,
              totalFees: 0,
            },
          },
        })
        break
      default:
        console.log("ERROR: Cannot find token type ID: ", coinSelected)
        break
    }
  }

  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage image={image} alt="step 1 image" />
          </div>
          <div className="column">
            <div className="columns">
              <div className="column">
                <span className="is-size-2">Step 1</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-5">
                  Select between Governance DAO Coins or Fee On Transfer (Meme)
                  Coins
                </span>
              </div>
            </div>
          </div>
          <div className="column" style={{ textAlign: "end" }}>
            <button
              className="button theme-action-button-gradient-green padded"
              type="button"
            >
              <span>Help Me</span>
              <span class="icon is-size-3">
                <BsQuestionCircle />
              </span>
            </button>
          </div>
        </div>
        <div className="container columns">
          <div className="column right-text-align">
            <div
              className={`theme-view-box ${coinSelected === 0 ? "active" : ""}`}
              style={{ padding: "3rem" }}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <GatsbyImage image={image} alt="governance coin" />
                </div>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">Governance DAO Coins</span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div
                        className="theme-price-box"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <div className="columns">
                          <div className="column">Price</div>
                          <div className="column">
                            <NetworkIcon network={network} />
                          </div>
                          {isTestNetwork ? (
                            <div className="column">{`0  ${network.toUpperCase()}`}</div>
                          ) : (
                            <div className="column">{`${
                              steps.cardData[0].price[network]
                            }  ${network.toUpperCase()}`}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {coinSelected === 0 ? (
                        <button
                          className="button theme-action-button-gradient-orange"
                          type="button"
                        >
                          <span>Coin Selected</span>
                          <span class="icon is-size-3">
                            <BsCheck />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green"
                          type="button"
                          onClick={() => setCoinSelected(0)}
                        >
                          <span>Create this coin</span>
                          <span class="icon is-size-3">
                            <BsArrowRight />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column left-text-align">
            <div
              className={`theme-view-box ${coinSelected === 1 ? "active" : ""}`}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <GatsbyImage image={fotImage} alt="fot coin" />
                </div>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">
                        Fee On Transfer (Meme) Coins
                      </span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div
                        className="theme-price-box"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <div className="columns">
                          <div className="column">Price</div>
                          <div className="column">
                            <NetworkIcon network={network} />
                          </div>
                          {isTestNetwork ? (
                            <div className="column">{`0  ${network.toUpperCase()}`}</div>
                          ) : (
                            <div className="column">{`${
                              steps.cardData[1].price[network]
                            }  ${network.toUpperCase()}`}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {coinSelected === 1 ? (
                        <button
                          className="button theme-action-button-gradient-orange"
                          type="button"
                        >
                          <span>Coin Selected</span>
                          <span class="icon is-size-3">
                            <BsCheck />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green"
                          type="button"
                          onClick={() => setCoinSelected(1)}
                        >
                          <span>Create this coin</span>
                          <span class="icon is-size-3">
                            <BsArrowRight />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <NextAndPreviousStep
              prevStepDisabled={false}
              nextStepDisabled={coinSelected === -1}
              prevStepToolTip={null}
              nextStepToolTip={nextStepDisabledToolTip}
              setStep={setStep}
              step={step}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const Step2 = ({ image, image2, setStep, step, network, isTestNetwork }) => {
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const fotImage = useImageForData("fot.png")
  const [nextStepDisabledToolTip, setNextStepDisabledToolTip] = React.useState(
    null
  )
  const [dataProvided, setDataProvided] = React.useState(false)
  const [coinSelected, __] = React.useState(cartState.step1.selectedToken)
  const [coinName, setCoinName] = React.useState(cartState.step2.tokenName)
  const [coinTicker, setCoinTicker] = React.useState(
    cartState.step2.tokenSymbol
  )
  const [coinSupplyNumber, setCoinSupplyNumber] = React.useState(
    cartState.step2.tokenSupplyNumber
  )
  const [coinSupplyUnits, setCoinSupplyUnits] = React.useState(
    cartState.step2.tokenSupplyUnits
  )
  const [dexSelected, ___] = React.useState(cartState.step2.dexSelected)

  function handleCoinNameChange(event) {
    setCoinName(event.target.value)
    cartDispatch({
      step: 2,
      payload: {
        step2: {
          tokenName: event.target.value,
          tokenSymbol: cartState.step2.tokenSymbol,
          tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
          tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
          tokenDecimals: cartState.step2.tokenDecimals,
          dexSelected: cartState.step2.dexSelected,
          totalFees: cartState.step2.totalFees,
        },
      },
    })
  }

  function handleCoinTickerChange(event) {
    setCoinTicker(event.target.value)
    cartDispatch({
      step: 2,
      payload: {
        step2: {
          tokenName: cartState.step2.tokenName,
          tokenSymbol: event.target.value,
          tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
          tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
          tokenDecimals: cartState.step2.tokenDecimals,
          dexSelected: cartState.step2.dexSelected,
          totalFees: cartState.step2.totalFees,
        },
      },
    })
  }

  function handleCoinSupplyChange(event) {
    setCoinSupplyNumber(event.target.value)
    cartDispatch({
      step: 2,
      payload: {
        step2: {
          tokenName: cartState.step2.tokenName,
          tokenSymbol: cartState.step2.tokenSymbol,
          tokenSupplyNumber: event.target.value,
          tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
          tokenDecimals: cartState.step2.tokenDecimals,
          dexSelected: cartState.step2.dexSelected,
          totalFees: cartState.step2.totalFees,
        },
      },
    })
  }

  function handleCoinSupplyUnitsChange(event) {
    setCoinSupplyUnits(event.target.value)
    cartDispatch({
      step: 2,
      payload: {
        step2: {
          tokenName: cartState.step2.tokenName,
          tokenSymbol: cartState.step2.tokenSymbol,
          tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
          tokenSupplyUnits: event.target.value,
          tokenDecimals: cartState.step2.tokenDecimals,
          dexSelected: cartState.step2.dexSelected,
          totalFees: cartState.step2.totalFees,
        },
      },
    })
  }

  function dispatchValues() {
    cartDispatch({
      step: 2,
      payload: {
        step2: {
          tokenName: coinName,
          tokenSymbol: coinTicker,
          tokenSupplyNumber: coinSupplyNumber,
          tokenSupplyUnits: coinSupplyUnits,
          tokenDecimals: cartState.step2.tokenDecimals,
          dexSelected: dexSelected,
          totalFees: cartState.step2.totalFees,
        },
      },
    })
  }

  React.useEffect(() => {
    if (
      !!coinName &&
      !!coinTicker &&
      !!coinSupplyNumber &&
      coinSupplyUnits !== "Units"
    ) {
      setDataProvided(true)
    } else {
      setDataProvided(false)
    }
  }, [coinName, coinTicker, coinSupplyNumber, coinSupplyUnits])

  React.useEffect(() => {
    if (!dataProvided) {
      setNextStepDisabledToolTip("Please complete the form with required data")
    } else {
      setNextStepDisabledToolTip(null)
      dispatchValues()
    }
  }, [dataProvided])

  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage
              image={
                coinSelected === TokenTypeIds.GOVERNANCE
                  ? image
                  : coinSelected === TokenTypeIds.FEE_ON_TRANSFER
                  ? fotImage
                  : image2
              }
              alt="step 2 image"
            />
          </div>
          <div className="column">
            <div className="columns">
              <div className="column">
                <span className="is-size-2">Step 2</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-5">
                  {`You are creating ${TokenTypes[coinSelected]}`}
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                {coinSelected === TokenTypeIds.GOVERNANCE ? (
                  <span className="is-size-5">
                    Provide Coin Details, such as Coin Name, Coin Ticker, Coin
                    Supply and select if you'd like a decentralized exchange
                    pool for your coins
                  </span>
                ) : (
                  <span className="is-size-5">
                    Provide Coin Details, such as Coin Name, Coin Ticker, Coin
                    Supply
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="column" style={{ textAlign: "end" }}>
            <button
              className="button theme-action-button-gradient-green padded"
              type="button"
            >
              <span>Help Me</span>
              <span class="icon is-size-3">
                <BsQuestionCircle />
              </span>
            </button>
          </div>
        </div>
        <div className="container columns">
          <div className="column centered-text-align">
            <div
              className={`theme-view-box ${
                dataProvided ? "success" : "failed"
              }`}
              style={{ padding: "3rem" }}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!coinName ? "success" : ""
                          }`}
                        >
                          <input
                            type="text"
                            required={true}
                            spellCheck={false}
                            onChange={handleCoinNameChange}
                            value={coinName}
                          />
                          <span className="placeholder">Coin Name</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ paddingTop: 0 }}>
                    <div className="column">
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!coinTicker ? "success" : ""
                          }`}
                        >
                          <input
                            type="text"
                            required={true}
                            spellCheck={false}
                            onChange={handleCoinTickerChange}
                            value={coinTicker}
                          />
                          <span className="placeholder">Coin Ticker</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ paddingTop: 0 }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <div className="centerinput">
                            <div
                              className={`input-block ${
                                !!coinSupplyNumber ? "success" : ""
                              }`}
                            >
                              <input
                                type="number"
                                required={true}
                                spellCheck={false}
                                onChange={handleCoinSupplyChange}
                                value={coinSupplyNumber}
                                min={1}
                                max={100}
                              />
                              <span className="placeholder">
                                Coin Ticker [1-100]
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="column">
                          <div
                            className={`select custom-select ${
                              coinSupplyUnits !== "Units" ? "success" : ""
                            }`}
                          >
                            <select
                              className="is-hovered"
                              onChange={handleCoinSupplyUnitsChange}
                              value={coinSupplyUnits}
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
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {dataProvided ? (
                        <button
                          className="button theme-action-button-gradient-orange"
                          type="button"
                        >
                          <span>Saved</span>
                          <span class="icon is-size-3">
                            <BsCheck />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
                          data-tooltip={nextStepDisabledToolTip}
                        >
                          <span>Save to Contract</span>
                          <span class="icon is-size-3">
                            <BsArrowRight />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <NextAndPreviousStep
              prevStepDisabled={false}
              nextStepDisabled={!dataProvided}
              prevStepToolTip={null}
              nextStepToolTip={nextStepDisabledToolTip}
              setStep={setStep}
              step={step}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const Step3 = ({ image, image2, setStep, step, network, isTestNetwork }) => {
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const fotImage = useImageForData("fot.png")
  const [steps, _] = React.useState(StepsModel.Step1)
  const [nextStepDisabledToolTip, setNextStepDisabledToolTip] = React.useState(
    null
  )
  const [coinSelected, setCoinSelected] = React.useState(
    cartState.step1.selectedToken
  )

  React.useEffect(() => {
    if (coinSelected === -1) {
      setNextStepDisabledToolTip("Please select a token type first")
    } else if (coinSelected !== -1) {
      setNextStepDisabledToolTip(null)
      dispatchCoinSelection()
    }
  }, [coinSelected])

  function dispatchCoinSelection() {
    cartDispatch({
      step: 1,
      payload: {
        step1: {
          selectedToken: coinSelected,
          totalFees: steps.cardData[coinSelected].price[network],
        },
      },
    })
    switch (coinSelected) {
      case TokenTypeIds.GOVERNANCE:
        cartDispatch({
          step: 2,
          payload: {
            step2: {
              tokenName: cartState.step2.tokenName,
              tokenSymbol: cartState.step2.tokenSymbol,
              tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
              tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
              tokenDecimals: cartState.step2.tokenDecimals,
              dexSelected: false,
              totalFees: 0,
            },
          },
        })
        break
      case TokenTypeIds.FEE_ON_TRANSFER:
        cartDispatch({
          step: 2,
          payload: {
            step2: {
              tokenName: cartState.step2.tokenName,
              tokenSymbol: cartState.step2.tokenSymbol,
              tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
              tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
              tokenDecimals: cartState.step2.tokenDecimals,
              dexSelected: cartState.step2.dexSelected,
              totalFees: 0,
            },
          },
        })
        break
      default:
        console.log("ERROR: Cannot find token type ID: ", coinSelected)
        break
    }
  }

  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage
              image={
                coinSelected === TokenTypeIds.GOVERNANCE
                  ? image
                  : coinSelected === TokenTypeIds.FEE_ON_TRANSFER
                  ? fotImage
                  : image2
              }
              alt="step 3 image"
            />
          </div>
          <div className="column">
            <div className="columns">
              <div className="column">
                <span className="is-size-2">Step 3</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-5">
                  {`You are creating ${TokenTypes[coinSelected]}`}
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                {coinSelected === TokenTypeIds.GOVERNANCE ? (
                  <span className="is-size-5">
                    Here you can select if you need a Decentralized Exchange
                    Pool for your Coins. If you don't know what a Decentralized
                    Exchange Pool is you can read about it in the Help page.
                  </span>
                ) : (
                  <span className="is-size-5">
                    Here you decide how much fee do you want to charge per
                    transaction and what do you want to do with it.
                    Decentralized Exchange Pool is automatically created for Fee
                    On Transfer (Meme)
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="column" style={{ textAlign: "end" }}>
            <button
              className="button theme-action-button-gradient-green padded"
              type="button"
            >
              <span>Help Me</span>
              <span class="icon is-size-3">
                <BsQuestionCircle />
              </span>
            </button>
          </div>
        </div>
        <div className="container">
          {coinSelected === TokenTypeIds.GOVERNANCE ? (
            <Step3GovToken network={network} isTestNetwork={isTestNetwork} />
          ) : (
            ``
          )}
        </div>
        <div className="columns">
          <div className="column">
            <NextAndPreviousStep
              prevStepDisabled={false}
              nextStepDisabled={coinSelected === -1}
              prevStepToolTip={null}
              nextStepToolTip={nextStepDisabledToolTip}
              setStep={setStep}
              step={step}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const Step3GovToken = ({ network, isTestNetwork }) => {
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const [steps, _] = React.useState(StepsModel.Step2)
  const [dexSelected, setDexSelected] = React.useState(
    cartState.step2.dexSelected
  )
  const [coinSelected, ___] = React.useState(cartState.step1.selectedToken)
  const [step2Fee, setStep2Fee] = React.useState(0.0)
  const imageUni = useImageForData("uni.png")
  const imageCake = useImageForData("cake.png")
  const imageByNetwork = {
    eth: imageUni,
    bnb: imageCake,
  }
  const dexNameByNetwork = {
    eth: "Uniswap",
    bnb: "Pancake Swap",
  }
  React.useEffect(() => {}, [network, coinSelected])
  React.useEffect(() => {
    if (dexSelected) {
      if (!isTestNetwork) {
        if (coinSelected === TokenTypeIds.GOVERNANCE) {
          setStep2Fee(steps.cardData[2].price[network])
        } else {
          setStep2Fee(0.0)
        }
      } else {
        setStep2Fee(0.0)
      }
    } else {
      setStep2Fee(0.0)
    }
  }, [dexSelected, network, coinSelected])

  React.useEffect(() => {
    cartDispatch({
      step: 2,
      payload: {
        step2: {
          tokenName: cartState.step2.tokenName,
          tokenSymbol: cartState.step2.tokenSymbol,
          tokenSupplyNumber: cartState.step2.tokenSupplyNumber,
          tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
          tokenDecimals: cartState.step2.tokenDecimals,
          dexSelected: dexSelected,
          totalFees: step2Fee,
        },
      },
    })
  }, [dexSelected, step2Fee])

  return (
    <>
      <div className="columns">
        <div className="column centered-text-align">
          <div className="theme-view-box">
            <div className="columns" style={{ padding: "1rem" }}>
              <div className="column" style={{textAlign: "center"}}>
                <div className="columns">
                  <div className="column">
                    <GatsbyImage
                      image={imageByNetwork[network]}
                      alt="dex pool"
                    />
                  </div>
                </div>
                <div className="columns" style={{ paddingTop: 0 }}>
                  <div className="column">
                    <span className="is-size-5">{`Create a Dex Pool at ${dexNameByNetwork[network]}`}</span>
                  </div>
                </div>
                <div className="columns" style={{ paddingTop: 0 }}>
                  <div className="column">
                    <div
                      className="theme-price-box"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <div className="columns">
                        <div className="column">Price</div>
                        <div className="column">
                          <NetworkIcon network={network} />
                        </div>
                        {isTestNetwork ? (
                          <div className="column">{`0  ${network.toUpperCase()}`}</div>
                        ) : (
                          <div className="column">{`${
                            steps.cardData[2].price[network]
                          }  ${network.toUpperCase()}`}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    {dexSelected ? (
                      <button
                        className="button theme-action-button-gradient-red"
                        type="button"
                        onClick={() => setDexSelected(false)}
                      >
                        <span>Remove from Coin</span>
                        <span class="icon is-size-3">
                          <BsX />
                        </span>
                      </button>
                    ) : (
                      <button
                        className="button theme-action-button-gradient-green has-tooltip-bottom"
                        type="button"
                        onClick={() => setDexSelected(true)}
                      >
                        <span>Save to Contract</span>
                        <span class="icon is-size-3">
                          <BsArrowRight />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Step3FotToken = ({ image, setStep, step, network, isTestNetwork }) => {
  return <></>
}

const NextAndPreviousStep = ({
  prevStepDisabled,
  nextStepDisabled,
  prevStepToolTip,
  nextStepToolTip,
  setStep,
  step,
}) => {
  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column" style={{ textAlign: "end" }}>
            <button
              className="button theme-action-button-gradient-purple contained has-tooltip-bottom"
              type="button"
              disabled={prevStepDisabled}
              data-tooltip={
                prevStepDisabled ? prevStepToolTip : "Go to previous step"
              }
              onClick={() => setStep(step - 1)}
            >
              <span class="icon is-size-3">
                <BsArrowLeft />
              </span>
              <span>Prev Step</span>
            </button>
          </div>
          <div className="column">
            <button
              className="button theme-action-button-gradient-purple contained has-tooltip-bottom"
              type="button"
              disabled={nextStepDisabled}
              data-tooltip={
                nextStepDisabled ? nextStepToolTip : "Go to next step"
              }
              onClick={() => setStep(step + 1)}
            >
              <span>Next Step</span>
              <span class="icon is-size-3">
                <BsArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Steps
