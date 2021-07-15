import { useWeb3React } from "@web3-react/core"
import * as React from "react"
import "./factory.css"
import TestSteps from "./tokensteps"
import useSWR from "swr"
import BigNumber from "bignumber.js"
import { formatEther } from "@ethersproject/units"

const fetcher = library => (...args) => {
  const [method, ...params] = args
  return library[method](...params)
}

const formatBalance = balance => {
  return parseFloat(formatEther(balance)).toPrecision(4)
}

const Factory = () => {
  let connectedNetwork = "bnb"
  const [stepCount, setStepCount] = React.useState(0)
  const [accountBalanceChanged, setAccountBalanceChanged] = React.useState(
    false
  )
  const [accountBalance, setAccountBalance] = React.useState(0.0)
  const { account, active, library } = useWeb3React()
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
    console.log(balance)
    setAccountBalance(balance)
  }

  const setCart = () => {
    console.log("Setting Cart")
  }
  return (
    <>
      <TestSteps
        stepNumber={stepCount}
        isConnectionActive={active}
        hasBalanceChanged={accountBalanceChanged}
        callback={setCart}
        accountBalance={accountBalance}
        network={connectedNetwork}
      />
    </>
  )
}

export default Factory
