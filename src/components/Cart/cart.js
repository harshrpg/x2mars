import * as React from "react"
import { useAuthState, useCartDispatch, useCartState } from "../../context"
import {
  Error,
  NetworkConstants,
  NetworkFromChainId,
  NumberMap,
  TokenTypeIds,
  TokenTypes,
  TransactionNetworkNames,
} from "../../util/Constants"
import { GoX } from "@react-icons/all-files/go/GoX"
import "./style/style.scss"
import { GatsbyImage } from "gatsby-plugin-image"
import { useImageForData } from "../../hooks/useAllImages"
import { Steps } from "../../util/factory-steps"
import { useNetwork } from "../../hooks/useNetwork"
import { NetworkIcon } from "../Icons/icons"
import ErrorBox from "../Error/errorbox"
import { BigNumber, ethers } from "ethers"
import { useWeb3React, Web3ReactProvider } from "@web3-react/core"
import { injectedConnector } from "../../context/helpers"
import { AiOutlineCodeSandbox } from "@react-icons/all-files/ai/AiOutlineCodeSandbox"
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark"
import { animated, useSpring } from "@react-spring/web"
import StandardTokenFactory from "../../abis/StandardTokenFactory.json"
import StandardToken from "../../abis/StandardToken.json"
import FotTokenFactory from "../../abis/FotTokenFactory.json"
import FotToken from "../../abis/FotToken.json"
import { navigate } from "gatsby-link"

export const CartWindow = ({ setCartDisplay, isActive }) => {
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div class="modal-background"></div>
        <div class="modal-content cart-summary-board">
          <CartContent />
          <div className="modal-close-custom">
            <button
              className="button close-modal-button"
              aria-label="close"
              onClick={() => setCartDisplay(false)}
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

export const CartContent = () => {
  return (
    <div className="container has-text-centered">
      <div className="columns">
        <div className="column is-full">
          <span className="is-size-3-desktop is-size-5-mobile">
            Your Contract Summary
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TokenType />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DexSelected />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <FeaturesSelected />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TotalFees />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DeployButton />
        </div>
      </div>
    </div>
  )
}

const TokenType = () => {
  const user = useAuthState()
  const cartState = useCartState()
  // const network = useNetwork()

  const gTokenImage = useImageForData(Steps.Step1.cardData[0].img)
  const fotTokenImage = useImageForData(Steps.Step1.cardData[1].img)

  const [tokenImage, setTokenImage] = React.useState(gTokenImage)
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )

  // EFFECTS
  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])

  React.useEffect(() => {
    if (cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE) {
      setTokenImage(gTokenImage)
    } else if (cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER) {
      setTokenImage(fotTokenImage)
    }
  }, [cartState])
  return (
    <>
      <div className="cart-summary-container">
        <span className="summary-pill">Token Type</span>
        {cartState.step1.selectedToken !== -1 && !!network ? (
          <div className="columns">
            <div className="column">
              <GatsbyImage
                image={tokenImage}
                width={2}
                height={2}
                className="cart-image"
              />
            </div>
            <div className="column">
              {TokenTypes[cartState.step1.selectedToken]}
            </div>
            <div className="column">
              {cartState.step1.totalFees + ` ` + network.toUpperCase()}
            </div>
          </div>
        ) : (
          <ErrorBox error={Error.SELECT_TOKEN} />
        )}
      </div>
    </>
  )
}

const DexSelected = () => {
  const user = useAuthState()
  const cartState = useCartState()
  // const network = useNetwork()
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )

  const [dexImage, setDexImage] = React.useState(
    Steps.Step2.cardData[2].img[
      NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
    ]
  )

  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])

  React.useEffect(() => {
    setDexImage(Steps.Step2.cardData[2].img[network])
  }, [cartState, network])

  var image = useImageForData(dexImage)

  return (
    <>
      {cartState.step2.dexSelected ? (
        <div className="cart-summary-container">
          <span className="summary-pill">Pool Selection</span>
          <div className="columns">
            <div className="column">
              <GatsbyImage
                image={image}
                width={2}
                height={2}
                className="cart-image"
              />
            </div>
            <div className="column">Creating Dex Pool</div>
            <div className="column">
              {cartState.step2.totalFees + ` ` + network.toUpperCase()}
            </div>
          </div>
        </div>
      ) : (
        ``
      )}
    </>
  )
}

