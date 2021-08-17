import * as React from "react"
import { useCartState } from "../../context"
import { Error, TokenTypeIds, TokenTypes } from "../../util/Constants"
import { GoX } from "@react-icons/all-files/go/GoX"
import "./style/style.scss"
import { GatsbyImage } from "gatsby-plugin-image"
import { useImageForData } from "../../hooks/useAllImages"
import { Steps } from "../../util/factory-steps"
import { useNetwork } from "../../hooks/useNetwork"
import { NetworkIcon } from "../Icons/icons"
import ErrorBox from "../Error/errorbox"

const CartWindow = ({ setCartDisplay, isActive }) => {
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div class="modal-background"></div>
        <div class="modal-content cart-summary-board">
          <ModalContent />
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

const ModalContent = () => {
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
          <DeployButton />
        </div>
      </div>
    </div>
  )
}

const TokenType = () => {
  const cartState = useCartState()
  const network = useNetwork()

  const gTokenImage = useImageForData(Steps.Step1.cardData[0].img)
  const fotTokenImage = useImageForData(Steps.Step1.cardData[1].img)

  const [tokenImage, setTokenImage] = React.useState(gTokenImage)

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
  const cartState = useCartState()
  const network = useNetwork()

  const [dexImage, setDexImage] = React.useState(Steps.Step2.cardData[2].img["eth"])

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
            <div className="column">{cartState.step2.totalFees + ` ` + network.toUpperCase()}</div>
          </div>
        </div>
      ) : (
        ``
      )}
    </>
  )
}

const FeaturesSelected = () => {
  const cartState = useCartState()
  return (
    <>
      {cartState.step1.selectedToken === 1 &&
      (!!cartState.step3.auto_liquidation ||
        !!cartState.step3.rfi_rewards ||
        !!cartState.step3.anti_whale_protection ||
        !!cartState.step3.auto_burn ||
        !!cartState.step3.auto_charity) ? (
        <div className="cart-summary-container">
          <span className="summary-pill">Features Selection</span>
          <div className="columns">
            <div className="column">icon</div>
            <div className="column">Features Selected</div>
            <div className="column">0 ETH</div>
          </div>
        </div>
      ) : (
        ``
      )}
    </>
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

export default CartWindow
