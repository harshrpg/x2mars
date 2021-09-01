import * as React from "react"
import { useAuthState, useCartState } from "../../context"
import {
  Error,
  NetworkConstants,
  NetworkFromChainId,
  TokenTypeIds,
  TokenTypes,
} from "../../util/Constants"
import { GoX } from "@react-icons/all-files/go/GoX"
import "./style/style.scss"
import { GatsbyImage } from "gatsby-plugin-image"
import { useImageForData } from "../../hooks/useAllImages"
import { Steps } from "../../util/factory-steps"
import { useNetwork } from "../../hooks/useNetwork"
import { NetworkIcon } from "../Icons/icons"
import ErrorBox from "../Error/errorbox"

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
        !!cartState.step3.anti_whale_protection ||
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
          {!!cartState.step3.anti_whale_protection ? (
            <div className="columns">
              <div className="column">
                <GatsbyImage
                  image={image3}
                  width={2}
                  height={2}
                  className="cart-image"
                />
              </div>
              <div className="column">Anti Whale Protection</div>
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
      if (!!cartState.step3.anti_whale_protection) {
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
          {totalChargeableFees + ` ` + network.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

const DeployButton = () => {
  const cartState = useCartState()

  const [contractDeployable, setContractDeployable] = React.useState(false)

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
  return (
    <>
      <button
        className={`button deploy-contract-button ${
          contractDeployable ? "" : "inactive"
        }`}
        type="button"
        disabled={!contractDeployable}
      >
        Deploy Contract
      </button>
    </>
  )
}
