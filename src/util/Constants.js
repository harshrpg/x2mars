export const NetworkConstants =  {
    MAINNET_ETHEREUM : 1,
    ROPSTEN : 3,
    RINKEBY : 4,
    GOERLI : 5,
    KOVAN : 42,
    SMART_CHAIN_TESTNET : 97,
    SMART_CHAIN_MAINNET : 56,
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

export const NetworkFromChainId = {
    1: "eth",
    3: "eth",
    4: "eth",
    5: "eth",
    42: "eth",
    97: "bsc",
    56: "bsc",
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
    CONNECT_WALLET: "Connect Wallet",
    NOT_ENOUGH_BALANCE: "Not Enough Balance"
}