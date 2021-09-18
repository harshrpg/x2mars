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
import { StepsModel } from "../../util/factory-steps"
import ErrorBox from "../Error/errorbox"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { AiOutlineCodeSandbox } from "@react-icons/all-files/ai/AiOutlineCodeSandbox"
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark"
import { animated, useSpring } from "@react-spring/web"
import TokenFactory from "../../abis/TokenFactory.json"
import StandardToken from "../../abis/StandardToken.json"
import FotToken from "../../abis/FotToken.json"
import { BsBoxArrowUpRight } from "@react-icons/all-files/bs/BsBoxArrowUpRight"
import { navigate } from "gatsby-link"
import { Link } from "gatsby"

export const CartWindow = ({ setCartDisplay, isActive }) => {
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div class="modal-background"></div>
        <div class="modal-content cart-summary-board">
          <div className="container">
            <CartContent />
          </div>

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

export const CartContent = ({ isSmall }) => {
  const { chainId } = useWeb3React()

  const [isTestNetwork, setIsTestNetwork] = React.useState(false)
  React.useEffect(() => {
    if (
      chainId === NetworkConstants.MAINNET_ETHEREUM ||
      chainId === NetworkConstants.SMART_CHAIN_MAINNET
    ) {
      setIsTestNetwork(false)
    } else {
      setIsTestNetwork(true)
    }
  }, [])
  return (
    <>
      <div className="columns">
        <div className="column is-full">
          <span className="is-size-3-desktop is-size-5-mobile">
            Your Contract Summary
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TokenType isSmall={isSmall} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DexSelected isSmall={isSmall} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <FeaturesSelected isTestNetwork={isTestNetwork} isSmall={isSmall} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TotalFees isTestNetwork={isTestNetwork} isSmall={isSmall} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DeployButton isSmall={isSmall} />
        </div>
      </div>
    </>
  )
}

const TokenType = ({ isSmall }) => {
  const user = useAuthState()
  const cartState = useCartState()
  // const network = useNetwork()

  const gTokenImage = useImageForData(StepsModel.Step1.cardData[0].img)
  const fotTokenImage = useImageForData(StepsModel.Step1.cardData[1].img)

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
      <div className={`cart-summary-container ${isSmall ? "small" : ""}`}>
        <span className="summary-pill">Token Type</span>
        {cartState.step1.selectedToken !== -1 && !!network ? (
          <>
            <div className="columns">
              <div className="column">
                <GatsbyImage image={tokenImage} className="cart-image" />
              </div>
              <div className="column">
                {TokenTypes[cartState.step1.selectedToken]}
              </div>
              <div className="column">
                {cartState.step1.totalFees + ` ` + network.toUpperCase()}
              </div>
            </div>
            <div className="columns">
              <div className="column">Name: {cartState.step2.tokenName}</div>
              <div className="column">
                Ticker: {cartState.step2.tokenSymbol}
              </div>
              <div className="column">
                Supply:{" "}
                {cartState.step2.tokenSupplyNumber +
                  ` ` +
                  cartState.step2.tokenSupplyUnits}
              </div>
            </div>
          </>
        ) : (
          <ErrorBox error={Error.SELECT_TOKEN} />
        )}
      </div>
    </>
  )
}

