let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : ""

export const initialState = {
    userDetails: "" || user,
    loading: false,
    errorMessage: null,
    walletType: null,
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "CONNECTING":
            console.debug(`Authenticate: Dispatcher seting state to ${action.type}`)
            return {
                ...initialState,
                loading: true,
                walletType: action.payload
            }
    
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}