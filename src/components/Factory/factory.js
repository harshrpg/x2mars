import * as React from "react"
import "./factory.css"
import Cardselection from "../cardSelect/cardselect"
import Steps from "./tokensteps"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const Factory = props => {

  const getLibrary = (provider) => {
    const library = new Web3Provider(provider, "any");
    library.pollingInterval = 12000;
    return library;
  }

  library.add(fab)

  return (
    <div>
     
    
    <Steps />
    
    </div>
  )
}

export default Factory
