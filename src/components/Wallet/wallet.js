import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { formatEther } from "@ethersproject/units"
import BigNumber from "bignumber.js"
import useSWR from "swr"
import * as React from "react"
import { NetworkConstants, FactoryConstants, Error } from "../../util/Constants"
import Factory from "../Factory/factory"
import "./wallet.css"

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

const Wallet = () => {
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

  return (
    <div>
      {active ? (
        <div>
          {balance > FactoryConstants.MINIMUM_COIN_TO_PROCEED ? (
            <Factory account={account} balance={balance} />
          ) : (
            Error.NOT_ENOUGH_BALANCE
          )}
        </div>
      ) : (
        <div>
        <button className="button is-link walletbutton" type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
        </div>
      )}
    </div>
  )
}

export default Wallet
