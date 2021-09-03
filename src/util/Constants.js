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
    CONNECT_WALLET: "Connect Your Wallet",
    NOT_ENOUGH_BALANCE: "Not Enough Balance",
    SELECT_TOKEN: "Select A Token First"
}

export const TokenTypes = {
    0: "Governance Tokens",
    1: "Fee on Transfer Tokens"
}

export const TokenTypeIds = {
    GOVERNANCE: 0,
    FEE_ON_TRANSFER: 1
}

export const NumberMap= {
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
    AUTO_CHARITY: 4
}