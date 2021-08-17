import * as React from "react"
import { useCartState } from "../../context"
import { Error, TokenTypes } from "../../util/Constants"
import { GoX } from "@react-icons/all-files/go/GoX"
import "./style/style.scss"
const CartWindow = ({ setCartDisplay, isActive }) => {
  const cartState = useCartState()

  const [cartError, setCartError] = React.useState()

  React.useEffect(() => {
    if (cartState.step1.selectedToken === -1) {
      setCartError(Error.SELECT_TOKEN)
    } else {
      setCartError(null)
    }
  }, [cartState])
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
    </div>
  )
}

const TokenType = () => {
  return (
    <>
      <div className="cart-summary-container">
        <span className="summary-pill">Token Type</span>
        <div className="columns">
          <div className="column">icon</div>
          <div className="column">Selected Token</div>
          <div className="column">0 ETH</div>
        </div>
      </div>
    </>
  )
}

const DexSelected = () => {
  return (
    <>
      <div className="cart-summary-container">
        <span className="summary-pill">Pool Selection</span>
        <div className="columns">
          <div className="column">icon</div>
          <div className="column">Dex Selected</div>
          <div className="column">0 ETH</div>
        </div>
      </div>
    </>
  )
}

const FeaturesSelected = () => {
  return (
    <>
      <div className="cart-summary-container">
        <span className="summary-pill">Features Selection</span>
        <div className="columns">
          <div className="column">icon</div>
          <div className="column">Features Selected</div>
          <div className="column">0 ETH</div>
        </div>
      </div>
    </>
  )
}

export default CartWindow
