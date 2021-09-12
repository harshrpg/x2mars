import * as React from "react"
import { AuthReducer, CartReducer, initialAuthState, initialCartState, initialProfileState, ProfileReducer } from "./reducer"

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()
const CartStateContext = React.createContext()
const CartDispatchContext = React.createContext()
const ProfileStateContext = React.createContext()
const ProfileDispatchContext = React.createContext()
// const ImageDataContext = React.createContext()
// const ImageDispatchContext = React.createContext()

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

export function useCartState() {
  const context = React.useContext(CartStateContext)
  if (context === undefined) {
    throw new Error("useCartState must be used within a AuthProvider")
  }
  return context
}

export function useCartDispatch() {
  const context = React.useContext(CartDispatchContext)
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within a AuthProvider")
  }
  return context
}

export function useProfileState() {
  const context = React.useContext(ProfileStateContext)
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within a AuthProvider")
  }
  return context
}

export function useProfileDispatch() {
  const context = React.useContext(ProfileDispatchContext)
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within a AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = React.useReducer(AuthReducer, initialAuthState)
  const [cart, cartDispatch] = React.useReducer(CartReducer, initialCartState)

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={cart}>
          <CartDispatchContext.Provider value={cartDispatch}>
            {children}
          </CartDispatchContext.Provider>
        </CartStateContext.Provider>
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const ProfileProvider = ({ children }) => {
  const [profile, dispatch] = React.useReducer(ProfileReducer, initialProfileState)

  return (
    <ProfileStateContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  )
}
