import { FortmaticConnector } from "@web3-react/fortmatic-connector"
import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
import { NetworkConstants } from "./Constants"

// TODO: Remove below infura keys and replace with custom infura keys and put them in .env file
const env_RPC_URL_1 =
  "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213"
const FORTMATIC_API_KEYS = "pk_test_9F6718E5778063B7"

const injected = new InjectedConnector({
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


const walletlink = new WalletLinkConnector({
  url: "https://mainnet.infura.io/v3/c3fb6644d68a4d3db5c61fe11905c7dc",
  appName: "Momentum", // TODO: Update App name here
  // supportedChainIds: [
  //   NetworkConstants.MAINNET_ETHEREUM,
  //   NetworkConstants.ROPSTEN,
  //   NetworkConstants.RINKEBY,
  //   NetworkConstants.GOERLI,
  //   NetworkConstants.KOVAN,
  //   NetworkConstants.SMART_CHAIN_TESTNET,
  //   NetworkConstants.SMART_CHAIN_MAINNET,
  // ],
  supportedChainIds: [1, 3, 4, 5, 42, 10, 137, 69, 420, 80001]
})

// TODO: Replace chain id to mainnet. Dynamic Chain Id fetch
const fortmatic = new FortmaticConnector({apiKey: FORTMATIC_API_KEYS, chainId: NetworkConstants.RINKEBY})

export const Connector = {
    INJECTED: injected,
    WALLETLINK: walletlink,
    FORTMATIC: fortmatic
}