import { useWeb3React } from "@web3-react/core"

export const useWalletConnect = () => {
    const {account, active, activate, chainId, error, library} = useWeb3React();
    return activate
}

// function activateWallet(dispatch, walletType) {
//     dispatch({ type: "CONNECTING", payload: walletType })
//     console.log(walletType)
// }