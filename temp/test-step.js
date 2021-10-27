import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import AppLayout from "../src/components/applayout"
import Seo from "../src/components/seo"
import { AuthProvider } from "../src/context/context"
import * as React from "react"
import Steps from "../src/components/Steps/steps"
import { BsDash } from "@react-icons/all-files/bs/BsDash";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
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
          <NumberInput />
        </AppLayout>
      </Web3ReactProvider>
    </AuthProvider>
  )
}

const NumberInput = () => {
  const [number, setNumber] = React.useState(0)
  function increment() {
    if (number <= 14) {
      setNumber(number + 1)
    }
  }
  return (
    <>
    <div className="columns">
      <div className="column" onClick={increment}>
        <BsPlus	/>
      </div>
      <div className="column">
        <span className="is-size-3">
          {number}
        </span>
      </div>
      <div className="column" onClick={() => setNumber(number - 1)}>
        <BsDash	/>
      </div>
    </div>
    </>
  )
}

export default TestSteps;