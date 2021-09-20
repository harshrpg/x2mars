import { useWeb3React } from "@web3-react/core"
import * as React from "react"
import NonActiveSelectors from "../../../NonActiveSelector/nonActiveSelector"
import { createClient } from "urql"

import "./style.scss"
import { _fetchData } from "@ethersproject/web"
import {
  NetworkConstants,
  NetworkFromChainId,
} from "../../../../util/Constants"

const query = `
        query {
        createdCoins {
            id,
            coinAddress,
            name,
            symbol,
            basicSupply,
            isPool,
            tokenType,
            owner
        }
        dexPairs {
            id,
            pairAddress
        }
        }`
const Dashboard = () => {
  const { active, account } = useWeb3React()
  return (
    <div className="has-text-centered">
      <div id="title">
        <span className="is-size-1">Dashboard</span>
      </div>
      {active ? <DashboardContent /> : <NonActiveSelectors />}
    </div>
  )
}

const DashboardContent = () => {
  return (
    <div className="container is-fluid">
      <div className="columns">
        <div className="column">
          <NumberOfCoinsView />
        </div>
        {/* <div className="column">
          <NumberOfHoldersView />
        </div> */}
      </div>
      {/* <div className="columns">
        <div className="column">
          <TotalCirculatingSupply />
        </div>
        <div className="column">
          <LargestCoinPrice />
        </div>
      </div> */}
    </div>
  )
}

