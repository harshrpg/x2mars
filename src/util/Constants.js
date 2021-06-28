export const NetworkConstants = {
  MAINNET_ETHEREUM: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  SMART_CHAIN_TESTNET: 97,
  SMART_CHAIN_MAINNET: 56,
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
}

// export default Constants;
