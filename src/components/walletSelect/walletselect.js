import * as React from "react"
import { GoX } from "@react-icons/all-files/go/GoX"
import { useWeb3React } from "@web3-react/core"
import { useSpring, animated, config, useTransition } from "@react-spring/web"

import { Coinbase, FortmaticIcon, Metamask } from "../Icons/icons"
import "./style/style.scss"
import { useAuthState } from "../../context"
import { Error, WalletTypes } from "../../util/Constants"
import { useWalletConnect } from "../../hooks/useWalletConnect"
import { injectedConnector } from "../../context/helpers"
import { Connector } from "../../util/connectors"
import ErrorBox from "../Error/errorbox"

const WalletSelect = ({
  setWalletSelect,
  isActive,
  cartError,
  setCartError,
  setCartDisplay,
}) => {
  const [balance, setBalance] = React.useState()
  const { userDetails, loading, errorMessage } = useAuthState()
  const { active, account, chainId, library } = useWeb3React()
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false
      library
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(undefined)
          }
        })
    }
  }, [account, library, chainId])

  React.useEffect(() => {
    if (active) {
      setWalletSelect(false)
      setCartError(false)
      setCartDisplay(false)
    }
  }, [active, setWalletSelect, setCartError])

  function closeModal() {
    setWalletSelect(false)
    setCartError(false)
    setCartDisplay(false)
  }

  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content wallet-choice-board">
        <ModalContent />

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
      {cartError ? (
        <div className="modal-error-custom is-size-4 is-size-5-mobile">
          <ErrorBox error={Error.CONNECT_WALLET} />
        </div>
      ) : (
        ``
      )}
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
  const { loading, walletType } = useAuthState()
  const hide = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0.3 },
    // reset: true,
    reverse: loading && walletType !== WalletTypes.METAMASK,
    delay: 200,
    config: config.molasses,
    // onRest: () => set(true),
  })
  // const [metamaskInstalled, _] = React.useState(window.ethereum)
  const [metamaskInstalled, _] = React.useState(true) // TODO: Remove, only for debugging purposes
  const activate = useWalletConnect()
  const handleClick = () => {
    activate(WalletTypes.METAMASK, Connector.INJECTED)
  }
  return (
    <animated.div style={hide}>
      <div className="wallet-connect-container">
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
            {metamaskInstalled !== undefined ? (
              loading && walletType === WalletTypes.METAMASK ? (
                "Loading"
              ) : (
                <button
                  className="button is-light custom-button"
                  type="button"
                  onClick={handleClick}
                  disabled={loading && walletType !== WalletTypes.METAMASK}
                >
                  Connect
                </button>
              )
            ) : (
              <button
                className="button is-light custom-button"
                type="button"
                onClick={handleClick}
                disabled={true}
              >
                Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </animated.div>
  )
}

const CoinbaseWalletConnect = () => {
  const { loading, walletType } = useAuthState()
  const hide = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0.3 },
    // reset: true,
    reverse: loading && walletType !== WalletTypes.WALLETLINK,
    delay: 200,
    config: config.molasses,
    // onRest: () => set(true),
  })
  const activate = useWalletConnect()
  const handleClick = () => {
    activate(WalletTypes.WALLETLINK, Connector.WALLETLINK)
  }
  return (
    <animated.div style={hide}>
      <div className="wallet-connect-container ">
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
              Coinbase wallet and the browser. Simply scan the QR code to
              connect.
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <button
              className="button is-light custom-button"
              type="button"
              onClick={handleClick}
              // disabled={loading && walletType !== WalletTypes.WALLETLINK}
              disabled={true}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  )
}

const FortmaticWalletConnect = () => {
  const { loading, walletType } = useAuthState()
  const hide = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0.3 },
    // reset: true,
    reverse: loading && walletType !== WalletTypes.FORTMATIC,
    delay: 200,
    config: config.molasses,
    // onRest: () => set(true),
  })
  const activate = useWalletConnect()
  const handleClick = () => {
    activate(WalletTypes.FORTMATIC, Connector.FORTMATIC)
  }
  return (
    <animated.div style={hide}>
      <div className="wallet-connect-container">
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
              onClick={handleClick}
              disabled={loading && walletType !== WalletTypes.FORTMATIC}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default WalletSelect
