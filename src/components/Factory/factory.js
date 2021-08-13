import * as React from "react"
import { useNetwork } from "../../hooks/useNetwork"
import "./style/factory.scss"
import FactorySteps from "./tokensteps"


const Factory = () => {
  // const network = useNetwork();
  // console.debug("Network: ", network)
  return (
    <>
      <FactorySteps />
    </>
  )
}

export default Factory
