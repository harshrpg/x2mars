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
        <div className="container columns">
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
                <span className="is-size-5">
                  Provide Coin Details, such as Coin Name, Coin Ticker, Coin
                  Supply
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
        <div className="container columns">
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
  const [moveToNextStep, setMoveToNextStep] = React.useState(false)

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
                  <>
                    <span className="is-size-6">
                      {`A Decentralized Exchange (DEX) Pool is a very important feature for any decentralized crypto coin. It allows your holders to swap ${network.toUpperCase()} for your token easily. Check out the Help Me page for more information.`}
                    </span>
                  </>
                ) : (
                  <span className="is-size-6">
                    Here you decide how much fee do you want to charge per
                    transaction and what do you want to do with it. If you feel
                    lost head over to the Help Me page.
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
            <Step3FotToken
              network={network}
              isTestNetwork={isTestNetwork}
              setNextStepDisabledToolTip={setNextStepDisabledToolTip}
              setMoveToNextStep={setMoveToNextStep}
            />
          )}
        </div>
        <div className="container columns">
          <div className="column">
            <NextAndPreviousStep
              prevStepDisabled={false}
              nextStepDisabled={!moveToNextStep}
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
              <div className="column" style={{ textAlign: "center" }}>
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
                        <span>I don't want a DEX Pool</span>
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
                        <span>Create a DEX Pool</span>
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

