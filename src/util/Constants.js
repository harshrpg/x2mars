export const NetworkConstants = {
  MAINNET_ETHEREUM: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  SMART_CHAIN_TESTNET: 97,
  SMART_CHAIN_MAINNET: 56,
  RPC_URL: "https://ropsten.infura.io/v3/c3fb6644d68a4d3db5c61fe11905c7dc"
}

export const FactoryConstants = {
  MINIMUM_COIN_TO_PROCEED: -1,
}

export const TOKENS_BY_NETWORK = {
  [NetworkConstants.RINKEBY]: [
    {
      address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
    },
    {
      address: "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85",
      symbol: "MKR",
      name: "Maker",
      decimals: 18,
    },
  ],
  [NetworkConstants.ROPSTEN]: [
    {
      address: "0x391F113cBeC1082761bD19B92D3264eF2E30053b",
      name: "X2MStandardTokenFactory"
    }
  ]
}

export const TEST_DATA = {
  GOVERNANCE_TOKEN: {
    name: "Gov Token Master",
    symbol: "GOVTOK",
    supply: 100000000,
    createUniPair: false,
    dexAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  }
}

// export default Constants;
