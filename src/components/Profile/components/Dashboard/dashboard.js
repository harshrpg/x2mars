import * as React from "react"
import "./style.scss"
const Dashboard = () => {
  return (
    <div className="has-text-centered">
      <div id="title">
        <span className="is-size-1">Dashboard</span>
      </div>
      <DashboardContent />
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
        <div className="column">
          <NumberOfHoldersView />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TotalCirculatingSupply />
        </div>
        <div className="column">
          <LargestCoinPrice />
        </div>
      </div>
    </div>
  )
}

const NumberOfCoinsView = () => {
  return (
    <div className="container dashboard-view-box">
      <div className="columns">
        <div className="column">
          <div className="is-size-1">
            <span>3</span>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="is-size-4">
            <span>Coins Owned</span>
          </div>
        </div>
      </div>
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
