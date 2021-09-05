import { useWeb3React } from "@web3-react/core"
import * as React from "react"
import {
  NetworkConstants,
  NetworkFromChainId,
} from "../../../../util/Constants"
import NonActiveSelectors from "../../../NonActiveSelector/nonActiveSelector"
import { createClient } from "urql"
import "./style.scss"
import { Link } from "gatsby"

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

const MyCoins = () => {
  const { active, account, chainId } = useWeb3React()
  const [apiUrl, setApiUrl] = React.useState(
    process.env.GATSBY_GRAPH_API_URL_RINKEBY
  )
  const [client, setClient] = React.useState(null)
  const [subgraphResponse, setSubgraphResponse] = React.useState(null)
  const [coins, setCoins] = React.useState([null])
  const [dexPair, setDexPair] = React.useState([null])
  React.useEffect(() => {
    if (chainId === NetworkConstants.RINKEBY) {
      setApiUrl(process.env.GATSBY_GRAPH_API_URL_RINKEBY)
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
      getAllCoinData()
    }
  }, [subgraphResponse, account])

  React.useEffect(() => {
    console.log("COINS: ", coins)
  }, [coins])

  async function fetchData() {
    const response = await client.query(query).toPromise()
    setSubgraphResponse(response)
    console.log("response: ", response)
  }

  function getAllCoinData() {
    const createdCoins = subgraphResponse.data.createdCoins
    const dexPairs = subgraphResponse.data.dexPairs
    const newArray = new Array()
    createdCoins.map(coin => {
      const coinInfo = new Map()
      if (coin.owner.toLowerCase() === account.toLowerCase()) {
        coinInfo["name"] = coin.name
        coinInfo["symbol"] = coin.symbol
        coinInfo["basicSupply"] = coin.basicSupply
        coinInfo["tokenType"] = coin.tokenType
        coinInfo["address"] = coin.coinAddress
        if (coin.isPool) {
          dexPairs.map(dexPairContent => {
            if (dexPairContent.contract === coin.coinAddress) {
              coinInfo["dexAddress"] = dexPairContent.pairAddress
            }
          })
        }
        newArray.push(coinInfo)
      }
    })
    setCoins(newArray)
  }

  return (
    <div className="has-text-centered">
      <div id="title">
        <span className="is-size-1">My Coins</span>
      </div>
      {active ? (
        <MyCoinsContent account={account} chainId={chainId} coins={coins} />
      ) : (
        <NonActiveSelectors />
      )}
    </div>
  )
}

const MyCoinsContent = ({ account, chainId, coins }) => {
  console.log("Coin Data", coins)
  return (
    <>
      {!!coins ? (
        <div className="container is-fluid mycoins-container">
          {coins.map(coin => (
            <div className="columns">
              <div className="column">
                {!!coin ? <Coin coinData={coin} /> : ``}
              </div>
            </div>
          ))}
        </div>
      ) : (
        `No Coins found`
      )}
    </>
  )
}

const Coin = ({ coinData }) => {
  console.log("Coin Data", coinData)
  const { active, chainId } = useWeb3React()
  const [network, setNetwork] = React.useState()
  const [etherscanAddress, setEtherscanAddress] = React.useState(
    "https://etherscan.io/address/"
  )

  const [dexAddress, setDexAddress] = React.useState(
    "https://info.uniswap.org/#/tokens/"
  )

  React.useEffect(() => {
    if (active && !!chainId) {
      setNetwork(NetworkFromChainId[parseInt(chainId)])
    }
  }, [active, chainId])
  React.useEffect(() => {
    if (chainId === NetworkConstants.RINKEBY) {
      setEtherscanAddress("https://rinkeby.etherscan.io/address/")
    }
  }, [chainId])
  return (
    <div className="container coin-view-box">
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-3">{coinData.symbol}</span>
            </div>
          </div>
          {/* <div className="columns">
            <div className="column">
              <span className="is-size-7">{coinData.Name}</span>
            </div>
          </div> */}
          <div className="columns">
            <div className="column">
              <span className="is-size-7">
                {coinData.tokenType.charAt(0).toUpperCase() +
                  coinData.tokenType.slice(1) +
                  ` Coin`}
              </span>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-3">{coinData.name}</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <span className="is-size-7">Name</span>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-3">{coinData.basicSupply}</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <span className="is-size-7">Supply</span>
            </div>
          </div>
        </div>
        {coinData.isPool ? (
          <div className="column">
            <div className="columns">
              <div className="column">
                <span className="is-size-3">{coinData.dexAddress}</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-7">View on your dex</span>
              </div>
            </div>
          </div>
        ) : (
          ``
        )}

        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-6">
                <Link
                  to={etherscanAddress + `` + coinData.address}
                  target="_blank"
                >
                  View on Etherscan
                </Link>
              </span>
            </div>
          </div>
          {network === "eth" ? (
            <div className="columns">
              <div className="column">
                <span className="is-size-6">
                  <Link
                    to={dexAddress + `` + coinData.address}
                    target="_blank"
                  >
                    View on Dex
                  </Link>
                </span>
              </div>
            </div>
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  )
}

export default MyCoins
