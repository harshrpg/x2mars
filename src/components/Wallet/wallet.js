import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { formatEther } from "@ethersproject/units"
import BigNumber from "bignumber.js"
import useSWR from "swr"
import * as React from "react"
import {
  NetworkConstants,
  FactoryConstants,
  TOKENS_BY_NETWORK,
} from "../../util/Constants"
import Factory from "../Factory/factory"
import "./wallet.css"
import ABI from "../../resources/ERC20.abi.json"
import { Contract } from "@ethersproject/contracts"
import { isAddress } from "@ethersproject/address"

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

const fetcher = (library, abi) => (...args) => {
  const [arg1, arg2, ...params] = args
  if (isAddress(arg1)) {
    const address = arg1
    const method = arg2
    const contract = new Contract(address, abi, library.getSigner())
    return contract[method](...params)
  }

  const method = arg1
  return library[method](arg2, ...params)
}

const formatBalance = balance => {
  return parseFloat(formatEther(balance)).toPrecision(4)
}

export const TokenBalance = ({ symbol, address, decimals }) => {
  console.log("Fetching Balance of token: ", symbol)
  const { account, library } = useWeb3React()
  const { data, mutate } = useSWR([address, "balanceOf", account], {
    fetcher: fetcher(library, ABI),
  })

  React.useEffect(() => {
    console.log(`Listening for transfer....`)
    const contract = new Contract(address, ABI, library.getSigner())
    const fromMe = contract.filters.Transfer(account, null)
    library.on(fromMe, (from, to, amount, event) => {
      console.log("Transfer|sent", { from, to, amount, event })
      mutate(undefined, true)
    })

    const toMe = contract.filters.Transfer(null, account)
    library.on(toMe, (from, to, amount, event) => {
      console.log("Transfer|received", { from, to, amount, event })
      mutate(undefined, true)
    })

    return () => {
      library.removeAllListeners(toMe)
      library.removeAllListeners(fromMe)
    }
  })
  console.log("Data::  ", data)
  if (getBalanceFromData(data) === undefined) {
    return <div>Loading</div>
  }
  console.log(getBalanceFromData(data))
  return (
    <div>
      {getBalanceFromData(data)}
      {` `}
      {symbol}
    </div>
  )
}

const getBalanceFromData = data => {
  var balance = undefined
  if (data) {
    balance = new BigNumber(data._hex).toString()
    balance = formatBalance(balance)
  }
  return balance
}

export const TokenList = ({ chainId }) => {
  console.log("Chain connected: ", chainId)
  return (
    <>
      {TOKENS_BY_NETWORK[chainId].map(token => {
        console.log("Getting token balances")
        console.log("Token Name", token.name)
        console.log("Token Name", token.address)
        return (
          <TokenBalance key={token.address} {...token} />
        )
      })}
    </>
  )
}

export const Test = data => {
  console.log("Received data: ", data)
}

const Wallet = () => {
  const { chainId, account, activate, active, library } = useWeb3React()
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
            // <Factory account={account} balance={balance} />
            <TokenList chainId={chainId} />
          ) : (
            `Not enough balance`
          )}
        </div>
      ) : (
        <div>
          <button
            class="button is-link walletbutton"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  )
}

export default Wallet
