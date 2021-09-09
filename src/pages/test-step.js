import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import AppLayout from "../components/applayout"
import Seo from "../components/seo"
import { AuthProvider } from "../context/context"
import * as React from "react"
import Steps from "../components/Steps/steps"
const getLibrary = provider => {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 12000
  return library
}
const TestSteps = () => {
  return (
    <AuthProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppLayout>
          <Seo title="Testing" />
          <Steps />
        </AppLayout>
      </Web3ReactProvider>
    </AuthProvider>
  )
}

export default TestSteps;