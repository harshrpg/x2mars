import { GatsbyImage } from "gatsby-plugin-image"
import { useImageForData } from "../../hooks/useAllImages"
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft"
import { BsCheck } from "@react-icons/all-files/bs/BsCheck"
import { BsX } from "@react-icons/all-files/bs/BsX"
import { BsQuestionCircle } from "@react-icons/all-files/bs/BsQuestionCircle"
import * as React from "react"
import { GoX } from "@react-icons/all-files/go/GoX"
import "./style/steps-style.scss"
import { NetworkIcon } from "../Icons/icons"
import { useWeb3React } from "@web3-react/core"
import {
  NetworkConstants,
  NetworkFromChainId,
  NumberMap,
  TokenTypeIds,
  TokenTypes,
} from "../../util/Constants"
import { StepsModel } from "../../util/factory-steps"
import { useCartDispatch, useCartState } from "../../context"
import { BsDash } from "@react-icons/all-files/bs/BsDash"
import { BsPlus } from "@react-icons/all-files/bs/BsPlus"
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark"
import { CartContent } from "../Cart/cart"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"

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
      ) : step === 4 ? (
        <SummaryStep
          image={image}
          image2={image2}
          setStep={setStep}
          step={step}
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
              <span>Lets Create Your Currency</span>
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
  const { chainId } = useWeb3React()
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
  const [isHelpOpen, setIsHelpOpen] = React.useState(false)

  const [netWorkNotSupported, setNetworkNotSupported] = React.useState(false)

  React.useEffect(() => {
    if (coinSelected === -1) {
      setNextStepDisabledToolTip("Please select a token type first")
    } else if (coinSelected !== -1) {
      setNextStepDisabledToolTip(null)
      dispatchCoinSelection()
    }
  }, [coinSelected])

  React.useEffect(() => {
    if (chainId === NetworkConstants.KOVAN) {
      setNetworkNotSupported(true)
      setNextStepDisabledToolTip(
        "This network is not supported, please change the network in your wallet"
      )
    } else {
      setNetworkNotSupported(false)
      setNextStepDisabledToolTip(null)
    }
  }, [chainId])

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
              tokenLogo: cartState.step2.tokenLogo
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
              dexSelected: true,
              totalFees: 0,
              tokenLogo: cartState.step2.tokenLogo
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
              onClick={() => setIsHelpOpen(true)}
            >
              <span>Help Me</span>
              <span class="icon is-size-3">
                <BsQuestionCircle />
              </span>
            </button>
          </div>
        </div>

        {netWorkNotSupported ? (
          <div className="container columns">
            <div className="column is-half is-offset-one-quarter-desktop is-half-mobile">
              <span className="is-size-6" id="warning-payments">
                This network is not supported. Please change the network in your
                wallet
              </span>
            </div>
          </div>
        ) : (
          ``
        )}
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
              nextStepDisabled={netWorkNotSupported || coinSelected === -1}
              prevStepToolTip={null}
              nextStepToolTip={nextStepDisabledToolTip}
              setStep={setStep}
              step={step}
            />
          </div>
        </div>
      </div>
      <Step1Help isActive={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
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
  const [isHelpOpen, setIsHelpOpen] = React.useState(false)
  
  const [selectLogoFile, setSelectLogoFile] = React.useState(null)

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
          tokenLogo: cartState.step2.tokenLogo
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
          tokenLogo: cartState.step2.tokenLogo
        },
      },
    })
  }

  function handleCoinSupplyChange(event) {
    if (event.target.value < 0 || event.target.value > 1000) {
      setCoinSupplyNumber(0.0)
    } else {
      setCoinSupplyNumber(event.target.value)
    }
  }

  React.useEffect(() => {
    cartDispatch({
      step: 2,
      payload: {
        step2: {
          tokenName: cartState.step2.tokenName,
          tokenSymbol: cartState.step2.tokenSymbol,
          tokenSupplyNumber: coinSupplyNumber,
          tokenSupplyUnits: cartState.step2.tokenSupplyUnits,
          tokenDecimals: cartState.step2.tokenDecimals,
          dexSelected: cartState.step2.dexSelected,
          totalFees: cartState.step2.totalFees,
          tokenLogo: cartState.step2.tokenLogo
        },
      },
    })
  }, [coinSupplyNumber])

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
          tokenLogo: cartState.step2.tokenLogo
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
          tokenLogo: cartState.step2.tokenLogo
        },
      },
    })
  }

  function fileSelectedHandler(event) {
    document.querySelector('.fileInfo').innerHTML = ``;
    document.querySelector('.fileInfo').innerHTML = `<div><VscLoading /></div>`;
    
    const uploadedFile = event.target.files[0];
    
    document.querySelector('.fileInfo').innerHTML = ``;
    document.querySelector('.fileInfo').innerHTML = `<div><span class="info"><FcCheckmark></FcCheckmark>${event.target.files[0].name}</span></div>`;
  
    const toBase64 = file => new Promise((resolve, reject) => {
	    const reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => resolve(reader.result);
	    reader.onerror = error => reject(error);
	});

		toBase64(uploadedFile)
		.then(res => {
			console.log("logo stuff",res);
      setSelectLogoFile(res);
		})
		.catch(err => {
			console.log(err);
		})
  }

  
  React.useEffect(() => {
    if(!!selectLogoFile){
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
            totalFees: cartState.step2.totalFees,
            tokenLogo: selectLogoFile
          },
        },
      })
    }
  },[selectLogoFile]);

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
              onClick={() => setIsHelpOpen(true)}
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
                          } borderless`}
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
                          } borderless`}
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
                              } borderless`}
                            >
                              <input
                                type="number"
                                required={true}
                                spellCheck={false}
                                onChange={handleCoinSupplyChange}
                                value={coinSupplyNumber}
                                min={1}
                                max={999}
                              />
                              <span className="placeholder">
                                Coin Supply [1-999]
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

                  <div className="columns" style={{ paddingTop: 0 }}>
                    <div className="column">
                      <div className="centerinput">
                      <div
                          className="input-block borderlessLogo selectFile"
                        >
                          <input
                            type="text"
                            required={false}
                            spellCheck={false}
                            value="Upload Logo"
                          />
                          <span className="placeholder">Optional</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="column">
                    <span className="info">Size required - 28px*28px</span>
                    <div class="file is-small">
                      <label class="file-label">
                        <input class="file-input" type="file" accept="image/*" name="resume" onChange={fileSelectedHandler}/>
                        <span class="file-cta button theme-action-button-gradient-blue">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label">
                            Select File
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="fileInfo"><br></br></div>
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
                          <span>Save Feature</span>
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
      <Step2Help isActive={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
    </>
  )
}

const Step3 = ({ image, image2, setStep, step, network, isTestNetwork }) => {
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const fotImage = useImageForData("fot.png")
  const [steps, _] = React.useState(StepsModel.Step1)

  const [coinSelected, setCoinSelected] = React.useState(
    cartState.step1.selectedToken
  )
  const [isHelpOpen, setIsHelpOpen] = React.useState(false)

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
                    In this step you decide what additional features you want to
                    add to your coins. More features attract more customers.{" "}
                    <br />
                    You can select what to do with the fees that will be charged
                    per transaction or implement a whale protection system.
                    <br /> Head over to <b>Help Me</b> if you feel lost
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="column" style={{ textAlign: "end" }}>
            <button
              className="button theme-action-button-gradient-green padded"
              type="button"
              onClick={() => setIsHelpOpen(true)}
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
            <Step3GovToken
              network={network}
              isTestNetwork={isTestNetwork}
              step={step}
              setStep={setStep}
            />
          ) : (
            <Step3FotToken
              network={network}
              isTestNetwork={isTestNetwork}
              step={step}
              setStep={setStep}
            />
          )}
        </div>
      </div>
      <Step3Help isActive={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
    </>
  )
}

const Step3GovToken = ({ network, isTestNetwork, step, setStep }) => {
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
          tokenLogo: cartState.step2.tokenLogo
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
      <div className="container columns">
        <div className="column">
          <NextAndPreviousStep
            prevStepDisabled={false}
            nextStepDisabled={false}
            prevStepToolTip={null}
            nextStepToolTip={null}
            setStep={setStep}
            step={step}
          />
        </div>
      </div>
    </>
  )
}

const Step3FotToken = ({ network, isTestNetwork, step, setStep }) => {
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
  const [steps, _] = React.useState(StepsModel.Step3)

  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const [moveToNextStep, setMoveToNextStep] = React.useState(
    cartState.step3.auto_liquidation !== 0
  )
  const [nextStepDisabledToolTip, setNextStepDisabledToolTip] = React.useState(
    cartState.step3.auto_liquidation !== 0
      ? null
      : 'Please provide "Automate Your Liquidation" value'
  )
  const [liquidityFee, setLiquidityFee] = React.useState(
    cartState.step3.auto_liquidation
  )
  const [whaleProtectionLimit, setWhaleProtectionLimit] = React.useState(
    0.005 *
      (parseFloat(cartState.step2.tokenSupplyNumber) *
        NumberMap[cartState.step2.tokenSupplyUnits])
  )

  const [
    showWhaleProtectionLimit,
    setShowWhaleProtectionLimit,
  ] = React.useState(false)
  const [whaleProtecError, setWhaleProtectionError] = React.useState(false)
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
    cartState.step3.charity_address === process.env.GATSBY_DEAD_ADDRESS
      ? null
      : cartState.step3.charity_address
  )

  function handleLiquidityFeeChange(event) {
    if (event === "increment" && liquidityFee < 15) {
      setLiquidityFee(liquidityFee + 1)
      setNextStepDisabledToolTip(null)
      setMoveToNextStep(true)
    } else if (event === "decrement") {
      if (liquidityFee > 1) {
        setLiquidityFee(liquidityFee - 1)
        setNextStepDisabledToolTip(null)
        setMoveToNextStep(true)
      } else if (liquidityFee === 1) {
        setLiquidityFee(liquidityFee - 1)
        setNextStepDisabledToolTip(
          'Please provide "Automate Your Liquidation" value'
        )
        setMoveToNextStep(false)
      }
    } else {
      setNextStepDisabledToolTip(
        'Please provide "Automate Your Liquidation" value'
      )
      setMoveToNextStep(false)
    }
  }

  function handleRFIStaticRewardsFeeChange(event) {
    if (event === "increment" && rfiStaticRewardsFee < 15) {
      setRfiStaticRewardsFee(rfiStaticRewardsFee + 1)
    } else if (event === "decrement" && rfiStaticRewardsFee > 0) {
      setRfiStaticRewardsFee(rfiStaticRewardsFee - 1)
    }
  }
  function calculateWhaleProtectionLimit() {
    if (
      !!cartState.step2.tokenSupplyNumber &&
      !!cartState.step2.tokenSupplyUnits
    ) {
      try {
        var value =
          0.005 *
          (parseFloat(cartState.step2.tokenSupplyNumber) *
            NumberMap[cartState.step2.tokenSupplyUnits])
        setWhaleProtectionLimit(value)
        setShowWhaleProtectionLimit(true)
      } catch (error) {
        setWhaleProtectionError(true)
        setShowWhaleProtectionLimit(false)
      }
    } else {
      setWhaleProtectionLimit(0.0)
      setWhaleProtectionError(true)
      setShowWhaleProtectionLimit(false)
    }
  }
  function handleAutomaticBurnFeeChange(event) {
    if (event === "increment" && automaticBurnFee < 15) {
      setAutomaticBurnFee(automaticBurnFee + 1)
    } else if (event === "decrement" && automaticBurnFee > 0) {
      setAutomaticBurnFee(automaticBurnFee - 1)
    }
  }
  function handleAutomaticCharityFeeChange(event) {
    if (event === "increment" && automaticCharityFee < 15) {
      setAutomaticCharityFee(automaticCharityFee + 1)
    } else if (event === "decrement" && automaticCharityFee > 0) {
      setAutomaticCharityFee(automaticCharityFee - 1)
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
    setAutomaticCharityFee(0)
    setAutomaticCharityAddress("")
  }

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

  React.useEffect(() => {
    cartDispatch({
      step: 3.2,
      payload: {
        step3: {
          auto_liquidation: cartState.step3.auto_liquidation,
          rfi_rewards: rfiStaticRewardsFee,
          WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
          auto_burn: cartState.step3.auto_burn,
          auto_charity: cartState.step3.auto_charity,
          charity_address: cartState.step3.charity_address,
          totalFees: cartState.step3.totalFees,
        },
      },
    })
  }, [rfiStaticRewardsFee])

  React.useEffect(() => {
    if (showWhaleProtectionLimit) {
      cartDispatch({
        step: 3.3,
        payload: {
          step3: {
            auto_liquidation: cartState.step3.auto_liquidation,
            rfi_rewards: cartState.step3.rfi_rewards,
            WHALE_PROTECTION: whaleProtectionLimit,
            auto_burn: cartState.step3.auto_burn,
            auto_charity: cartState.step3.auto_charity,
            charity_address: cartState.step3.charity_address,
            totalFees: cartState.step3.totalFees,
          },
        },
      })
    } else {
      cartDispatch({
        step: 3.3,
        payload: {
          step3: {
            auto_liquidation: cartState.step3.auto_liquidation,
            rfi_rewards: cartState.step3.rfi_rewards,
            WHALE_PROTECTION: 0.0,
            auto_burn: cartState.step3.auto_burn,
            auto_charity: cartState.step3.auto_charity,
            charity_address: cartState.step3.charity_address,
            totalFees: cartState.step3.totalFees,
          },
        },
      })
    }
  }, [showWhaleProtectionLimit])

  React.useEffect(() => {
    cartDispatch({
      step: 3.4,
      payload: {
        step3: {
          auto_liquidation: cartState.step3.auto_liquidation,
          rfi_rewards: cartState.step3.rfi_rewards,
          WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
          auto_burn: automaticBurnFee,
          auto_charity: cartState.step3.auto_charity,
          charity_address: cartState.step3.charity_address,
          totalFees: cartState.step3.totalFees,
        },
      },
    })
  }, [automaticBurnFee])

  React.useEffect(() => {
    cartDispatch({
      step: 3.5,
      payload: {
        step3: {
          auto_liquidation: cartState.step3.auto_liquidation,
          rfi_rewards: cartState.step3.rfi_rewards,
          WHALE_PROTECTION: cartState.step3.WHALE_PROTECTION,
          auto_burn: cartState.step3.auto_burn,
          auto_charity: automaticCharityFee,
          charity_address: cartState.step3.charity_address,
          totalFees: cartState.step3.totalFees,
        },
      },
    })
  }, [automaticCharityFee])

  React.useEffect(() => {
    var charityAddress = automaticCharityAddress
    if (automaticCharityAddress === "") {
      charityAddress = process.env.GATSBY_DEAD_ADDRESS
    }
    cartDispatch({
      step: 3.6,
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
  }, [automaticCharityAddress])

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
                      <button class="button is-success is-light">
                        Automatically Added
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
                      <span className="helper-placeholder-success">
                        This feature is automatically added and requires no
                        further input from your end
                      </span>
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
                        The fee you charge is returned to the DEX Pool for a
                        continuous supply
                      </span>
                    </div>
                  </div>
                  <div className="columns" style={{ margin: "1rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleLiquidityFeeChange("decrement")
                            }
                          >
                            <BsDash />
                          </button>
                        </div>
                        <div className="column">
                          <span className="is-size-4">
                            {liquidityFee + ` %`}
                          </span>
                        </div>
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleLiquidityFeeChange("increment")
                            }
                          >
                            <BsPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ margin: "0.5rem" }}>
                    <div className="column">
                      {!!liquidityFee && liquidityFee !== 0 ? (
                        <span className="helper-placeholder-success">
                          Fee added successfully. You can proceed to next step
                          or add more features
                        </span>
                      ) : (
                        <span className="helper-placeholder-danger">
                          Please set this value to proceed. Values should be
                          between 1% and 15%
                        </span>
                      )}
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
                          <span>Save Feature</span>
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
                  <div className="columns" style={{ margin: "1rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleRFIStaticRewardsFeeChange("decrement")
                            }
                          >
                            <BsDash />
                          </button>
                        </div>
                        <div className="column">
                          <span className="is-size-4">
                            {rfiStaticRewardsFee + ` %`}
                          </span>
                        </div>
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleRFIStaticRewardsFeeChange("increment")
                            }
                          >
                            <BsPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ margin: "0.5rem" }}>
                    <div className="column">
                      {!!rfiStaticRewardsFee && rfiStaticRewardsFee !== 0 ? (
                        <span className="helper-placeholder-success">
                          Fee added successfully. You can proceed to next step
                          or add more features
                        </span>
                      ) : (
                        <span className="helper-placeholder-primary">
                          This field is optional. Values should be between 1%
                          and 15%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!rfiStaticRewardsFee ? (
                        <button
                          className="button theme-action-button-gradient-red"
                          type="button"
                          onClick={() => setRfiStaticRewardsFee(0)}
                        >
                          <span>Remove Feature</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
                        >
                          <span>Save Feature</span>
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
                !!showWhaleProtectionLimit ? "success" : ""
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
                  <div className="columns" style={{ margin: "1rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <button
                            className="button theme-action-button-gradient-blue"
                            onClick={() => calculateWhaleProtectionLimit()}
                          >
                            Calculate & Save
                          </button>
                        </div>
                        <div className="column">
                          <span className="is-size-6">
                            {showWhaleProtectionLimit
                              ? whaleProtectionLimit
                              : 0}{" "}
                            {` `} {cartState.step2.tokenSymbol}
                            {`s`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ margin: "0.5rem" }}>
                    <div className="column">
                      {whaleProtecError ? (
                        <span className="helper-placeholder-danger">
                          An error occurred with your total supply values. To
                          resolve either head to Step 2 or refresh the browser
                        </span>
                      ) : !!whaleProtectionLimit &&
                        whaleProtectionLimit !== 0 ? (
                        <span className="helper-placeholder-success">
                          Limit added successfully. You can proceed to next step
                          or add more features.
                        </span>
                      ) : (
                        <span className="helper-placeholder-primary">
                          This field is optional and auto calculated. Please
                          Click Calculate & Save to add.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!showWhaleProtectionLimit ? (
                        <button
                          className="button theme-action-button-gradient-red"
                          type="button"
                          onClick={() => setShowWhaleProtectionLimit(false)}
                        >
                          <span>Remove Feature</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
                        >
                          <span>Save Feature</span>
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
                  <div className="columns" style={{ margin: "1rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleAutomaticBurnFeeChange("decrement")
                            }
                          >
                            <BsDash />
                          </button>
                        </div>
                        <div className="column">
                          <span className="is-size-4">
                            {automaticBurnFee + ` %`}
                          </span>
                        </div>
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleAutomaticBurnFeeChange("increment")
                            }
                          >
                            <BsPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ margin: "0.5rem" }}>
                    <div className="column">
                      {!!automaticBurnFee && automaticBurnFee !== 0 ? (
                        <span className="helper-placeholder-success">
                          Fee added successfully. You can proceed to next step
                          or add more features
                        </span>
                      ) : (
                        <span className="helper-placeholder-primary">
                          This field is optional. Values should be between 1%
                          and 15%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      {!!automaticBurnFee ? (
                        <button
                          className="button theme-action-button-gradient-red"
                          type="button"
                          onClick={() => setAutomaticBurnFee(0)}
                        >
                          <span>Remove Feature</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
                        >
                          <span>Save Feature</span>
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
                  <div className="columns" style={{ margin: "1rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleAutomaticCharityFeeChange("decrement")
                            }
                          >
                            <BsDash />
                          </button>
                        </div>
                        <div className="column">
                          <span className="is-size-4">
                            {automaticCharityFee + ` %`}
                          </span>
                        </div>
                        <div className="column">
                          <button
                            className="button"
                            onClick={() =>
                              handleAutomaticCharityFeeChange("increment")
                            }
                          >
                            <BsPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ margin: "0.5rem" }}>
                    <div className="column">
                      {!!automaticCharityFee && automaticCharityFee !== 0 ? (
                        <span className="helper-placeholder-success">
                          Fee added successfully. Please provide the charity
                          address below if you haven't already.
                        </span>
                      ) : (
                        <span className="helper-placeholder-primary">
                          Values should be between 1% and 15%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column" style={{ padding: 0 }}>
                      <div className="centerinput">
                        <div
                          className={`input-block ${
                            !!automaticCharityAddress ? "success" : ""
                          }`}
                          style={{ marginBottom: 0 }}
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
                            Charity Wallet Address, e.g. 0x3fw434.....09sdf
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" style={{ margin: "0.5rem" }}>
                    <div className="column">
                      <div className="note is-small">
                        <span>
                          {`Please make sure that you have the correct network's wallet address. You are currently connected to ${network.toUpperCase()} network`}
                        </span>
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
                          <span>Remove Feature</span>
                          <span class="icon is-size-3">
                            <BsX />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button theme-action-button-gradient-green has-tooltip-bottom"
                          type="button"
                        >
                          <span>Save Feature</span>
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
    </>
  )
}

