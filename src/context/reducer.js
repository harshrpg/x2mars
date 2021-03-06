
let emptyUser = {
  account: "",
  balance: "",
}

export const initialAuthState = {
  userDetails:
    {
      account: "",
      balance: "",
    },
  chainId: "",
  loading: false,
  errorMessage: null,
  walletType: null,
}

export const AuthReducer = (initialAuthState, action) => {
  console.debug(`Authenticate: Dispatcher seting state to ${action.type}`)
  switch (action.type) {
    case "CONNECTING":
      return {
        ...initialAuthState,
        loading: true,
        walletType: action.payload,
      }
    case "CONNECTION ACTIVE":
      return {
        ...initialAuthState,
        userDetails: action.payload.userDetails,
        chainId: action.payload.chainId,
      }
    case "CONNECTED":
      return {
        ...initialAuthState,
        userDetails: action.payload.userDetails,
        chainId: action.payload.chainId,
        loading: false,
      }
    case "ERROR":
      return {
        ...initialAuthState,
        errorMessage: action.payload.errorMessage,
        walletType: null,
      }
    case "DISCONNECTED":
      return {
        ...initialAuthState,
        walletType: null,
        errorMessage: null,
        loading: false,
        chainId: "",
        userDetails: emptyUser,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const initialCartState = {
  step1: {
    selectedToken: -1,
    totalFees: 0.0,
  },
  step2: {
    tokenName: null,
    tokenSymbol: null,
    tokenSupplyNumber: null,
    tokenSupplyUnits: "Units",
    tokenDecimals: 18,
    dexSelected: false,
    totalFees: 0.0,
    tokenLogo: null,
  },
  step3: {
    auto_liquidation: 0,
    rfi_rewards: 0,
    WHALE_PROTECTION: 0,
    auto_burn: 0,
    auto_charity: 0,
    charity_address: process.env.GATSBY_DEAD_ADDRESS,
    totalFees: 0.0,
  },
  totalCharge: {
    fee: 0.0,
  },
}

export const CartReducer = (initialCartState, action) => {
  console.debug(
    "Cart Selection: Step: ",
    action.step,
    " Payload: ",
    action.payload
  )
  switch (action.step) {
    case 1:
      return {
        ...initialCartState,
        step1: action.payload.step1,
      }
    case 2:
      return {
        ...initialCartState,
        step2: action.payload.step2,
      }
    case 3.1:
      return {
        ...initialCartState,
        step3: action.payload.step3,
      }
    case 3.2:
      return {
        ...initialCartState,
        step3: action.payload.step3,
      }
    case 3.3:
      return {
        ...initialCartState,
        step3: action.payload.step3,
      }
    case 3.4:
      return {
        ...initialCartState,
        step3: action.payload.step3,
      }
    case 3.5:
      return {
        ...initialCartState,
        step3: action.payload.step3,
      }
    case 3.6:
      return {
        ...initialCartState,
        step3: action.payload.step3,
      }
    case 3.7:
      return {
        ...initialCartState,
        step3: action.payload.step3,
      }
    case 4:
      return {
        ...initialCartState,
        totalCharge: action.payload.totalCharge,
      }
  }
}

export const initialProfileState = {
  profileSideBarSelection: [true, false, false, false, false, false, false],
}

export const ProfileReducer = (initialProfileState, action) => {
  return {
    ...initialProfileState,
    profileSideBarSelection: action.sidebar,
  }
}


