import { formatEther } from "@ethersproject/units"
import { useWeb3React } from "@web3-react/core"
import { useState, useEffect } from "react"

const etherNetworks = [1, 3, 4, 5, 42]
const bscNetworks = [97, 56]

export const useNetwork = () => {
  const { chainId } = useWeb3React()
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
//   if (!!chainId) {
//     if (etherNetworks.includes(chainId)) {
//       return "eth"
//     } else if (bscNetworks.includes(chainId)) {
//       return "bnb"
//     }
//   }

    return network
}

export const useBalance = () => {
  const { library, account, chainId } = useWeb3React()
  const [balance, setBalance] = useState()
  useEffect(() => {
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

  return balance
}

const formatBalance = balance => {
  return parseFloat(formatEther(balance)).toPrecision(4)
}
