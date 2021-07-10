import * as React from "react";
import Layout from "../components/layout";
import AppLayout from "../components/applayout";
import Seo from "../components/seo";
import "../style/index.scss"
// import { useStaticQuery, graphql } from "gatsby"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { Web3ReactProvider } from "@web3-react/core";

import Wallet from "../components/Wallet/wallet";
import { Web3Provider } from "@ethersproject/providers";
import Factory from "../components/Factory/factory"

const getLibrary = (provider) => {
    const library = new Web3Provider(provider, "any");
    library.pollingInterval = 12000;
    return library;
}
const Interface = () => {
//     const data = useStaticQuery(graphql`
//     query SiteTitleQuery {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)
  library.add(fab)
    return (
        <AppLayout>
            <Seo title="App" />
            <Web3ReactProvider getLibrary={getLibrary}>
                <Factory />
            </Web3ReactProvider>
            {/* <Web3ReactProvider getLibrary={getLibrary}>
                <Wallet />
            </Web3ReactProvider> */}
        </AppLayout>
        
    )
}

export default Interface;