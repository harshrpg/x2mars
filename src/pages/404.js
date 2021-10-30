import * as React from "react"

import AppLayout from "../components/applayout"
import Seo from "../components/seo"
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import { AuthProvider } from "../context"
const getLibrary = provider => {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 12000
  return library
}
const NotFoundPage = () => (
  <>
    <AuthProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppLayout>
          <Seo title="404: Not found" />
          <h1>404: Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </AppLayout>
      </Web3ReactProvider>
    </AuthProvider>
  </>
)

export default NotFoundPage