const FeaturesSelected = () => {
  const user = useAuthState()
  const cartState = useCartState()
  // const network = useNetwork()
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )

  const [alImage, setAlImage] = React.useState()
  const [rfiImage, setRfiImage] = React.useState(Steps.Step3.cardData[1].img)
  const [awpImage, setAwpImage] = React.useState(Steps.Step3.cardData[2].img)
  const [abImage, setAbImage] = React.useState(Steps.Step3.cardData[3].img)
  const [acImage, setAcImage] = React.useState(Steps.Step3.cardData[4].img)
  // const autoLiquidationImage = useImageForData()

  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])
  React.useEffect(() => {
    setAlImage(Steps.Step3.cardData[0].img[network])
  }, [network])

  const image1 = useImageForData(alImage)
  const image2 = useImageForData(rfiImage)
  const image3 = useImageForData(awpImage)
  const image4 = useImageForData(abImage)
  const image5 = useImageForData(acImage)
  return (
    <>
      {cartState.step1.selectedToken === 1 &&
      !!network &&
      (!!cartState.step3.auto_liquidation ||
        !!cartState.step3.rfi_rewards ||
        !!cartState.step3.WHALE_PROTECTION ||
        !!cartState.step3.auto_burn ||
        !!cartState.step3.auto_charity) ? (
        <div className="cart-summary-container has-text-centered">
          <span className="summary-pill">Features Selection</span>
          {!!cartState.step3.auto_liquidation ? (
            <div className="columns">
              <div className="column">
                <GatsbyImage
                  image={image1}
                  width={2}
                  height={2}
                  className="cart-image"
                />
              </div>
              <div className="column">Automatic Liquidation</div>
              <div className="column">0 {network.toUpperCase()}</div>
            </div>
          ) : (
            ``
          )}
          {!!cartState.step3.rfi_rewards ? (
            <div className="columns">
              <div className="column">
                <GatsbyImage
                  image={image2}
                  width={2}
                  height={2}
                  className="cart-image"
                />
              </div>
              <div className="column">RFI Static Rewards</div>
              <div className="column">
                {Steps.Step3.cardData[1].price[network] +
                  ` ` +
                  network.toUpperCase()}
              </div>
            </div>
          ) : (
            ``
          )}
          {!!cartState.step3.WHALE_PROTECTION ? (
            <div className="columns">
              <div className="column">
                <GatsbyImage
                  image={image3}
                  width={2}
                  height={2}
                  className="cart-image"
                />
              </div>
              <div className="column">Whale Protection</div>
              <div className="column">
                {Steps.Step3.cardData[2].price[network] +
                  ` ` +
                  network.toUpperCase()}
              </div>
            </div>
          ) : (
            ``
          )}
          {!!cartState.step3.auto_burn ? (
            <div className="columns">
              <div className="column">
                <GatsbyImage
                  image={image4}
                  width={2}
                  height={2}
                  className="cart-image"
                />
              </div>
              <div className="column">Automatic Burning</div>
              <div className="column">
                {Steps.Step3.cardData[3].price[network] +
                  ` ` +
                  network.toUpperCase()}
              </div>
            </div>
          ) : (
            ``
          )}
          {!!cartState.step3.auto_charity ? (
            <div className="columns">
              <div className="column">
                <GatsbyImage
                  image={image5}
                  width={2}
                  height={2}
                  className="cart-image"
                />
              </div>
              <div className="column">Automatic Charity</div>
              <div className="column">
                {Steps.Step3.cardData[4].price[network] +
                  ` ` +
                  network.toUpperCase()}
              </div>
            </div>
          ) : (
            ``
          )}
        </div>
      ) : (
        ``
      )}
    </>
  )
}

