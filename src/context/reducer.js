let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : ""

export const initialState = {
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

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "CONNECTING":
      console.debug(`Authenticate: Dispatcher seting state to ${action.type}`)
      return {
        ...initialState,
        loading: true,
        walletType: action.payload,
      }
    case "CONNECTION ACTIVE":
      console.debug(`Authenticate: Dispatcher seting state to ${action.type}`)
      return {
        ...initialState,
        userDetails: action.payload.userDetails,
        chainId: action.payload.chainId,
      }
    case "CONNECTED":
      console.debug(`Authenticate: Dispatcher seting state to ${action.type}`)
      return {
        ...initialState,
        userDetails: action.payload.userDetails,
        chainId: action.payload.chainId,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