const DexSelected = ({ isSmall }) => {
  const user = useAuthState()
  const cartState = useCartState()
  // const network = useNetwork()
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )

  const [dexImage, setDexImage] = React.useState(
    StepsModel.Step2.cardData[2].img[
      NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
    ]
  )

  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])

  React.useEffect(() => {
    setDexImage(StepsModel.Step2.cardData[2].img[network])
  }, [cartState, network])

  var image = useImageForData(dexImage)

  return (
    <>
      {cartState.step2.dexSelected ? (
        <div className={`cart-summary-container ${isSmall ? "small" : ""}`}>
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

const FeaturesSelected = ({ isTestNetwork, isSmall }) => {
  const user = useAuthState()
  const cartState = useCartState()
  // const network = useNetwork()
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )

  const [alImage, setAlImage] = React.useState()
  const [rfiImage, setRfiImage] = React.useState(
    StepsModel.Step3.cardData[1].img
  )
  const [awpImage, setAwpImage] = React.useState(
    StepsModel.Step3.cardData[2].img
  )
  const [abImage, setAbImage] = React.useState(StepsModel.Step3.cardData[3].img)
  const [acImage, setAcImage] = React.useState(StepsModel.Step3.cardData[4].img)
  // const autoLiquidationImage = useImageForData()

  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])
  React.useEffect(() => {
    setAlImage(StepsModel.Step3.cardData[0].img[network])
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
        <div className={`cart-summary-container ${isSmall ? "small" : ""}`}>
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
                {isTestNetwork
                  ? `0`
                  : StepsModel.Step3.cardData[1].price[network]}{" "}
                {` ${network.toUpperCase()}`}
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
                {isTestNetwork
                  ? `0`
                  : StepsModel.Step3.cardData[2].price[network]}{" "}
                {` ${network.toUpperCase()}`}
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
                {isTestNetwork
                  ? `0`
                  : StepsModel.Step3.cardData[3].price[network]}{" "}
                {` ${network.toUpperCase()}`}
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
                {isTestNetwork
                  ? `0`
                  : StepsModel.Step3.cardData[4].price[network]}{" "}
                {` ${network.toUpperCase()}`}
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

const TotalFees = ({ isTestNetwork, isSmall }) => {
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
        if (isTestNetwork) {
          totalFees += 0.0
        } else {
          totalFees += parseFloat(StepsModel.Step3.cardData[1].price[network])
        }
      }
      if (!!cartState.step3.WHALE_PROTECTION) {
        if (isTestNetwork) {
          totalFees += 0.0
        } else {
          totalFees += parseFloat(StepsModel.Step3.cardData[2].price[network])
        }
      }
      if (!!cartState.step3.auto_burn) {
        if (isTestNetwork) {
          totalFees += 0.0
        } else {
          totalFees += parseFloat(StepsModel.Step3.cardData[3].price[network])
        }
      }
      if (!!cartState.step3.auto_charity) {
        if (isTestNetwork) {
          totalFees += 0.0
        } else {
          totalFees += parseFloat(StepsModel.Step3.cardData[4].price[network])
        }
      }
    }

    setTotalChargeableFees(totalFees)
  }, [cartState])

  React.useEffect(() => {
    if (isTestNetwork) {
      cartDispatcher({
        step: 4,
        payload: {
          totalCharge: {
            fee: 0.0,
          },
        },
      })
    } else {
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
    <div className={`cart-summary-container ${isSmall ? "small" : ""}`}>
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

const DeployButton = ({ isSmall }) => {
  const { account, library, chainId, error } = useWeb3React()
  var providers = ethers.providers
  var network = ethers.providers.getNetwork(TransactionNetworkNames[chainId])
  var web3Provider = new providers.Web3Provider(library.provider, network)
  const cartState = useCartState()
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
  const [txnError, setTxnError] = React.useState({
    type: null,
    errorBody: null,
  })
  const [dashboardAvailable, setDashboardAvailable] = React.useState(false)
  const [
    factoryContractWithSigner,
    setFactoryContractWithSigner,
  ] = React.useState(null)
  const [tokenFactory, setTokenFactory] = React.useState(
    process.env.GATSBY_TOKEN_FACTORY_ADDRS_RINKEBY
  )
  const [factoryContract, setFactoryContract] = React.useState(
    new ethers.Contract(
      process.env.GATSBY_TOKEN_FACTORY_ADDRS_RINKEBY,
      TokenFactory.abi,
      library
    )
  )
  const [dexAddress, setDexAddress] = React.useState(
    process.env.GATSBY_UNISWAP_ROUTER
  )
  const [showReviewModal, setShowReviewModal] = React.useState(false)

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
  }, [chargeFeeAndDeployContract])
  React.useEffect(() => {
    if (paymentCompleted && !!factoryContractWithSigner) {
      if (cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE) {
        makeStandardCoin()
      } else if (
        cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER
      ) {
        makeFeeOnTransferCoin()
      }
    }
  }, [paymentCompleted, factoryContractWithSigner])
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
        newArray[1] = parseInt(cartState.step3.auto_liquidation)
      }
      if (!!cartState.step3.rfi_rewards) {
        newArray[0] = parseInt(cartState.step3.rfi_rewards)
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

  React.useEffect(() => {
    if (coinBuilt) {
      setDashboardAvailable(true)
    }
  }, [coinBuilt])

  React.useEffect(() => {
    if (!!account) {
      const factoryWithSigner = factoryContract.connect(
        library.getSigner(account)
      )
      setFactoryContractWithSigner(factoryWithSigner)
    }
  }, [account, factoryContract])
  React.useEffect(() => {
    switch (chainId) {
      case NetworkConstants.GOERLI:
        setTokenFactory(process.env.GATSBY_TOKEN_FACTORY_ADDRS_GOERLI)
        setDexAddress(process.env.GATSBY_UNISWAP_ROUTER)
        break
      case NetworkConstants.ROPSTEN:
        setTokenFactory(process.env.GATSBY_TOKEN_FACTORY_ADDRS_ROPSTEN)
        setDexAddress(process.env.GATSBY_UNISWAP_ROUTER)
        break
      case NetworkConstants.SMART_CHAIN_TESTNET:
        setTokenFactory(process.env.GATSBY_TOKEN_FACTORY_ADDRS_ROPSTEN)
        setDexAddress(process.env.GATSBY_PANCAKE_SWAP_ROUTER_BNBT)
        break
      default:
        setTokenFactory(process.env.GATSBY_TOKEN_FACTORY_ADDRS_RINKEBY)
        setDexAddress(process.env.GATSBY_UNISWAP_ROUTER)
        break
    }
  }, [chainId])
  React.useEffect(() => {
    if (!!tokenFactory) {
      setFactoryContract(
        new ethers.Contract(tokenFactory, TokenFactory.abi, library)
      )
    } else {
      setFactoryContract(
        new ethers.Contract(
          process.env.GATSBY_TOKEN_FACTORY_ADDRS_RINKEBY,
          TokenFactory.abi,
          library
        )
      )
    }
  }, [tokenFactory])

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
      to: process.env.GATSBY_PAYMENT_WALLET,
      value: ethers.utils
        .parseEther(cartState.totalCharge.fee.toString())
        .toHexString(),
    }
    try {
      const txnResponse = await library.getSigner(account).sendTransaction(txn)
      console.log("Transaction Response", txnResponse)
      setTxnHash(txnResponse.hash)
    } catch (error) {
      console.log("Error Occurred: ", error)
      setTxnError({ type: error.code, errorBody: error })
      if (typeof error.code === "number") {
        if (error.code === 4001) {
          setTxnError({ type: "Payment Rejected", errorBody: error })
        } else if (error.code === 4100) {
          setTxnError({ type: "Unauthorized Request", errorBody: error })
        } else if (error.code === 4200) {
          setTxnError({ type: "Unsupported", errorBody: error })
        } else if (error.code === 4900) {
          setTxnError({ type: "RPC Disconnected", errorBody: error })
        } else if (error.code === 4901) {
          setTxnError({ type: "Network Disconnected", errorBody: error })
        }
      } else if (typeof error.code === "string") {
        setTxnError({ type: error.code, errorBody: error })
      } else {
        setTxnError({ type: "Unknown Error" + error.code, errorBody: error })
      }
    }
  }

  async function makeStandardCoin() {
    try {
      const tx = await factoryContractWithSigner.createStandardToken(
        cartState.step2.tokenName,
        cartState.step2.tokenSymbol,
        parseFloat(cartState.step2.tokenSupplyNumber) *
          NumberMap[cartState.step2.tokenSupplyUnits],
        cartState.step2.dexSelected,
        dexAddress
      )
      await tx.wait()
    } catch (error) {
      console.log("Error occured in creating token", error)
      if (typeof error.code === "number") {
        if (error.code === 4001) {
          setTxnError({ type: "Payment Rejected", errorBody: error })
        } else if (error.code === 4100) {
          setTxnError({ type: "Unauthorized Request", errorBody: error })
        } else if (error.code === 4200) {
          setTxnError({ type: "Unsupported", errorBody: error })
        } else if (error.code === 4900) {
          setTxnError({ type: "RPC Disconnected", errorBody: error })
        } else if (error.code === 4901) {
          setTxnError({ type: "Network Disconnected", errorBody: error })
        }
      } else if (typeof error.code === "string") {
        setTxnError({ type: error.code, errorBody: error })
      } else {
        setTxnError({ type: "Unknown Error" + error.code, errorBody: error })
      }
    }
  }

  async function makeFeeOnTransferCoin() {
    try {
      const tx = await factoryContractWithSigner.createToken(
        cartState.step2.tokenName,
        cartState.step2.tokenSymbol,
        parseFloat(cartState.step2.tokenSupplyNumber) *
          NumberMap[cartState.step2.tokenSupplyUnits],
        !!cartState.step3.WHALE_PROTECTION
          ? cartState.step3.WHALE_PROTECTION
          : 0.0,
        fotFees,
        !!cartState.step3.charity_address
          ? cartState.step3.charity_address
          : process.env.GATSBY_DEAD_ADDRESS,
        dexAddress
      )
      await tx.wait()
    } catch (error) {
      console.log("Error occured in creating token", error)
      if (typeof error.code === "number") {
        if (error.code === 4001) {
          setTxnError({ type: "Payment Rejected", errorBody: error })
        } else if (error.code === 4100) {
          setTxnError({ type: "Unauthorized Request", errorBody: error })
        } else if (error.code === 4200) {
          setTxnError({ type: "Unsupported", errorBody: error })
        } else if (error.code === 4900) {
          setTxnError({ type: "RPC Disconnected", errorBody: error })
        } else if (error.code === 4901) {
          setTxnError({ type: "Network Disconnected", errorBody: error })
        }
      } else if (typeof error.code === "string") {
        setTxnError({ type: error.code, errorBody: error })
      } else {
        setTxnError({ type: "Unknown Error" + error.code, errorBody: error })
      }
    }
  }

  factoryContract.on(
    "FotTokenCreated",
    (owner, name, symbol, basicSupply, tokenType, contractAddress) => {
      setTokenAddress(contractAddress)
      setCoinBuilt(true)
    }
  )

  factoryContract.on(
    "StdTokenCreated",
    (owner, name, symbol, basicSupply, tokenType, isPool, contractAddress) => {
      setTokenAddress(contractAddress)
      setCoinBuilt(true)
    }
  )

  async function getPairAddress() {
    var pairAddress = null
    if (
      cartState.step1.selectedToken === TokenTypeIds.GOVERNANCE &&
      !!tokenAddress
    ) {
      const standardToken = new ethers.Contract(
        tokenAddress,
        StandardToken.abi,
        library
      )

      try {
        const standardTokenWithSigner = standardToken.connect(
          library.getSigner()
        )
        pairAddress = await standardTokenWithSigner.pairAddress()
      } catch (error) {
        console.log("PAIR ADDRESS: ", error)
        setTxnError({ type: "Pair Creation Error", errorBody: error })
      }
      console.log("PAIR ADDRESS: ", pairAddress)
    } else if (cartState.step1.selectedToken === TokenTypeIds.FEE_ON_TRANSFER) {
      const fotToken = new ethers.Contract(tokenAddress, FotToken.abi, library)

      try {
        const fotTokenWithSigner = fotToken.connect(library.getSigner())
        pairAddress = await fotTokenWithSigner.pairAddress()
      } catch (error) {
        console.log("PAIR ADDRESS: ", error)
      }
    }
    setPairAddress(pairAddress)
  }

  function openPaymentProcessWindow() {
    setTxnError({ type: null, errorBody: null })
    setShowReviewModal(false)
    setPaymentCompleted(false)
    setCoinBuilt(false)
    setPairAddress(null)
    setTxnHash(null)
    setTokenAddress(null)
    setDashboardAvailable(false)
    setChargeFeeAndDeployContract(true)
  }

  function openReviewWindow() {
    setShowReviewModal(true)
  }

  return (
    <>
      <button
        className={`button deploy-contract-button ${
          contractDeployable ? "" : "inactive"
        } ${isSmall ? "small" : ""}`}
        type="button"
        disabled={!contractDeployable}
        onClick={openReviewWindow}
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
        dashboardAvailable={dashboardAvailable}
        txnError={txnError}
      />
      <ReviewModal
        isActive={showReviewModal}
        openPaymentProcessWindow={openPaymentProcessWindow}
        setShowReviewModal={setShowReviewModal}
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

const CloseModalButton = ({ setChargeFeeAndDeployContract }) => {
  return (
    <button
      className={`button deploy-contract-button`}
      type="button"
      onClick={() => setChargeFeeAndDeployContract(false)}
    >
      Close this window
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
  dashboardAvailable,
  txnError,
}) => {
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
          dashboardAvailable={dashboardAvailable}
          txnError={txnError}
          setChargeFeeAndDeployContract={setChargeFeeAndDeployContract}
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
const ModalContent = ({
  paymentCompleted,
  coinBuilt,
  txnHash,
  tokenAddress,
  pairAddress,
  dashboardAvailable,
  txnError,
  setChargeFeeAndDeployContract,
}) => {
  const styles = useSpring({
    loop: true,
    to: [{ opacity: 1 }],
    from: { opacity: 0 },
    delay: 300,
  })

  const cartState = useCartState()
  const { active, chainId } = useWeb3React()
  const [network, setNetwork] = React.useState()
  const [etherscanAddress, setEtherscanAddress] = React.useState(
    "https://etherscan.io/address/"
  )
  const [etherScanTx, setEtherScanTx] = React.useState(
    "https://etherscan.io/tx/"
  )

  const [dexAddress, setDexAddress] = React.useState(
    "https://info.uniswap.org/#/pools/"
  )

  React.useEffect(() => {
    if (active && !!chainId) {
      setNetwork(NetworkFromChainId[parseInt(chainId)])
    }
  }, [active, chainId])
  React.useEffect(() => {
    if (chainId === NetworkConstants.RINKEBY) {
      setEtherscanAddress("https://rinkeby.etherscan.io/address/")
      setEtherScanTx("https://rinkeby.etherscan.io/tx/")
    } else if (chainId === NetworkConstants.ROPSTEN) {
      setEtherscanAddress("https://ropsten.etherscan.io/address/")
      setEtherScanTx("https://ropsten.etherscan.io/tx/")
    } else if (chainId === NetworkConstants.KOVAN) {
      setEtherscanAddress("https://kovan.etherscan.io/address/")
      setEtherScanTx("https://kovan.etherscan.io/tx/")
    } else if (chainId === NetworkConstants.GOERLI) {
      setEtherscanAddress("https://goerli.etherscan.io/address/")
      setEtherScanTx("https://goerli.etherscan.io/tx/")
    } else if (chainId === NetworkConstants.SMART_CHAIN_MAINNET) {
      setEtherscanAddress("https://bscscan.com/address/")
      setEtherScanTx("https://bscscan.com/tx/")
      setDexAddress("https://pancakeswap.finance/info/pool/")
    } else if (chainId === NetworkConstants.SMART_CHAIN_TESTNET) {
      setEtherscanAddress("https://testnet.bscscan.com/address/")
      setEtherScanTx("https://testnet.bscscan.com/tx/")
      setDexAddress("https://pancakeswap.finance/info/pool/")
    }
  }, [chainId])
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          {!!txnHash && !!coinBuilt ? (
            <span className="is-size-5" id="success-payments">
              All Transactions Processed Successfully. You can head over to
              Dashboard
            </span>
          ) : (
            <span className="is-size-5" id="warning-payments">
              Do Not Refresh or Close this window
            </span>
          )}
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
      {!!txnError.type ? (
        <div className="columns">
          <div className="column" id="error-box">
            <span className="is-size-6">
              {`An Error has Occurred`}
              <br /> {`Error type: ` + txnError.type}
              <br />
              {`Please note down the Payment Transaction Hash if payment is processed`}
              <br />
              {`Else retry creating your coin`}
            </span>
          </div>
        </div>
      ) : (
        ``
      )}
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
            {!!txnHash ? (
              <div className="columns">
                <div className="column">
                  <span className="is-size-7">Payment Transaction Hash</span>
                </div>
                <div className="column">
                  <span className="is-size-6" id="txnHash">
                    {/* {txnHash} */}
                    <Link to={etherScanTx + txnHash} target="_blank">
                      View on {network === "eth" ? `Etherscan` : `Bscscan`}{" "}
                      <BsBoxArrowUpRight />
                    </Link>
                  </span>
                </div>
              </div>
            ) : (
              ``
            )}

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
            {!!tokenAddress ? (
              <div className="columns">
                <div className="column">
                  <span className="is-size-7">Your Coin Address</span>
                </div>
                <div className="column">
                  <span className="is-size-6" id="txnHash">
                    {/* {tokenAddress} */}
                    <Link to={etherscanAddress + tokenAddress} target="_blank">
                      View on {network === "eth" ? `Etherscan` : `Bscscan`}{" "}
                      <BsBoxArrowUpRight />
                    </Link>
                  </span>
                </div>
              </div>
            ) : (
              ``
            )}

            {!!pairAddress ? (
              <div className="columns">
                <div className="column">
                  <span className="is-size-7">Your Dex Pool Address</span>
                </div>
                <div className="column">
                  <span className="is-size-6" id="txnHash">
                    {/* {pairAddress} */}
                    <Link to={dexAddress + tokenAddress} target="_blank">
                      View on {network === "eth" ? `Uniswap` : `Pancakeswap`}{" "}
                      <BsBoxArrowUpRight />
                    </Link>
                  </span>
                </div>
              </div>
            ) : (
              ``
            )}
          </span>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <span className="is-size-4" id="warning-payments">
            Please keep all the ADDRESSES & TRANSACTION HASH handy for future
            reference
          </span>
        </div>
      </div>
      {!!txnError.type ? (
        <div className="columns">
          <div className="column">
            <CloseModalButton
              setChargeFeeAndDeployContract={setChargeFeeAndDeployContract}
            />
          </div>
        </div>
      ) : (
        <div className="columns">
          <div className="column">
            <DashboardButton dashboardAvailable={dashboardAvailable} />
          </div>
        </div>
      )}
    </div>
  )
}

const ReviewModal = ({
  isActive,
  openPaymentProcessWindow,
  setShowReviewModal,
}) => {
  const [isReviewed, setIsReviewed] = React.useState(false)
  const [isTxnHashChecked, setIsTxnHashChecked] = React.useState(false)
  const [isTermsAndCondAgreed, setIsTermsAndCondAgreed] = React.useState(false)

  function closeModal() {
    setIsReviewed(false)
    setIsTxnHashChecked(false)
    setIsTermsAndCondAgreed(false)
    setShowReviewModal(false)
  }
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content wallet-choice-board">
          <ReviewModalContent
            openPaymentProcessWindow={openPaymentProcessWindow}
            isReviewed={isReviewed}
            setIsReviewed={setIsReviewed}
            isTxnHashChecked={isTxnHashChecked}
            isTermsAndCondAgreed={isTermsAndCondAgreed}
            setIsTxnHashChecked={setIsTxnHashChecked}
            setIsTermsAndCondAgreed={setIsTermsAndCondAgreed}
          />
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

const ReviewModalContent = ({
  openPaymentProcessWindow,
  isReviewed,
  setIsReviewed,
  isTxnHashChecked,
  isTermsAndCondAgreed,
  setIsTxnHashChecked,
  setIsTermsAndCondAgreed,
}) => {
  const user = useAuthState()
  const cartState = useCartState()
  const [network, setNetwork] = React.useState(
    NetworkFromChainId[NetworkConstants.MAINNET_ETHEREUM]
  )

  const [gasTracker, setGasTracker] = React.useState(
    "https://etherscan.io/gastracker"
  )

  function handleReview(event) {
    event.persist()
    setIsReviewed(event.target.checked)
  }

  function handleTxnHashChecked(event) {
    setIsTxnHashChecked(event.target.checked)
  }

  function handleTermsAndCondAgreed(event) {
    setIsTermsAndCondAgreed(event.target.checked)
  }

  // EFFECTS
  React.useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])

  React.useEffect(() => {
    if (network === "eth") {
      setGasTracker("https://etherscan.io/gastracker")
    } else if (network === "bnb") {
      setGasTracker("https://bscscan.com/gastracker")
    }
  }, [network])

  React.useEffect(() => {
    setIsReviewed(false)
    setIsTxnHashChecked(false)
    setIsTermsAndCondAgreed(false)
  }, [])
  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column">
            <span className="is-size-3">Before We Begin</span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-5">
              It is important to uderstand that there will be{" "}
              <b>
                <u>2 transactions</u>
              </b>
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <span className="is-size-5">Transaction 1: Payment</span>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <span className="is-size-6">
              In this step you will be asked to pay your bill of{" "}
              {cartState.totalCharge.fee} {network.toUpperCase()} and{" "}
              <Link to={gasTracker} target="_blank">
                {" "}
                Gas Fees <BsBoxArrowUpRight />.
              </Link>
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <span className="is-size-6">
              Simply follow the instructions on your wallet and{" "}
              <b>CONFIRM or REJECT</b> your transaction
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <div className="note is-small">
              <span className="is-size-6">
                In this step <b>YOU CAN REJECT THE TRANSACTION IF UNSURE</b>
              </span>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <span className="is-size-5">
              Transaction 2: Deployment of Your Coin
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <span className="is-size-6">
              In this step you will again be prompted by your wallet to confirm
              the transaction.
              <br /> There will be no charge but only Gas Fees.
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <span className="is-size-6">
              Simply follow the instructions on your wallet and <b>CONFIRM</b>{" "}
              your transaction
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <div className="note is-small">
              <span className="is-size-6">
                In this step{" "}
                <b>
                  DONOT REJECT THE TRANSACTION AS YOU MAY LOOSE YOUR PAYMENT
                </b>
              </span>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column left-text-align">
            <span className="is-size-3" id="warning-payments">
              Always keep your transaction hash Handy
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <label class="checkbox">
              <input
                checked={isReviewed}
                type="checkbox"
                onChange={handleReview}
              />{" "}
              I understand that I will not reject the 2nd transaction
            </label>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <label class="checkbox">
              <input
                checked={isTxnHashChecked}
                type="checkbox"
                onChange={handleTxnHashChecked}
              />{" "}
              I will keep my transaction hash handy
            </label>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <label class="checkbox">
              <input
                checked={isTermsAndCondAgreed}
                type="checkbox"
                onChange={handleTermsAndCondAgreed}
              />{" "}
              I agree to the{" "}
              <a href="/legal/terms-and-conditions/" target="_blank">
                terms and conditions
              </a>
            </label>
          </div>
        </div>
        <div className="columns">
          <div className="column centered-text-align">
            <button
              className="button theme-action-button-gradient-green"
              disabled={
                !(isReviewed && isTxnHashChecked && isTermsAndCondAgreed)
              }
              onClick={openPaymentProcessWindow}
            >
              I understand. Create my currency
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
