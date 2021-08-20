import * as React from "react"
import { Link } from "gatsby"
import { useWeb3React } from "@web3-react/core"
import { FaFileContract } from "@react-icons/all-files/fa/FaFileContract"
import { MdAccountCircle } from "@react-icons/all-files/md/MdAccountCircle"

import { Error, FactoryConstants, NetworkNames } from "../../util/Constants"
import AppLogo from "../Logo/applogo"
import WalletSelect from "../walletSelect/walletselect"

import "./style/appnavbar.scss"
import { NetworkIcon } from "../Icons/icons"
import { useBalance, useNetwork } from "../../hooks/useNetwork"
import CartWindow from "../Cart/cart"
import { useCartState } from "../../context"

const AppNavbar = () => {
  const { account, library, chainId, active } = useWeb3React()
  const networkHook = useNetwork()
  const balanceHook = useBalance()
  const [walletSelect, setWalletSelect] = React.useState(false)
  const [cartDisplay, setCartDisplay] = React.useState(false)
  const [cartError, setCartError] = React.useState(false)
  const [balance, setBalance] = React.useState()
  const [network, setNetwork] = React.useState()

  React.useEffect(() => {
    if (networkHook !== undefined) {
      setNetwork(networkHook)
    }
  }, [networkHook])

  React.useEffect(() => {
    if (!!balanceHook) {
      setBalance(balanceHook)
    }
  }, [balanceHook])

  function showCart() {
    if (active) {
      setCartError(false)
    } else {
      setCartError(true)
    }
    setCartDisplay(true)
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <Link to="/" className="navbar-start">
          <AppLogo />
        </Link>

        <div className="navbar-brand">
          <div className="navbar-item">
            <div className="factory-title">The Token Factory</div>
          </div>
        </div>
        <div className="navbar-end">
          {active ? (
            <div>
              {balance > FactoryConstants.MINIMUM_COIN_TO_PROCEED ? (
                <ProfileButton
                  network={network}
                  balance={balance}
                  account={account}
                  chainId={chainId}
                />
              ) : (
                Error.NOT_ENOUGH_BALANCE
              )}
            </div>
          ) : (
            <div>
              <button
                className="button is-light custom-button app-button"
                type="button"
                onClick={() => setWalletSelect(true)}
              >
                Connect Wallet
              </button>
            </div>
          )}
          <div>
            <button
              className="button is-light cart-button"
              type="button"
              onClick={showCart}
            >
              <span>Your Contract</span>
              <span className="icon is-small">
                <FaFileContract />
              </span>
            </button>
          </div>
        </div>
      </nav>
      <WalletSelect
        setWalletSelect={setWalletSelect}
        isActive={walletSelect || cartError}
        cartError={cartError}
        setCartError={setCartError}
        setCartDisplay={setCartDisplay}
      />
      {active ? (
        <CartWindow setCartDisplay={setCartDisplay} isActive={cartDisplay} />
      ) : (
        ``
      )}
    </>
  )
}

const ProfileButton = ({
  network,
  balance,
  account,
  chainId,
  setCartDisplay,
}) => {
  const style =
    chainId === 1 || chainId === 56
      ? { color: "#00C853" }
      : { color: "#E53935" }

  return (
    <div style={{ position: "relative" }}>
      <div className="conatiner">
        <div className="columns">
          <div className="column" style={{ paddingRight: 0 }}>
            <button className="button is-light custom-button" type="button">
              <div>
                <div className="columns">
                  <div className="column">
                    <NetworkIcon network={network} color={style.color} />
                  </div>
                  <div className="column" style={style}>
                    {balance}
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="column" style={{ paddingLeft: 0 }}>
            <Link to="/profile" type="profile">
              <button
                className="button is-light custom-button account-address-button"
                type="button"
              >
                <span>
                  {account.slice(0, 6) +
                    "...." +
                    account.substring(account.length - 3)}
                </span>
                <span className="icon is-small icon-profile">
                  <MdAccountCircle />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="network-pill has-text-centered is-size-7">
        <span className="networkName" style={style}>
          {NetworkNames[chainId]}
        </span>
      </div>
    </div>
  )
}

export default AppNavbar
