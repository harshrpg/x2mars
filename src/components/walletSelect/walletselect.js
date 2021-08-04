import * as React from "react"
import { GoX } from "@react-icons/all-files/go/GoX"

import { Coinbase, FortmaticIcon, Metamask } from "../Icons/icons"
import "./style/style.scss"
import useEthBalance from "../../hooks/useEthBalance"
import { useAuthDispatch, useAuthState, walletConnect } from "../../context"
import { WalletTypes } from "../../util/Constants"
import { useWeb3React } from "@web3-react/core"
import { useWalletConnect } from "../../hooks/useWalletConnect"
import { injectedConnector } from "../../context/helpers"

const WalletSelect = ({ setWalletSelect, active }) => {
  const {userDetails, loading, errorMessage} = useAuthState()
  console.debug(`Authenticate: Inside Wallet Select ${loading}`)
  return (
    <div className={`modal ${active ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content wallet-choice-board">
        <ModalContent />
        <div className="modal-close-custom">
          <button
            class="button close-modal-button"
            aria-label="close"
            onClick={() => setWalletSelect(false)}
          >
            <span class="icon is-large">
              <GoX />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

const ModalContent = () => {
  return (
    <div className="container has-text-centered">
      <div className="columns">
        <div className="column is-full">
          <span className="is-size-2-desktop is-size-4-mobile">
            Select Your Wallet
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <MetaMaskWalletConnect />
        </div>
        <div className="column">
          <CoinbaseWalletConnect />
        </div>
        <div className="column">
          <FortmaticWalletConnect />
        </div>
      </div>
    </div>
  )
}

const MetaMaskWalletConnect = () => {
  // const [metamaskInstalled, _] = React.useState(window.ethereum)
  const [metamaskInstalled, _] = React.useState(true) // TODO: Remove, only for debugging purposes
  const dispatch = useAuthDispatch();
  const activate = useWalletConnect();
  const handleClick = () => {
    dispatch({ type: "CONNECTING", payload: WalletTypes.METAMASK })
    activate(injectedConnector)
  }
  return (
    <div>
      <div className="columns">
        <div className="column">
          <Metamask color="#F6851B" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">Metamask</span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-7">
            Metamask Wallet is a gateway to blockchain apps. It allows you to
            buy, store, send and swap tokens all within a browser extension
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          {metamaskInstalled !== undefined ? <button
            className="button is-light custom-button"
            type="button"
            onClick={handleClick}
          >
            Connect
          </button>: <button
            className="button is-light custom-button"
            type="button"
            onClick={handleClick}
            disabled={true}
          >
            Unavailable
          </button>}
        </div>
      </div>
    </div>
  )
}

const CoinbaseWalletConnect = () => {
  return (
    <div>
      <div className="columns">
        <div className="column">
          <Coinbase color="#164edf" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">Coinbase Wallet</span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-7">
            WalletLink by Coinbase establishes a secure bridge between your
            Coinbase wallet and the browser. Simply scan the QR code to connect.
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <button className="button is-light custom-button" type="button">
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

const FortmaticWalletConnect = () => {
  //   const [connect, setConnect] = React.useState(false)

  //   React.useEffect(() => {
  //       if (connect) useEthBalance();
  //   }, [connect])
  return (
    <div>
      <div className="columns">
        <div className="column">
          <FortmaticIcon color="#6851ff" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">Fortmatic</span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-7">
            Use Fortmatic to sign in using a security compliant wallet in
            seconds. All you need is your phone number and 2FA.
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <button
            className="button is-light custom-button"
            type="button"
            // onClick={() => setConnect(true)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletSelect
