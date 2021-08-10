import * as React from "react"
import { Link } from "gatsby"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { formatEther } from "@ethersproject/units"
import useSWR from "swr"
import { FaFileContract } from "@react-icons/all-files/fa/FaFileContract"
import { MdAccountCircle } from "@react-icons/all-files/md/MdAccountCircle"

import {
  NetworkConstants,
  FactoryConstants,
  NetworkNames,
} from "../../util/Constants"
import AppLogo from "../Logo/applogo"
import WalletSelect from "../walletSelect/walletselect"

import "./style/appnavbar.scss"
import { BigNumber } from "ethers"
import { NetworkIcon } from "../Icons/icons"
import { useBalance, useNetwork } from "../../hooks/useNetwork"

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    NetworkConstants.MAINNET_ETHEREUM,
    NetworkConstants.ROPSTEN,
    NetworkConstants.RINKEBY,
    NetworkConstants.GOERLI,
    NetworkConstants.KOVAN,
    NetworkConstants.SMART_CHAIN_TESTNET,
    NetworkConstants.SMART_CHAIN_MAINNET,
  ],
})

const fetcher = library => (...args) => {
  const [method, ...params] = args
  console.log(method, params)
  return library[method](...params)
}



const AppNavbar = () => {
  const { account, library, chainId, active } = useWeb3React()
  const networkHook = useNetwork()
  const balanceHook = useBalance()
  const [walletSelect, setWalletSelect] = React.useState(false)
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

  // const { data, error, mutate } = useSWR(["getBalance", account, "latest"], {
  //   fetcher: fetcher(library),
  // })
  // React.useEffect(() => {
  //   if (library) {
  //     library.on("block", () => {
  //       console.log("update balance...")
  //       mutate(undefined, true)
  //     })
  //     return () => {
  //       library.removeAllListeners("block")
  //     }
  //   }
  // }, [])
  // if (data) {
  //   var balance = new BigNumber(data._hex).toString()
  //   balance = formatBalance(balance)
  // }

  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
      >
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
                `Not enough balance`
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
          {/* <div>
              <button
                className="button is-light custom-button app-button"
                type="button"
                onClick={() => setWalletSelect(true)}
              >
                Connect Wallet
              </button>
            </div> */}
          <div>
            <button className="button is-light cart-button" type="button">
              <span>Your Contract</span>
              <span className="icon is-small">
                <FaFileContract />
              </span>
            </button>
          </div>
        </div>
      </nav>
      <WalletSelect setWalletSelect={setWalletSelect} isActive={walletSelect} />
    </>
  )
}

const ProfileButton = ({ network, balance, account, chainId }) => {
  const style =
    chainId === 1 || chainId === 56
      ? { color: "#00C853" }
      : { color: "#E53935" }

  return (
    <div style={{position: "relative"}}>
      <div className="conatiner">
        <div className="columns">
          <div className="column" style={{ paddingRight: 0 }}>
            <button className="button is-light custom-button" type="button">
              <div>
                <div className="columns">
                  <div className="column">
                    <NetworkIcon network={network} color={style.color} />
                  </div>
                  <div className="column" style={style}>{balance}</div>
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
        <span
          className="networkName"
          style={style}
        >
          {NetworkNames[chainId]}
        </span>
      </div>
    </div>
  )
}

export default AppNavbar
