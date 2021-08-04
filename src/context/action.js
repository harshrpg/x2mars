import { WalletTypes } from "../util/Constants";

export const walletConnect = (dispatch, walletType, f) => {
  console.log("Authenticate: Connecting to metamask wallet")
  dispatch({ type: "CONNECTING", payload: walletType })
  switch (walletType) {
      case WalletTypes.METAMASK:
          connectMetamask(f)
          break;
  
      default:
          break;
  }
}

const connectMetamask = (activate) => {
    console.log(typeof activate);
}
