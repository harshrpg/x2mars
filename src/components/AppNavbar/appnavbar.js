import * as React from "react"
import { Link } from "gatsby"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { formatEther } from "@ethersproject/units"
import useSWR from "swr"
import { FaFileContract } from "@react-icons/all-files/fa/FaFileContract"

import { NetworkConstants, FactoryConstants } from "../../util/Constants"
import AppLogo from "../Logo/applogo"
import WalletSelect from "../walletSelect/walletselect"

import "./style/appnavbar.scss"
import { BigNumber } from "ethers"
import NetworkIcon from "../Network/NetworkIcon"

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

const formatBalance = balance => {
  return parseFloat(formatEther(balance)).toPrecision(4)
}

const AppNavbar = () => {
  const { account, library, chainId, active } = useWeb3React()
  const [walletSelect, setWalletSelect] = React.useState(false)
  const [balance, setBalance] = React.useState()
  const [network, setNetwork] = React.useState()

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false
      library
        .getBalance(account)
        .then(balance => {
          if (!stale) {
            setBalance(formatBalance(balance.toString()))
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
    if (!!chainId) {
      if (
        chainId === NetworkConstants.SMART_CHAIN_MAINNET ||
        chainId === NetworkConstants.SMART_CHAIN_TESTNET
      ) {
        setNetwork("bnb")
      } else {
        setNetwork("eth")
      }
    }
  }, [chainId])

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

const ProfileButton = ({ network, balance, account }) => {
  return (
    <div className="conatiner">
      <div className="columns">
        <div className="column" style={{paddingRight: 0}}>
          <button
            className="button is-light custom-button app-button-withdata"
            type="button"
          >
            <div>
              <div className="columns">
                <div className="column">
                  <NetworkIcon network={network} color="#FFFFFF" />
                </div>
                <div className="column">{balance}</div>
              </div>
            </div>
          </button>
        </div>
        <div className="column" style={{paddingLeft: 0}}>
          <button
            className="button is-light custom-button account-address-button"
            type="button"
          >
            <div>
              <div className="columns">
                <div className="column navbar-address-column">
                  {account.slice(0, 6) +
                    "...." +
                    account.substring(account.length - 3)}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppNavbar
