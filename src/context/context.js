import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import * as React from "react"
import { AuthReducer, initialState } from "./reducer"

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

export function useAuthState() {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider")
  }
  return context
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider")
  }
  return context
}

function getLibrary(provider) {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 12000
  return library
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = React.useReducer(AuthReducer, initialState)

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        <Web3ReactProvider getLibrary={getLibrary}>
          {children}
        </Web3ReactProvider>
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
