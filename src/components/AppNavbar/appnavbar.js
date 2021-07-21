import * as React from "react"
import AppLogo from "../Logo/applogo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./style/appnavbar.scss"

import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { formatEther } from "@ethersproject/units"
import BigNumber from "bignumber.js"
import useSWR from "swr"
import { NetworkConstants, FactoryConstants } from "../../util/Constants"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"

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
  //connect wallet code
  const { account, activate, active, library } = useWeb3React()
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

  //library.add(fab)

  console.log("active?", active)

  //create token code
  const [isActive, setIsActive] = React.useState(false)
  return (
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
                {/* <button class="button is-light custom-button app-button" type="button">{account}</button> */}
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
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AppNavbar
