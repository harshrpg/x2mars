import * as React from "react"
import AppLayout from "../components/applayout"
import Seo from "../components/seo"
import "../style/index.scss"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import Factory from "../components/Factory/factory"
import { AuthProvider } from "../context"
import { useImageForData } from "../hooks/useAllImages"
import { GatsbyImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"

const getLibrary = provider => {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 12000
  return library
}
const Interface = () => {
  library.add(fab)
  return (
    <AuthProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppLayout>
          <Seo title="App" />
          {/* <Factory /> */}
          <InterfaceSelector />
        </AppLayout>
      </Web3ReactProvider>
    </AuthProvider>
  )
}

const InterfaceSelector = () => {
  const [showSelector, setShowSelector] = React.useState(true)

  return (
    <>
      {showSelector ? (
        <div>
          <div className="columns has-text-centered">
            <div className="column">
              <DashboardSelector
                customClickEvent={() => navigate("/dashboard/")}
              />
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <MakeYourCoinSelector
                customClickEvent={() => setShowSelector(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        <Factory />
      )}
    </>
  )
}

const DashboardSelector = ({ customClickEvent }) => {
  const dbIconImage = useImageForData("db_icon.png")
  return (
    <div className="container interface-view-box" onClick={customClickEvent}>
      <div className="columns">
        <div className="column">
          <GatsbyImage image={dbIconImage} width={2} height={2} />
        </div>
        <div className="column">Go To Dashboard</div>
      </div>
    </div>
  )
}

const MakeYourCoinSelector = ({ customClickEvent }) => {
  const ccIconImage = useImageForData("cc_icon.png")
  return (
    <div className="container interface-view-box" onClick={customClickEvent}>
      <div className="columns">
        <div className="column">
          <GatsbyImage image={ccIconImage} width={2} height={2} />
        </div>
        <div className="column">Make A Coin</div>
      </div>
    </div>
  )
}

export default Interface
