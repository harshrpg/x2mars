import * as React from "react"
import { useCartState } from "../../context"
import { TokenTypes } from "../../util/Constants"
import "./style/style.scss"
const CartWindow = ({ setCartDisplay, isActive }) => {
  const cartState = useCartState()
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div class="modal-background"></div>
        <div class="modal-content">{cartState.step1.selectedToken}</div>
        <button class="modal-close is-large" aria-label="close" onClick={() => setCartDisplay(false)}></button>
      </div>
    </>
  )
}

export default CartWindow
