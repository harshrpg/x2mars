import { useWeb3React } from "@web3-react/core"
import { useAuthDispatch } from "../context"
import { useEffect } from "react"
import { UnsupportedChainIdError } from "@web3-react/core/dist/core.esm"


export const useWalletConnect = () => {
  const {
    account,
    active,
    activate,
    chainId,
    error
  } = useWeb3React()
  const dispatch = useAuthDispatch()
  console.debug("Authenticate from custom hook: ", active)
  console.debug("Authenticate from custom hook, Error Occured?: ", error)

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
    } else {
      dispatch({
        type: "DISCONNECTED"
      })
    }
  }, [active, account, chainId, dispatch])

  useEffect(() => {
    if (!!error) {
      dispatch({
        type: "DISCONNECTED"
      })
    }
  }, [error])

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
