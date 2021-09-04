import * as React from "react"
import { NetworkConstants } from "../util/Constants"
import { createClient } from "urql";

export const useUrqlForSubgraph = network => {
  const APIURL = process.env.GATSBY_GRAPH_API_URL_RINKEBY
  if (network === NetworkConstants.RINKEBY) {
    APIURL = process.env.GATSBY_GRAPH_API_URL_RINKEBY
  }
  const query = `
        query {
        createdCoins {
            id,
            coinAddress,
            name,
            symbol,
            basicSupply,
            isPool,
            tokenType
        }
        dexPairs {
            id,
            pairAddress
        }
        }`

}
