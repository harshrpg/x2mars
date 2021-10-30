import * as React from "react"
import { navigate } from "gatsby"
import { useWeb3React } from "@web3-react/core"
import { FaFileContract } from "@react-icons/all-files/fa/FaFileContract"
import { MdAccountCircle } from "@react-icons/all-files/md/MdAccountCircle"

import { Error, FactoryConstants, NetworkNames } from "../../util/Constants"
import WalletSelect from "../walletSelect/walletselect"

import "./style/appnavbar.scss"
import { NetworkIcon } from "../Icons/icons"
import { useBalance, useNetwork } from "../../hooks/useNetwork"
import {CartWindow} from "../Cart/cart"
import { FaChartPie } from "@react-icons/all-files/fa/FaChartPie"
import { Logo } from "../Logo/logo"
import { StaticImage } from "gatsby-plugin-image"


const AppNavbar = () => {

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
      <nav className={`navbar nav is-fixed-top`} aria-label="main navigation">
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
            <a
              className={`navbar-item navItem}`}
              href="https://www.the-playground.io/"
              style={{ textShadow: "none" }}
            >
              <StaticImage src="../../images/Logo_playground.svg" alt="logo" />
            </a>
          </div>
          <div className="navbar-start">
            {active ? (
              <div>
                <button className="button navPrimaryButtonBack" onClick={() => navigate("/dashboard/")}>
                      <span className="navPrimaryButtonFront">
                        <div className="columns is-mobile is-vcentered">
                          <div className="column">Dashboard</div>
                          <div className="column" style={{ color: "#21C46B" }}>
                          <FaChartPie />
                          </div>
                        </div>
                      </span>
                    </button>
              </div>
            ) : (
              ``
            )}
          </div>
          <div className="navbar-end">
            {active ? (
              <div className="menuSpacing">
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
              <div className="menuSpacing">
                {/* <button
                  className="button is-light custom-button app-button"
                  type="button"
                  onClick={() => setWalletSelect(true)}
                >
                  Connect Wallet
                </button> */}
                <a>
                  <button
                    className="button navPrimaryButtonBack"
                    type="button"
                    onClick={() => setWalletSelect(true)}
                  >
                    <span className="navPrimaryButtonFront">
                      Connect Wallet
                    </span>
                  </button>
                </a>
              </div>
            )}
            <div className="menuSpacing">
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
      <div>
        <div className="columns is-vcentered is-mobile">
          <div className="column ">
            <button
              className="button is-light custom-button custom-button-network"
              type="button"
            >
              <div>
                <div className="columns balancedisplay">
                  <div className="column">
                    <NetworkIcon network={network} color="#011627" />
                  </div>
                  <div className="column balance">{balance}</div>
                </div>
              </div>
            </button>
          </div>

          <div className="column address" style={{ paddingLeft: 0 }}>
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
        <span className="networkName">{NetworkNames[chainId]}</span>
      </div>
    </div>
  )
}

export default AppNavbar