const TotalFees = () => {
  const user = useAuthState()
  const cartState = useCartState()
  const cartDispatcher = useCartDispatch()
  const [totalChargeableFees, setTotalChargeableFees] = React.useState(0.0)
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )

  // EFFECTS
  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])
  React.useEffect(() => {
    let totalFees = 0.0
    if (!!cartState.step1.totalFees) {
      totalFees += parseFloat(cartState.step1.totalFees)
    }
    if (!!cartState.step2.totalFees) {
      totalFees += parseFloat(cartState.step2.totalFees)
    }
    if (
      !!cartState.step1.selectedToken &&
      cartState.step1.selectedToken !== 0
    ) {
      if (!!cartState.step3.auto_liquidation) {
        totalFees += 0.0
      }
      if (!!cartState.step3.rfi_rewards) {
        totalFees += parseFloat(Steps.Step3.cardData[1].price[network])
      }
      if (!!cartState.step3.WHALE_PROTECTION) {
        totalFees += parseFloat(Steps.Step3.cardData[2].price[network])
      }
      if (!!cartState.step3.auto_burn) {
        totalFees += parseFloat(Steps.Step3.cardData[3].price[network])
      }
      if (!!cartState.step3.auto_charity) {
        totalFees += parseFloat(Steps.Step3.cardData[4].price[network])
      }
    }

    setTotalChargeableFees(totalFees)
  }, [cartState])

  React.useEffect(() => {
    if (totalChargeableFees !== 0.0) {
      cartDispatcher({
        step: 4,
        payload: {
          totalCharge: {
            fee: totalChargeableFees,
          },
        },
      })
    }
  }, [totalChargeableFees])
  var image = useImageForData("sum.png")

  return (
    <div className="cart-summary-container">
      <span className="summary-pill">Order Total</span>
      <div className="columns">
        <div className="column">
          <GatsbyImage
            image={image}
            width={2}
            height={2}
            className="cart-image"
          />
        </div>
        <div className="column">Your Total</div>
        <div className="column">
          {parseFloat(totalChargeableFees).toFixed(4) +
            ` ` +
            network.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

const DeployButton = () => {
  const { account, library, chainId, error } = useWeb3React()
  var providers = ethers.providers
  var network = ethers.providers.getNetwork(TransactionNetworkNames[chainId])
  var web3Provider = new providers.Web3Provider(library.provider, network)
  const cartState = useCartState()
  console.log("ERROR: ", account)
  const [contractDeployable, setContractDeployable] = React.useState(false)
  const [paymentCompleted, setPaymentCompleted] = React.useState(false)
  const [coinBuilt, setCoinBuilt] = React.useState(false)
  const [
    chargeFeeAndDeployContract,
    setChargeFeeAndDeployContract,
  ] = React.useState(false)

  const [txnHash, setTxnHash] = React.useState(null)
  const [tokenAddress, setTokenAddress] = React.useState(null)
  const [pairAddress, setPairAddress] = React.useState(null)
  const [fotFees, setFotFees] = React.useState([0.0, 0.0, 0.0, 0.0])
  const [initiateFee, setInitiateFee] = React.useState(false)
  const [txnError, setTxnError] = React.useState(false)
  const [dashboardAvailable, setDashboardAvailable] = React.useState(false)

  const factoryAddress = "0xde6b7e39d74d7cc9432F2a2C5156e000611BB12D"
  const fotFactoryAddress = "0x27C8977DB053D54Dc0768C2D94C6A8A0D48E5Df0"
  // const stdTokenAddress = "0xF5267A3eD1Da2Eea6283a2a0c3e091659a6e3c89"
  const factoryContract = new ethers.Contract(
    factoryAddress,
    StandardTokenFactory.abi,
    library
  )
  const fotFactoryContract = new ethers.Contract(
    fotFactoryAddress,
    FotTokenFactory.abi,
    library
  )
  const factoryWithSigner = factoryContract.connect(library.getSigner(account))
  const fotFactoryWithSigner = fotFactoryContract.connect(
    library.getSigner(account)
  )

  React.useEffect(() => {
    if (cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE) {
      if (
        !!cartState.step2.tokenName &&
        !!cartState.step2.tokenSymbol &&
        !!cartState.step2.tokenSupplyNumber &&
        cartState.step2.tokenSupplyUnits !== "Units"
      ) {
        setContractDeployable(true)
      } else {
        setContractDeployable(false)
      }
    } else if (cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER) {
      if (
        !!cartState.step2.tokenName &&
        !!cartState.step2.tokenSymbol &&
        !!cartState.step2.tokenSupplyNumber &&
        cartState.step2.tokenSupplyUnits !== "Units" &&
        !!cartState.step3.auto_liquidation
      ) {
        setContractDeployable(true)
      } else {
        setContractDeployable(false)
      }
    }
  }, [cartState])

  React.useEffect(() => {
    if (!!txnHash) {
      getTxnReceipt()
    }
  }, [txnHash])

  React.useEffect(() => {
    if (chargeFeeAndDeployContract) {
      chargeFeeAndGetTransactionDetails()
    }
  }, [chargeFeeAndDeployContract, library, account, cartState])

  React.useEffect(() => {
    if (paymentCompleted) {
      if (cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE) {
        makeStandardCoin()
      } else if (
        cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER
      ) {
        makeFeeOnTransferCoin()
      }
    }
  }, [paymentCompleted])

  React.useEffect(() => {
    if (!!tokenAddress) {
      if (
        cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE &&
        cartState.step2.dexSelected
      ) {
        getPairAddress()
      } else if (
        cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER
      ) {
        getPairAddress()
      }
    }
  }, [tokenAddress])

  React.useEffect(() => {
    if (
      contractDeployable &&
      cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER
    ) {
      var newArray = Array.from(fotFees)
      if (!!cartState.step3.auto_liquidation) {
        newArray[0] = parseInt(cartState.step3.auto_liquidation)
      }
      if (!!cartState.step3.rfi_rewards) {
        newArray[1] = parseInt(cartState.step3.rfi_rewards)
      }
      if (!!cartState.step3.auto_burn) {
        newArray[2] = parseInt(cartState.step3.auto_burn)
      }
      if (!!cartState.step3.auto_charity) {
        newArray[3] = parseInt(cartState.step3.auto_charity)
      }
      setFotFees(newArray)
    }
  }, [contractDeployable, cartState])

  // React.useEffect(() => {
  //   if (cartState.step1.tokenSelected === TokenTypeIds.FEE_ON_TRANSFER && coinBuilt && !!pairAddress) {
  //     if (!fotFees.every(item => item === 0.0)) {
  //       setInitiateFee(true)
  //       initiateFeeSetter()
  //     }
  //   }
  // }, [pairAddress, cartState, coinBuilt])

  React.useEffect(() => {
    if (coinBuilt) {
      if (cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE) {
        setDashboardAvailable(true)
      } else if (cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER) {
        if (!fotFees.every(item => item === 0.0)) {
          if (!initiateFee) {
            setDashboardAvailable(true)
          }
        } else {
          setDashboardAvailable(true)
        }
      }
    }
  }, [coinBuilt, cartState, initiateFee])

  async function getTxnReceipt() {
    var result = null
    try {
      while (result === null) {
        result = await web3Provider.getTransactionReceipt(txnHash)
        
        console.log(result)
      }
    } catch (error) {
      console.log("ERROR 1: ", error)
    }
    if (result !== null && result.status === 1) {
      setPaymentCompleted(true)
    }
  }

  async function chargeFeeAndGetTransactionDetails() {
    const txn = {
      from: account,
      to: "0xe31f4CB714260274Df74dbF1ae1Ca28e7aa746F7",
      value: ethers.utils
        .parseEther(cartState.totalCharge.fee.toString())
        .toHexString(),
    }
    try {
      const txnResponse = await library.getSigner(account).sendTransaction(txn)
      console.log("Transaction Response", txnResponse)
      setTxnHash(txnResponse.hash)
    } catch (error) {
      console.error(error)
    }
  }

  async function makeStandardCoin() {
    console.log("Making the coin now")
    // const feeData = await web3Provider.getFeeData()
    // const feeDataGasPrice = ethers.utils.formatUnits(feeData.gasPrice, "wei")
    // const feeDataGasLimit = ethers.utils.formatUnits(
    //   feeData.maxFeePerGas,
    //   "wei"
    // )
    // console.log(feeDataGasPrice)
    // console.log(feeDataGasLimit)
    const tx = await factoryWithSigner.createStandardToken(
      cartState.step2.tokenName,
      cartState.step2.tokenSymbol,
      parseFloat(cartState.step2.tokenSupplyNumber) *
        NumberMap[cartState.step2.tokenSupplyUnits],
      cartState.step2.dexSelected,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    )
    await tx.wait()
    console.log("STD Token tx", tx)
    // setChargeFeeAndDeployContract(false)
  }

  async function makeFeeOnTransferCoin() {
    const tx = await fotFactoryWithSigner.createToken(
      cartState.step2.tokenName,
      cartState.step2.tokenSymbol,
      parseFloat(cartState.step2.tokenSupplyNumber) *
        NumberMap[cartState.step2.tokenSupplyUnits],
      cartState.step2.tokenDecimals,
      6,
      0.0005 *
        parseFloat(cartState.step2.tokenSupplyNumber) *
        NumberMap[cartState.step2.tokenSupplyUnits],
      !!cartState.step3.WHALE_PROTECTION
        ? cartState.step3.WHALE_PROTECTION
        : 0.0,
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    )
    await tx.wait()
    console.log("FOT Token tx", tx)
  }

  factoryContract.on("TokenCreated", (owner, contractAddress) => {
    console.log("New Token Address", owner)
    // console.log("New Token Address", address)
    console.log("New Token Address", contractAddress)
    setTokenAddress(contractAddress)
    setCoinBuilt(true)
  })

  fotFactoryContract.on("TokenCreated", (owner, contractAddress) => {
    setTokenAddress(contractAddress)
    setCoinBuilt(true)
  })

  async function getPairAddress() {
    var pairAddress = null
    if (cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE) {
      const standardToken = new ethers.Contract(
        tokenAddress,
        StandardToken.abi,
        library
      )
      await standardToken.deployTransaction.wait()

      try {
        const standardTokenWithSigner = standardToken.connect(
          library.getSigner()
        )
        pairAddress = await standardTokenWithSigner.pairAddress()
      } catch (error) {
        console.log("PAIR ADDRESS: ",error)
      }
      console.log("PAIR ADDRESS: ", pairAddress)
    } else if (cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER) {
      const fotToken = new ethers.Contract(tokenAddress, FotToken.abi, library)

      try {
        const fotTokenWithSigner = fotToken.connect(library.getSigner())
        pairAddress = await fotTokenWithSigner.pairAddress()
        if (!fotFees.every(item => item === 0.0)) {
          setInitiateFee(true)
          initiateFeeSetter(fotTokenWithSigner)
        }
      } catch (error) {
        console.log("PAIR ADDRESS: ",error)
      }
    }
    setPairAddress(pairAddress)
  }

  async function initiateFeeSetter(fotTokenWithSigner) {
    const txn = await fotTokenWithSigner.setFees(fotFees)
    console.log("Set Fee logs: ", txn)
    var result = null
    await txn.wait()
    setInitiateFee(false)
  }

  return (
    <>
      <button
        className={`button deploy-contract-button ${
          contractDeployable ? "" : "inactive"
        }`}
        type="button"
        disabled={!contractDeployable}
        onClick={() => setChargeFeeAndDeployContract(true)}
      >
        Pay and Make Coin
      </button>
      <LoadingPaymentModal
        isActive={chargeFeeAndDeployContract}
        paymentCompleted={paymentCompleted}
        coinBuilt={coinBuilt}
        setChargeFeeAndDeployContract={setChargeFeeAndDeployContract}
        txnHash={txnHash}
        tokenAddress={tokenAddress}
        pairAddress={pairAddress}
        initiateFee={initiateFee}
        dashboardAvailable={dashboardAvailable}
      />
    </>
  )
}

const DashboardButton = ({ dashboardAvailable }) => {
  return (
    <button
      className={`button deploy-contract-button ${
        dashboardAvailable ? "" : "inactive"
      }`}
      type="button"
      disabled={!dashboardAvailable}
      onClick={() => navigate("/dashboard/")}
    >
      Go To Dashboard
    </button>
  )
}

const LoadingPaymentModal = ({
  isActive,
  paymentCompleted,
  coinBuilt,
  setChargeFeeAndDeployContract,
  txnHash,
  tokenAddress,
  pairAddress,
  initiateFee,
  dashboardAvailable,
}) => {
  function closeModal() {
    setChargeFeeAndDeployContract(false)
  }
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content wallet-choice-board">
        <ModalContent
          paymentCompleted={paymentCompleted}
          coinBuilt={coinBuilt}
          txnHash={txnHash}
          tokenAddress={tokenAddress}
          pairAddress={pairAddress}
          initiateFee={initiateFee}
          dashboardAvailable={dashboardAvailable}
        />
        {/* <div className="modal-close-custom">
          <button
            className="button close-modal-button"
            aria-label="close"
            onClick={closeModal}
          >
            <span className="icon is-large">
              <GoX />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  )
}
const PaymentProcessingTexts = [
  "Processing Payments",
  "Getting Workers together",
  "You should see your summary soon",
  "Follow instructions on wallet",
]

const ModalContent = ({
  paymentCompleted,
  coinBuilt,
  txnHash,
  tokenAddress,
  pairAddress,
  initiateFee,
  dashboardAvailable,
}) => {
  const styles = useSpring({
    loop: true,
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    delay: 300,
  })

  // React.useEffect(() => {

  // })
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <span className="is-size-5" id="warning-payments">
            Do Not Refresh or Close this window
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-3">Your Transaction is Processing</span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">
            Please follow instructions on your wallet
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-7">
            <div className="columns">
              <div className="column">
                <span className="is-size-4">Payment</span>
              </div>

              {!paymentCompleted ? (
                <>
                  <div className="column">
                    <span className="is-size-3">
                      <AiOutlineCodeSandbox className="spinner" />
                    </span>
                  </div>
                  <div className="column">
                    <span className="is-size-5">
                      <animated.div style={styles}>Pending</animated.div>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="column">
                    <span className="is-size-3">
                      <FcCheckmark />
                    </span>
                  </div>
                  <div className="column">
                    <span className="is-size-5">Completed</span>
                  </div>
                </>
              )}
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-7">Payment Transaction Hash</span>
              </div>
              <div className="column">
                <span className="is-size-6" id="txnHash">
                  {txnHash}
                </span>
              </div>
            </div>
            {paymentCompleted ? (
              <div className="columns">
                <div className="column">
                  <span className="is-size-4">Making Coin</span>
                </div>

                {!coinBuilt ? (
                  <>
                    <div className="column">
                      <span className="is-size-3">
                        <AiOutlineCodeSandbox className="spinner" />
                      </span>
                    </div>
                    <div className="column">
                      <span className="is-size-5">
                        <animated.div style={styles}>Pending</animated.div>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="column">
                      <span className="is-size-3">
                        <FcCheckmark />
                      </span>
                    </div>
                    <div className="column">
                      <span className="is-size-5">Completed</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              ``
            )}
            <div className="columns">
              <div className="column">
                <span className="is-size-7">Your Coin Address</span>
              </div>
              <div className="column">
                <span className="is-size-6" id="txnHash">
                  {tokenAddress}
                </span>
              </div>
            </div>
            {!!pairAddress ? (
              <div className="columns">
                <div className="column">
                  <span className="is-size-7">Your Dex Pool Address</span>
                </div>
                <div className="column">
                  <span className="is-size-6" id="txnHash">
                    {pairAddress}
                  </span>
                </div>
              </div>
            ) : (
              ``
            )}
          </span>
        </div>
      </div>
      {paymentCompleted && coinBuilt ? (
        <div className="columns">
          <div className="column">
            <span className="is-size-4">Setting Fee</span>
          </div>

          {initiateFee ? (
            <>
              <div className="column">
                <span className="is-size-3">
                  <AiOutlineCodeSandbox className="spinner" />
                </span>
              </div>
              <div className="column">
                <span className="is-size-5">
                  <animated.div style={styles}>Pending</animated.div>
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="column">
                <span className="is-size-3">
                  <FcCheckmark />
                </span>
              </div>
              <div className="column">
                <span className="is-size-5">Completed</span>
              </div>
            </>
          )}
        </div>
      ) : (
        ``
      )}

      <div className="columns">
        <div className="column">
          <span className="is-size-7" id="warning-payments">
            Please keep all the ADDRESSES & TRANSACTION HASH handy for future
            reference
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DashboardButton dashboardAvailable={dashboardAvailable} />
        </div>
      </div>
    </div>
  )
}
