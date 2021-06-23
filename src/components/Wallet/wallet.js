import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { formatEther } from "@ethersproject/units"
import BigNumber from "bignumber.js"
import useSWR from "swr"
import * as React from "react"
import Constants from "./util/Constants"

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Constants.MAINNET_ETHEREUM,
    Constants.ROPSTEN,
    Constants.RINKEBY,
    Constants.GOERLI,
    Constants.KOVAN,
    Constants.SMART_CHAIN_TESTNET,
    Constants.SMART_CHAIN_MAINNET,
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
          {balance > Constants.MINIMUM_COIN_TO_PROCEED ? `Account: ${account} Balance: ${balance}` : `Not enough balance`}
        </div>
      ) : (
        <button type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default Wallet
