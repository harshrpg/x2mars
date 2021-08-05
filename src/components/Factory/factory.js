import { useWeb3React } from "@web3-react/core"
import * as React from "react"
import "./style/factory.scss"
import FactorySteps from "./tokensteps"
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
  let connectedNetwork = "eth"
  const [stepCount, setStepCount] = React.useState(0)
  const setCart = () => {
    console.log("Setting Cart")
  }
  return (
    <>
      <FactorySteps
        stepNumber={stepCount}
        // isConnectionActive={active}
        // hasBalanceChanged={accountBalanceChanged}
        callback={setCart}
        // accountBalance={accountBalance}
        network={connectedNetwork}
      />
    </>
  )
}

export default Factory