const SummaryStep = ({ image, image2, setStep, step }) => {
  const cartState = useCartState()
  const fotImage = useImageForData("fot.png")
  const [coinSelected, setCoinSelected] = React.useState(
    cartState.step1.selectedToken
  )
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
              alt="step 4 image"
            />
          </div>
          <div className="column">
            <div className="columns">
              <div className="column">
                <span className="is-size-2">Almost There</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-5">
                  You are at the last stage. Check your coin summary and Ready
                  to Deploy
                </span>
              </div>
            </div>
          </div>
          {/* <div className="column" style={{ textAlign: "end" }}>
            <button
              className="button theme-action-button-gradient-green padded"
              type="button"
            >
              <span>Help Me</span>
              <span class="icon is-size-3">
                <BsQuestionCircle />
              </span>
            </button>
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column centered-text-align">
            <CartContent isSmall={true} />
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="columns">
          <div className="column centered-text-align">
            <NextAndPreviousStep
              prevStepDisabled={false}
              nextStepDisabled={true}
              prevStepToolTip={null}
              nextStepToolTip="This is the last step"
              setStep={setStep}
              step={step}
            />
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

const Step1Help = ({ isActive, setIsHelpOpen }) => {
  function closeModal() {
    setIsHelpOpen(false)
  }

  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content wallet-choice-board">
          {/* CONTENT HERE */}
          <div className="container">
            <div className="columns">
              <div className="column">
                <span className="is-size-1">Select your Coin Type</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-4">
                  Here you can choose between{" "}
                  <span className="orange-text">Governance Coin</span> or{" "}
                  <span className="orange-text">Fee On Transfer Coin</span>
                </span>
              </div>
            </div>
            <div
              className="columns is-mobile"
              style={{ alignItems: "flex-start" }}
            >
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <span className="is-size-2">Governance Coins</span>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <span className="is-size-6">
                      These are special coins. Governance coins are
                      cryptocurrencies that give voting power on a blockchain
                      project. They allow projects to distribute powers and
                      rights to users (to their coin holders). With this coin
                      you can give more control of your customer's needs to your
                      customers.
                    </span>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <span className="is-size-2">Fee on Transfer Coins</span>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <span className="is-size-6">
                      We prefer to call them as fancy coins. They are also
                      termed as Meme coins in the blockchain industry. With this
                      coin you can provide everything that a Governance coin
                      provides but an added advantage of debitting certain fee
                      if your customer decides to trade the coin. You can decide
                      what to do with the fees by selecting some features on
                      Step 3. For e.g., you can reward all your holders with the
                      fee charged or give that fee to charity to support for a
                      noble cause.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-close-custom">
            <button
              className="button close-modal-button"
              aria-label="close"
              onClick={closeModal}
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

const Step2Help = ({ isActive, setIsHelpOpen }) => {
  function closeModal() {
    setIsHelpOpen(false)
  }
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content wallet-choice-board">
          <div className="container">
            <div className="columns">
              <div className="column">
                <span className="is-size-1">Provide your coin Details</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <p>
                  <span className="is-size-6">
                    Here you need to provide with essential details about your
                    coin like Coin Name, Coin Symbol (e.g., ETH), Coin Supply.
                  </span>
                </p>
                <p>
                  <div className="note">
                    <span className="is-size-6">
                      The coin supply also known as token supply. For now token
                      supply is fixed. We will soon be launching mintable tokens
                      (where the token supply is unlimited) as well. If you are
                      confused, then simply start with 1 Million.
                    </span>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="modal-close-custom">
            <button
              className="button close-modal-button"
              aria-label="close"
              onClick={closeModal}
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

const Step3Help = ({ isActive, setIsHelpOpen }) => {
  const cartState = useCartState()

  function closeModal() {
    setIsHelpOpen(false)
  }
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content wallet-choice-board">
          {cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE ? (
            <Step3GovHelpContent />
          ) : (
            <Step3FotHelpContent />
          )}

          <div className="modal-close-custom">
            <button
              className="button close-modal-button"
              aria-label="close"
              onClick={closeModal}
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

const Step3GovHelpContent = () => {
  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column">
            <span className="is-size-1">
              Select features for your Governance Coin Type
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-6">
              <p>
                Select if you need a Decentralized Exchange Pool for your coin.
                Here you can allow your customers to easily swap and exchange
                ETH (on Ethereum) or BNB (on Binance Smart Chain) for your coin
                very easily.
              </p>
              <p>
                If you are connected to Ethereum then this pool will be created
                on Uniswap else it will be created on Pancake swap. Watch out
                for your pool's address on checkout. If you miss it no worries
                you can always find it in your Dashboard
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

const Step3FotHelpContent = () => {
  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column">
            <span className="is-size-1">
              Select features for your Fee On Transfer Coin Type
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-4">
              Here you can choose between a few features, they are individually
              explained below:
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-5 orange-text">
              Decentralized Exchange Pool
            </span>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-1">
            <HiArrowNarrowRight />
          </div>
          <div className="column">
            <p>
              A Decentralized Exchange Pool for your coin. Here you can allow
              your customers to easily swap and exchange ETH (on Ethereum) or
              BNB (on Binance Smart Chain) for your coin very easily.
            </p>
            <p>
              If you are connected to Ethereum then this pool will be created on
              Uniswap else it will be created on Pancake swap. Watch out for
              your pool's address on checkout. If you miss it no worries you can
              always find it in your Dashboard
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-5 orange-text">Automatic Liquidation</span>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-1">
            <HiArrowNarrowRight />
          </div>
          <div className="column">
            Fee charged per transaction is deposited back to the DEX pool
            created. This ensures a stable liquidity supply to the market
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-5 orange-text">RFI Static Rewards</span>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-1">
            <HiArrowNarrowRight />
          </div>
          <div className="column">
            Fee charged per transaction is divided and rewarded back to the
            holders. The holders coin quantity will increase if anyone within
            your community buys or sells your coin.
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-5 orange-text">Automatic Burn</span>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-1">
            <HiArrowNarrowRight />
          </div>
          <div className="column">
            Fee charged per transaction is completely burned. Transfered to the
            'DEAD' burn address. Destruction of coins increases your coin's
            value with demand.
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-5 orange-text">Whale Protection</span>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-1">
            <HiArrowNarrowRight />
          </div>
          <div className="column">
            If this feature is selected, a hard limit of 0.5% of the total
            supply is imposed on any transaction that can be performed for the
            coin. This makes sure that whales do not manipulate the market.
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-5 orange-text">
              Automatic Charity Donation
            </span>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-1">
            <HiArrowNarrowRight />
          </div>
          <div className="column">
            Fee charged per transaction is donated to charity. The wallet
            address for the charity is also needed.
          </div>
        </div>
      </div>
    </>
  )
}
export default Steps
