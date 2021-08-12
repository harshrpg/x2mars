let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : ""

export const initialAuthState = {
  userDetails:
    {
      account: "",
      balance: "",
    } || user,
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
        loading: false
      }
    case "ERROR":
      return {
        ...initialAuthState,
        errorMessage: action.payload.errorMessage
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const initialCartState = {
  step1: {
    selectedToken: -1
  },
}

export const CartReducer = (initialCartState, action) => {
  console.debug("Cart Selection: Step: ", action.step, " Payload: ", action.payload)
  switch(action.step) {
    case 1:
      return {
        ...initialCartState,
        step1: action.payload.step1
      }
  }
}
