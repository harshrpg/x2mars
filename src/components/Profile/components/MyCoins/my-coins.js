import * as React from "react"

import "./style.scss"

const MyCoins = () => {
  return (
    <div className="has-text-centered">
      <div id="title">
        <span className="is-size-1">My Coins</span>
      </div>
      <MyCoinsContent />
    </div>
  )
}

const MyCoinsContent = () => {
  const [coinsState, _] = React.useState({
    coin1: {
      Name: "Zapper",
      Symbol: "ZPPR",
      CirculatingSupply: "18 Billions",
      Price: "0.64578$",
      Holders: "151,768",
      Type: "Simple",
    },
    coin2: {
      Name: "Toesta",
      Symbol: "TSTA",
      CirculatingSupply: "13.4 Millions",
      Price: "0.021$",
      Holders: "98,266",
      Type: "Simple",
    },
    coin3: {
      Name: "Kliver",
      Symbol: "KLV",
      CirculatingSupply: "139,562",
      Price: "0.00021$",
      Holders: "13,900",
      Type: "Fancy",
    },
  })
  return (
    <div className="container is-fluid mycoins-container">
      <div className="columns">
        <div className="column">
          {!!coinsState.coin1 ? (
            <Coin coinData={coinsState.coin1} />
          ) : (
            `No Data`
          )}{" "}
        </div>
      </div>
      <div className="columns">
        <div className="column">
          {!!coinsState.coin2 ? (
            <Coin coinData={coinsState.coin2} />
          ) : (
            `No Data`
          )}
        </div>
      </div>
      <div className="columns">
        <div className="column">
          {!!coinsState.coin3 ? (
            <Coin coinData={coinsState.coin3} />
          ) : (
            `No Data`
          )}
        </div>
      </div>
    </div>
  )
}

const Coin = ({ coinData }) => {
  console.debug("MYCOINS: ", coinData)
  return (
    <div className="container coin-view-box">
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-3">{coinData.Symbol}</span>
            </div>
          </div>
          {/* <div className="columns">
            <div className="column">
              <span className="is-size-7">{coinData.Name}</span>
            </div>
          </div> */}
          <div className="columns">
            <div className="column">
              <span className="is-size-7">{coinData.Type + ` Coin`}</span>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-3">{coinData.Price}</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <span className="is-size-7">Price</span>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-3">{coinData.Holders}</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <span className="is-size-7">Holders</span>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-3">{coinData.CirculatingSupply}</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <span className="is-size-7">Cisculating Supply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCoins
