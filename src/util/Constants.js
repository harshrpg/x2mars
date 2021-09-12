export const NetworkConstants = {
  MAINNET_ETHEREUM: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  SMART_CHAIN_TESTNET: 97,
  SMART_CHAIN_MAINNET: 56,
}

export const NetworkNames = {
  1: "ETH Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  42: "Kovan",
  97: "BSC Testnet",
  56: "BSC Mainnet",
}

export const TransactionNetworkNames = {
  1: "homestead",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  97: "bnb",
  56: "bnbt",
}

export const NetworkFromChainId = {
  1: "eth",
  3: "eth",
  4: "eth",
  5: "eth",
  42: "eth",
  97: "bnb",
  56: "bnb",
}

export const FactoryConstants = {
  MINIMUM_COIN_TO_PROCEED: -1,
}

export const WalletTypes = {
  METAMASK: "metamask",
  WALLETLINK: "coinbase",
  FORTMATIC: "fortmatic",
}

export const Error = {
  CONNECT_WALLET: "Connect Your Wallet",
  NOT_ENOUGH_BALANCE: "Not Enough Balance",
  SELECT_TOKEN: "Select A Coin Type First",
}

export const TokenTypes = {
  0: "Governance DAO Coins",
  1: "Fee on Transfer (Meme) Coins",
}

export const TokenTypeIds = {
  GOVERNANCE: 0,
  FEE_ON_TRANSFER: 1,
}

export const NumberMap = {
  Thousand: 10 ** 3,
  Million: 10 ** 6,
  Billion: 10 ** 9,
  Trillion: 10 ** 12,
  Quadrillion: 10 ** 15,
}

export const FeatureIds = {
  AUTOMATIC_LIQUIDATION: 0,
  RFI_STATIC_REWARDS: 1,
  WHALE_PROTECTION: 2,
  AUTO_BURN: 3,
  AUTO_CHARITY: 4,
}

export const ContractAddresses = {
  STANDARD_TOKEN_ADDRS: "0x944a42CD70810407C4E15580D6FF27f4E1D54dcc",
  FOT_TOKEN_ADDRS: "0xBc5EB666FB703b22d75ca4bC46b61EE060055526",
  TOKEN_FACTORY_ADDRS: "0x5B752bc5C43E2927CDC7c84b84a6Fd3EFc413d79",
  PAYMENT_WALLET: "0xe31f4CB714260274Df74dbF1ae1Ca28e7aa746F7",
  UNISWAP_ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  PANCAKE_SWAP_ROUTER_BNBT: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
  PANCAKE_SWAP_ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E"
}
