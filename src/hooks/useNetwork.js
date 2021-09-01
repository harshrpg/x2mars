import { formatEther } from "@ethersproject/units"
import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "ethers"
import { useState, useEffect } from "react"
import useSWR from "swr"
import { useAuthDispatch, useAuthState } from "../context"
import { NetworkFromChainId } from "../util/Constants"

const etherNetworks = [1, 3, 4, 5, 42]
const bscNetworks = [97, 56]

export const useNetwork = () => {
  const { chainId } = useWeb3React()
  const user = useAuthState()
  const [network, setNetwork] = useState()

  useEffect(() => {
    if (!!chainId) {
      if (etherNetworks.includes(chainId)) {
        setNetwork("eth")
      } else if (bscNetworks.includes(chainId)) {
        setNetwork("bnb")
      }
    }
  }, [chainId])

  useEffect(() => {
    if (!!user.chainId) {
      setNetwork(NetworkFromChainId[parseInt(user.chainId)])
    }
  }, [user])

  return network
}

export const useBalance = () => {
  const { library, account, chainId } = useWeb3React()
  const dispatch = useAuthDispatch()
  const [balance, setBalance] = useState()

  const { data, errorSwr, mutate } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  })

  useEffect(() => {
    if (!!data) {
      setBalance(formatBalance(BigNumber.from(data._hex).toString()))
    }
  }, [data])

  useEffect(() => {
    if (!!balance) {
      dispatch({
        type: "CONNECTED",
        payload: {
          userDetails: { account: account, balance: balance },
          chainId: chainId,
        },
      })
    }
  }, [balance])

  useEffect(() => {
    if (!!errorSwr) {
      dispatch({
        type: "ERROR",
        payload: {
          errorMessage: errorSwr,
        },
      })
    }
  }, [errorSwr])

  useEffect(() => {
    if (library) {
      library.on("block", () => {
        mutate(undefined, true)
      })
    }

    return () => {
      if (library) {
        library.removeAllListeners("block")
      }
    }
  }, [])

  return balance
}

const fetcher = library => (...args) => {
  const [method, ...params] = args
  console.log(method, params)
  return library[method](...params)
}

const formatBalance = balance => {
  return parseFloat(formatEther(balance)).toPrecision(4)
}