const NumberOfCoinsView = () => {
  const { account, chainId } = useWeb3React()
  const [apiUrl, setApiUrl] = React.useState(
    process.env.GATSBY_GRAPH_API_URL_RINKEBY
  )
  const [client, setClient] = React.useState(null)
  const [subgraphResponse, setSubgraphResponse] = React.useState(null)
  const [coinsOwned, setCoinsOwned] = React.useState(0)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    switch (chainId) {
      case NetworkConstants.RINKEBY:
        setApiUrl(process.env.GATSBY_GRAPH_API_URL_RINKEBY)
        setError(null)
        break
      case NetworkConstants.ROPSTEN:
        setApiUrl(process.env.GATSBY_GRAPH_API_URL_ROPSTEN)
        setError(null)
        break
      case NetworkConstants.GOERLI:
        setApiUrl(process.env.GATSBY_GRAPH_API_URL_GOERLI)
        setError(null)
        break
      case NetworkConstants.SMART_CHAIN_TESTNET:
        setApiUrl(process.env.GATSBY_GRAPH_API_URL_CHAPEL)
        setError(null)
        break
      case NetworkConstants.SMART_CHAIN_MAINNET:
        setApiUrl(process.env.GATSBY_GRAPH_API_URL_BSC)
        setError(null)
        break
      case NetworkConstants.MAINNET_ETHEREUM:
        setApiUrl(process.env.GATSBY_GRAPH_API_URL_ETH)
        setError(null)
        break
      default:
        setError("Network Not supported")
        break
    }
  }, [chainId])

  React.useEffect(() => {
    if (!!apiUrl) {
      setClient(
        createClient({
          url: apiUrl,
        })
      )
    }
  }, [apiUrl])

  React.useEffect(() => {
    if (!!client) {
      fetchData()
    }
  }, [client])

  React.useEffect(() => {
    if (!!subgraphResponse && !!account) {
      console.log("From subgraph: ",subgraphResponse)
      calculateNumberOfCoinsOwned()
    }
  }, [subgraphResponse, account])

  async function fetchData() {
    const response = await client.query(query).toPromise()
    setSubgraphResponse(response)
    console.log("response: ", response)
  }

  function calculateNumberOfCoinsOwned() {
    var numberOfCoins = 0
    console.log("From subgraph api", apiUrl)
    const createdCoins = subgraphResponse.data.createdCoins
    createdCoins.map(coin => {
      if (coin.owner.toLowerCase() === account.toLowerCase()) {
        numberOfCoins++
      }
    })
    setCoinsOwned(numberOfCoins)
  }
  return (
    <div className="container dashboard-view-box">
      {error ? (
        <>
          <div className="columns">
            <div className="column">
              <span className="is-size-3">This network is not supported</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="columns">
            <div className="column">
              <span className="is-size-3">You Own</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="is-size-1">
                <span>{coinsOwned}</span>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="is-size-4">
                <span>Coins</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const NumberOfHoldersView = () => {
  //   const [holders, setHolders] = React.useState("18 Billions")
  //   const [coinActive, setCoinActive] = React.useState(0)

  //   React.useEffect(() => {
  //     if (coinActive === 0) {
  //       setHolders("151,768")
  //     } else if (coinActive === 1) {
  //       setHolders("98,266")
  //     } else if (coinActive === 2) {
  //       setHolders("13,900")
  //     }
  //   }, [coinActive])
  return (
    <div className="container dashboard-view-box">
      {/* <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column">
              <button
                className={`button is-normal custom-button dashboard-coin-selector ${
                  coinActive === 0 ? "active" : ""
                }`}
                onClick={() => setCoinActive(0)}
              >
                Coin 1
              </button>
            </div>
            <div className="column">
              <button
                className={`button is-normal custom-button dashboard-coin-selector ${
                  coinActive === 1 ? "active" : ""
                }`}
                onClick={() => setCoinActive(1)}
              >
                Coin 2
              </button>
            </div>
            <div className="column">
              <button
                className={`button is-normal custom-button dashboard-coin-selector ${
                  coinActive === 2 ? "active" : ""
                }`}
                onClick={() => setCoinActive(2)}
              >
                Coin 3
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="columns">
        <div className="column">
          <div className="is-size-1">
            <span>151,768</span>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="is-size-4">
            <span>Holders</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const TotalCirculatingSupply = () => {
  //   const [supply, setSupply] = React.useState("18 Billions")
  //   const [coinActive, setCoinActive] = React.useState(0)

  //   React.useEffect(() => {
  //     if (coinActive === 0) {
  //       setSupply("18 Billions")
  //     } else if (coinActive === 1) {
  //       setSupply("123 Millions")
  //     } else if (coinActive === 2) {
  //       setSupply("136,900")
  //     }
  //   }, [coinActive])
  return (
    <div className="container dashboard-view-box">
      {/* <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column">
              <button
                className={`button is-normal custom-button dashboard-coin-selector ${
                  coinActive === 0 ? "active" : ""
                }`}
                onClick={() => setCoinActive(0)}
              >
                Coin 1
              </button>
            </div>
            <div className="column">
              <button
                className={`button is-normal custom-button dashboard-coin-selector ${
                  coinActive === 1 ? "active" : ""
                }`}
                onClick={() => setCoinActive(1)}
              >
                Coin 2
              </button>
            </div>
            <div className="column">
              <button
                className={`button is-normal custom-button dashboard-coin-selector ${
                  coinActive === 2 ? "active" : ""
                }`}
                onClick={() => setCoinActive(2)}
              >
                Coin 3
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="columns">
        <div className="column">
          <div className="is-size-1">
            <span>18 Billions</span>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="is-size-4">
            <span>Highest Circulating Supply</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const LargestCoinPrice = () => {
  //   const [supply, setSupply] = React.useState("18 Billions")
  //   const [coinActive, setCoinActive] = React.useState(0)

  //   React.useEffect(() => {
  //     if (coinActive === 0) {
  //       setSupply("18 Billions")
  //     } else if (coinActive === 1) {
  //       setSupply("123 Millions")
  //     } else if (coinActive === 2) {
  //       setSupply("136,900")
  //     }
  //   }, [coinActive])
  return (
    <div className="container dashboard-view-box">
      {/* <div className="columns">
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button
                    className={`button is-normal custom-button dashboard-coin-selector ${
                      coinActive === 0 ? "active" : ""
                    }`}
                    onClick={() => setCoinActive(0)}
                  >
                    Coin 1
                  </button>
                </div>
                <div className="column">
                  <button
                    className={`button is-normal custom-button dashboard-coin-selector ${
                      coinActive === 1 ? "active" : ""
                    }`}
                    onClick={() => setCoinActive(1)}
                  >
                    Coin 2
                  </button>
                </div>
                <div className="column">
                  <button
                    className={`button is-normal custom-button dashboard-coin-selector ${
                      coinActive === 2 ? "active" : ""
                    }`}
                    onClick={() => setCoinActive(2)}
                  >
                    Coin 3
                  </button>
                </div>
              </div>
            </div>
          </div> */}
      <div className="columns">
        <div className="column">
          <div className="is-size-1">
            <span>0.64578$</span>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="is-size-4">
            <span>Largest Coin's Price</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
