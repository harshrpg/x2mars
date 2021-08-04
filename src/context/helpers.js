import { InjectedConnector } from "@web3-react/injected-connector"
import { NetworkConstants } from "../util/Constants"

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
