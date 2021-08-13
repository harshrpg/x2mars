import * as React from "react"
import AppLayout from "../components/applayout"
import Seo from "../components/seo"
import "../style/index.scss"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import Factory from "../components/Factory/factory"
import { AuthProvider } from "../context"

const getLibrary = provider => {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 12000
  return library
}
const Interface = () => {
  library.add(fab)
  return (
    <AuthProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppLayout>
          <Seo title="App" />
          <Factory />
        </AppLayout>
      </Web3ReactProvider>
    </AuthProvider>
  )
}

export default Interface
