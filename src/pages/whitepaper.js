import * as React from "react"
import Seo from "../components/seo"
import AboutDac from "../components/AboutDac/aboutDac"
import AppLayout from "../components/applayout"
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import { AuthProvider } from "../context"
const getLibrary = provider => {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 12000
  return library
}

const Whitepaper = () => {
  return (
        
      <AuthProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppLayout>
        <Seo title="whitepaper" />
        <AboutDac />
        </AppLayout>
      </Web3ReactProvider>
    </AuthProvider>
  )
}

export default Whitepaper
