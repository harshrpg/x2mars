import * as React from "react"
import { Link, navigate } from "gatsby"
import { useWeb3React } from "@web3-react/core"
import { FaFileContract } from "@react-icons/all-files/fa/FaFileContract"
import { MdAccountCircle } from "@react-icons/all-files/md/MdAccountCircle"

import { Error, FactoryConstants, NetworkNames } from "../../util/Constants"
import AppLogo from "../Logo/applogo"
import WalletSelect from "../walletSelect/walletselect"

import "./style/appnavbar.scss"
import { NetworkIcon } from "../Icons/icons"
import { useBalance, useNetwork } from "../../hooks/useNetwork"
import {CartWindow} from "../Cart/cart"
import { useCartState } from "../../context"
import { FaChartPie } from "@react-icons/all-files/fa/FaChartPie"
import Logo from "../Logo/logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DashboardNavbar = () => {
  const { account, library, chainId, active } = useWeb3React()
  const networkHook = useNetwork()
  const balanceHook = useBalance()
  const [walletSelect, setWalletSelect] = React.useState(false)
  const [cartDisplay, setCartDisplay] = React.useState(false)
  const [cartError, setCartError] = React.useState(false)
  const [balance, setBalance] = React.useState()
  const [network, setNetwork] = React.useState()
  const [isActive, setIsActive] = React.useState(false)

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
        <div className="navbar-brand">
          <Logo />
          <button
            onClick={() => setIsActive(!isActive)}
            className={`hamburger hamburger--emphatic ${
              isActive ? "is-active" : ""
            }`}
            type="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-x2m"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <div
          id="navbar-x2m"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <div>
              <Link to="/whitepaper" className="navbar-start">
                <button className="button is-normal custom-button app-button-footer">
                  Whitepaper
                </button>
              </Link>
            </div>
            {active ? (
              <div>
                <button
                  className="button is-light dashboard-button"
                  type="button"
                  onClick={() => navigate("/interface/")}
                >
                  <span>App</span>
                  <span className="icon is-small dashboard-icon">
                    <FaChartPie />
                  </span>
                </button>
              </div>
            ) : (
              ``
            )}
          </div>
          <div className="navbar-end">
            {active ? (
              <div>
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

  return (
    <div style={{ position: "relative" }}>
      <div className="conatiner">
        <div className="columns">
          <div className="column" style={{ paddingRight: 0 }}>
            <button className="button is-light custom-button" type="button">
              <div>
                <div className="columns">
                  <div className="column">
                    <NetworkIcon network={network} color="#807fc6"/>
                  </div>
                  <div className="column" >
                    {balance}
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="column" style={{ paddingLeft: 0 }}>
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
          </div>
        </div>
      </div>

      <div className="network-pill has-text-centered is-size-7">
        <span className="networkName">
          {NetworkNames[chainId]}
        </span>
      </div>
    </div>
  )
}

export default DashboardNavbar