const Step3FotToken = ({
  network,
  isTestNetwork,
  setNextStepDisabledToolTip,
  setMoveToNextStep,
}) => {
  const imageUni = useImageForData("uni.png")
  const imageCake = useImageForData("cake.png")
  const imageRfi = useImageForData("rfi.png")
  const imageWp = useImageForData("awp.png")
  const imageAb = useImageForData("ab.png")
  const imageAc = useImageForData("ac.png")
  const imageByNetwork = {
    eth: imageUni,
    bnb: imageCake,
  }
  const dexNameByNetwork = {
    eth: "Uniswap",
    bnb: "Pancake Swap",
  }
  const [steps, _] = React.useState(StepsModel.Step3)

  const cartState = useCartState()
  const cartDispatch = useCartDispatch()

  const [liquidityFee, setLiquidityFee] = React.useState(
    cartState.step3.auto_liquidation
  )
  const [whaleProtectionFee, setWhaleProtectionFee] = React.useState(
    cartState.step3.WHALE_PROTECTION
  )
  const [rfiStaticRewardsFee, setRfiStaticRewardsFee] = React.useState(
    cartState.step3.rfi_rewards
  )
  const [automaticBurnFee, setAutomaticBurnFee] = React.useState(
    cartState.step3.auto_burn
  )
  const [automaticCharityFee, setAutomaticCharityFee] = React.useState(
    cartState.step3.auto_charity
  )
  const [automaticCharityAddress, setAutomaticCharityAddress] = React.useState(
    cartState.step3.charity_address ===
      "0x000000000000000000000000000000000000dEaD"
      ? null
      : cartState.step3.charity_address
  )

  function handleLiquidityFeeChange(event) {
    if (event.target.value === "") {
      setLiquidityFee(null)
      setNextStepDisabledToolTip("Please fill in all Required fields")
      setMoveToNextStep(false)
    } else {
      setLiquidityFee(event.target.value)
      setNextStepDisabledToolTip(null)
      setMoveToNextStep(true)
    }
  }

  function handleRFIStaticRewardsFeeChange(event) {
    if (event.target.value === "") {
      setRfiStaticRewardsFee(null)
    } else {
      setRfiStaticRewardsFee(event.target.value)
    }
  }
  function handleWhaleProtectionFeeChange(event) {
    if (event.target.value === "") {
      setWhaleProtectionFee(null)
    } else {
      setWhaleProtectionFee(event.target.value)
    }
  }
  function handleAutomaticBurnFeeChange(event) {
    if (event.target.value === "") {
      setAutomaticBurnFee(null)
    } else {
      setAutomaticBurnFee(event.target.value)
    }
  }
  function handleAutomaticCharityFeeChange(event) {
    if (event.target.value === "") {
      setAutomaticCharityFee(null)
    } else {
      setAutomaticCharityFee(event.target.value)
    }
  }
  function handleAutomaticCharityAddressChange(event) {
    if (event.target.value === "") {
      setAutomaticCharityAddress(null)
    } else {
      var pattern = "^0x[a-fA-F0-9]{40}$"
      var result = event.target.value.match(pattern)
      if (result === null) {
        setAutomaticCharityAddress(null)
      } else {
        setAutomaticCharityAddress(event.target.value)
      }
    }
  }

  function setCharityNull() {
    setAutomaticCharityFee("")
    setAutomaticCharityAddress("")
  }

  React.useEffect(() => {
    setNextStepDisabledToolTip("Please fill in all Required fields")
  }, [])

  React.useEffect(() => {
    cartDispatch({
      step: 3.1,
      payload: {
        step3: {
          auto_liquidation: liquidityFee,
          rfi_rewards: cartState.step3.rfi_rewards,
          WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
          auto_burn: cartState.step3.auto_burn,
          auto_charity: cartState.step3.auto_charity,
          charity_address: cartState.step3.charity_address,
          totalFees: cartState.step3.totalFees,
        },
      },
    })
  }, [liquidityFee])

  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column right-text-align">
            <div className="theme-view-box success">
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <button class="button is-danger is-light">
                        Required
                      </button>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <GatsbyImage
                        image={imageByNetwork[network]}
                        alt="dex-pool"
                      />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">Create a DEX Pool</span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-6">
                        {`A DEX Pool is where your holders can swap ${network.toUpperCase()} with your tokens`}
                      </span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="note is-small">
                        <span className="is-size-6">
                          Look out for your Pool's Address while checking out
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <button
                        className="button theme-action-button-gradient-orange"
                        type="button"
                      >
                        <span>Automatically Saved</span>
                        <span class="icon is-size-3">
                          <BsCheck />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column left-text-align">
            <div
              className={`theme-view-box ${
                !!liquidityFee ? "success" : "failed"
              }`}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <button class="button is-danger is-light">
                        Required
                      </button>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <GatsbyImage
                        image={imageByNetwork[network]}
                        alt="dex-pool"
                      />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">
                        Automate your liquidation
                      </span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-6">
                        The fee you charge is returned to the DEX Pool for
                        constant supply always
                      </span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!liquidityFee ? "success" : ""
                          }`}
                        >
                          <input
                            type="number"
                            required={true}
                            spellCheck={false}
                            onChange={handleLiquidityFeeChange}
                            value={liquidityFee}
                            min={5}
                            max={15}
                          />
                          <span className="placeholder">Fee [5% - 15%]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!liquidityFee ? (
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
          <div className="column right-text-align">
            <div
              className={`theme-view-box ${
                !!rfiStaticRewardsFee ? "success" : ""
              }`}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <button class="button is-warning is-light">
                        Optional
                      </button>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <GatsbyImage image={imageRfi} alt="dex-pool" />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">Reward back to Holders</span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-6">
                        Distribute the fee back to the holders. Also called as
                        RFI Static Rewards
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
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!rfiStaticRewardsFee ? "success" : ""
                          }`}
                        >
                          <input
                            type="number"
                            required={true}
                            spellCheck={false}
                            onChange={handleRFIStaticRewardsFeeChange}
                            value={rfiStaticRewardsFee}
                            min={5}
                            max={15}
                          />
                          <span className="placeholder">Fee [5% - 15%]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!rfiStaticRewardsFee ? (
                        <button
                          className="button theme-action-button-gradient-red"
                          type="button"
                          onClick={() => setRfiStaticRewardsFee("")}
                        >
                          <span>Remove From Contract</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
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
          <div className="column left-text-align">
            <div
              className={`theme-view-box ${
                !!whaleProtectionFee ? "success" : ""
              }`}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <button class="button is-warning is-light">
                        Optional
                      </button>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <GatsbyImage image={imageWp} alt="dex-pool" />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">Whale Protection</span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-6">
                        Discourage Whales from manipulating your coin's value.
                        (0.5% of total Supply)
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
                              steps.cardData[2].price[network]
                            }  ${network.toUpperCase()}`}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!whaleProtectionFee ? "success" : ""
                          }`}
                        >
                          <input
                            type="number"
                            required={true}
                            spellCheck={false}
                            onChange={handleWhaleProtectionFeeChange}
                            value={whaleProtectionFee}
                            min={5}
                            max={15}
                          />
                          <span className="placeholder">
                            0.5% of Total Supply
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!whaleProtectionFee ? (
                        <button
                          className="button theme-action-button-gradient-red"
                          type="button"
                          onClick={() => setWhaleProtectionFee("")}
                        >
                          <span>Remove From Contract</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
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
        <div className="columns" style={{ alignItems: "flex-start" }}>
          <div className="column right-text-align">
            <div
              className={`theme-view-box ${
                !!automaticBurnFee ? "success" : ""
              }`}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <button class="button is-warning is-light">
                        Optional
                      </button>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <GatsbyImage image={imageAb} alt="dex-pool" />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">Burn the fee</span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-6">
                        Reduce your coin's supply by burning (destroying) the
                        fee at every transaction.
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
                              steps.cardData[3].price[network]
                            }  ${network.toUpperCase()}`}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!automaticBurnFee ? "success" : ""
                          }`}
                        >
                          <input
                            type="number"
                            required={true}
                            spellCheck={false}
                            onChange={handleAutomaticBurnFeeChange}
                            value={automaticBurnFee}
                            min={5}
                            max={15}
                          />
                          <span className="placeholder">Fee [5% - 15%]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!automaticBurnFee ? (
                        <button
                          className="button theme-action-button-gradient-red"
                          type="button"
                          onClick={() => setAutomaticBurnFee("")}
                        >
                          <span>Remove From Contract</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
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
          <div className="column left-text-align">
            <div
              className={`theme-view-box ${
                !!automaticCharityFee && !!automaticCharityAddress
                  ? "success"
                  : ""
              }`}
            >
              <div className="columns" style={{ padding: "1rem" }}>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <button class="button is-warning is-light">
                        Optional
                      </button>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <GatsbyImage image={imageAc} alt="dex-pool" />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-5">Give to Charity</span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <span className="is-size-6">
                        {`Donate the fees to a charity that has a ${network.toUpperCase()} wallet`}
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
                              steps.cardData[4].price[network]
                            }  ${network.toUpperCase()}`}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!automaticCharityFee ? "success" : ""
                          }`}
                        >
                          <input
                            type="number"
                            required={true}
                            spellCheck={false}
                            onChange={handleAutomaticCharityFeeChange}
                            value={automaticCharityFee}
                            min={5}
                            max={15}
                          />
                          <span className="placeholder">Fee [5% - 15%]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!automaticCharityAddress ? "success" : ""
                          }`}
                        >
                          <input
                            type="text"
                            required={true}
                            spellCheck={false}
                            onChange={handleAutomaticCharityAddressChange}
                            value={automaticCharityAddress}
                            pattern="^0x[a-fA-F0-9]{40}$"
                          />
                          <span className="placeholder">
                            e.g. 0x3fw434.....09sdf
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!automaticCharityFee && !!automaticCharityAddress ? (
                        <button
                          className="button theme-action-button-gradient-red"
                          type="button"
                          onClick={setCharityNull}
                        >
                          <span>Remove From Contract</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
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
      </div>
    </>
  )
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
        <div className="column" style={{ textAlign: "start" }}>
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
    </>
  )
}

export default Steps
