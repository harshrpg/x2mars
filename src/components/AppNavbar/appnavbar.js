import * as React from "react"
import { Link } from "gatsby"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { formatEther } from "@ethersproject/units"
import BigNumber from "bignumber.js"
import useSWR from "swr"
import { FaFileContract } from "@react-icons/all-files/fa/FaFileContract"

import { NetworkConstants, FactoryConstants } from "../../util/Constants"
import AppLogo from "../Logo/applogo"
import WalletSelect from "../walletSelect/walletselect";

import "./style/appnavbar.scss"

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
  const { account, activate, active, library } = useWeb3React()
  const [walletSelect, setWalletSelect] = React.useState(false)
  const connectWallet = () => {
    activate(injectedConnector)
  }
  const { data, error, mutate } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  })
  React.useEffect(() => {
    if (library) {
      library.on("block", () => {
        console.log("update balance...")
        mutate(undefined, true)
      })
      return () => {
        library.removeAllListeners("block")
      }
    }
  }, [])
  if (data) {
    var balance = new BigNumber(data._hex).toString()
    balance = formatBalance(balance)
  }

  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <Link to="/" class="navbar-start">
          <AppLogo />
        </Link>

        <div class="navbar-brand">
          <div class="navbar-item" activeClassName="navbar-item">
            <div class="factory-title">The Token Factory</div>
          </div>
        </div>
        <div class="navbar-end">
          {active ? (
            <div>
              {balance > FactoryConstants.MINIMUM_COIN_TO_PROCEED ? (
                <div>
                  <button
                    class="button is-light custom-button app-button-withdata"
                    type="button"
                  >
                    {balance}
                    <br></br>
                    {account.slice(0, 6) +
                      "...." +
                      account.substring(account.length - 3)}
                  </button>
                </div>
              ) : (
                `Not enough balance`
              )}
            </div>
          ) : (
            <div>
              <button
                class="button is-light custom-button app-button"
                type="button"
                onClick={() => setWalletSelect(true)}
              >
                Connect Wallet
              </button>
            </div>
          )}
          <div>
            <button class="button is-light cart-button" type="button">
              <span>Your Contract</span>
              <span class="icon is-small">
                <FaFileContract />
              </span>
            </button>
          </div>
        </div>
      </nav>
      <WalletSelect setWalletSelect={setWalletSelect} active={walletSelect} />
    </>
  )
}

export default AppNavbar
