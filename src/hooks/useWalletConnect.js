import { formatEther } from "@ethersproject/units"
import { useWeb3React } from "@web3-react/core"
import useSWR from "swr"
import { useAuthDispatch } from "../context"
import { injectedConnector } from "../context/helpers"
import { useEffect, useState } from "react"
import { BigNumber } from "ethers"
import { UnsupportedChainIdError } from "@web3-react/core/dist/core.esm"

const fetcher = library => (...args) => {
  const [method, ...params] = args
  console.log(method, params)
  return library[method](...params)
}

const formatBalance = balance => {
  return parseFloat(formatEther(balance)).toPrecision(4)
}

export const useWalletConnect = () => {
  //   const [balance, setBalance] = useState(null)
  const {
    account,
    active,
    activate,
    chainId,
    error,
    library,
    connector,
  } = useWeb3React()
  const { data, errorSwr, mutate } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  })
  const dispatch = useAuthDispatch()
  console.debug("Authenticate from custom hook: ", active)

  function activateWallet(walletType, connector) {
    dispatch({ type: "CONNECTING", payload: walletType })
    console.log("Activating Injector")
    activate(connector).catch(error => {
      if (error instanceof UnsupportedChainIdError) {
        // activate(walletconnect)
        console.log("Error", error)
      } else {
        console.log("Pending Error Occured", error)
      }
    })
  }

  useEffect(() => {
    if (active) {
      dispatch({
        type: "CONNECTION ACTIVE",
        payload: {
          userDetails: { account: account, balance: null },
          chainId: chainId,
        },
      })
    }
  }, [active])

  //   const { data, errorSwr, mutate } = useSWR(["getBalance", account, "latest"], {
  //     fetcher: fetcher(library),
  //   })

    // useEffect(() => {
    //   if (data) {
    //     dispatch({
    //       type: "CONNECTED",
    //       payload: {
    //         userDetails: {
    //           account: account,
    //           balance: formatBalance(BigNumber.from(data._hex).toString()),
    //         },
    //         chainId: chainId,
    //       },
    //     })
    //     localStorage.setItem(
    //       "currentUser",
    //       JSON.stringify({
    //         account: account,
    //         balance: formatBalance(BigNumber.from(data._hex).toString()),
    //       })
    //     )
    //   }
    // }, [])

    // useEffect(() => {
      // if (library) {
      //   library.on("block", () => {
      //     console.log("update balance...")
      //     mutate(undefined, true)
      //   })
      //   return () => {
      //     library.removeAllListeners("block")
      //   }
      // }
    // }, [])
  return activateWallet
}
