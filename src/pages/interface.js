import * as React from "react"
import AppLayout from "../components/applayout"
import Seo from "../components/seo"
import "../style/index.scss"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { useWeb3React, Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import Factory from "../components/Factory/factory"
import { AuthProvider } from "../context"
import { useImageForData } from "../hooks/useAllImages"
import { GatsbyImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import WalletSelect from "../components/walletSelect/walletselect"

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
  const [showSelector, setShowSelector] = React.useState(false)

  const { active } = useWeb3React()

  React.useEffect(() => {
    if (active) setShowSelector(true)
  }, [active])

  return (
    <>
      {/* {showSelector ? (
        <div>
          <div className="columns has-text-centered">
            <div className="column">
              <span className="is-size-1">To Begin Connect Your Wallet</span>
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <DashboardSelector
                customClickEvent={() => navigate("/dashboard/")}
              />
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <MakeYourCoinSelector />
            </div>
          </div>
        </div>
      ) : (
        <Factory />
      )} */}
      {active ? <ActiveSelectors /> : <NonActiveSelectors />}
    </>
  )
}

const ActiveSelectors = () => {
  const { active } = useWeb3React()
  const [showSelector, setShowSelector] = React.useState(active)

  return (
    <>
      {showSelector ? (
        <div>
          <div className="columns has-text-centered">
            <div className="column">
              <span className="is-size-1">You can now</span>
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <MakeYourCoinSelector
                customClickEvent={() => setShowSelector(false)}
              />
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <span className="is-size-1">Or</span>
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <DashboardSelector
                customClickEvent={() => navigate("/dashboard/")}
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

const NonActiveSelectors = () => {
  return (
    <div>
      <div className="columns has-text-centered">
        <div className="column">
          <span className="is-size-1">To Begin</span>
        </div>
      </div>
      <div className="columns has-text-centered">
        <div className="column">
          <ConnectWalletSelector />
        </div>
      </div>
      <div className="columns has-text-centered">
        <div className="column">
          <span className="is-size-1">Or</span>
        </div>
      </div>
      <div className="columns has-text-centered">
        <div className="column">
          <ReadAboutCoinMakerSelector />
        </div>
      </div>
    </div>
  )
}

const ReadAboutCoinMakerSelector = () => {
  const cmImage = useImageForData("cm.png")
  return (
    <div className="container interface-view-box" onClick={() => navigate("/")}>
      <div className="columns">
        <div className="column">
          <GatsbyImage image={cmImage} width={2} height={2} />
        </div>
        <div className="column">Read About Coin Maker</div>
      </div>
    </div>
  )
}

const ConnectWalletSelector = () => {
  const [walletSelect, setWalletSelect] = React.useState(false)
  const [cartDisplay, setCartDisplay] = React.useState(false)
  const [cartError, setCartError] = React.useState(false)
  const cwIconImage = useImageForData("cw.png")
  return (
    <>
      <div
        className="container interface-view-box"
        onClick={() => setWalletSelect(true)}
      >
        <div className="columns">
          <div className="column">
            <GatsbyImage image={cwIconImage} width={2} height={2} />
          </div>
          <div className="column">Connect Your Wallet</div>
        </div>
      </div>
      <WalletSelect
        setWalletSelect={setWalletSelect}
        isActive={walletSelect}
        setCartDisplay={setCartDisplay}
        setCartError={setCartError}
      />
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
        <div className="column">View your Dashboard</div>
      </div>
    </div>
  )
}

const MakeYourCoinSelector = ({ customClickEvent }) => {
  const macImage = useImageForData("mac.png")
  return (
    <div className="container interface-view-box" onClick={customClickEvent}>
      <div className="columns">
        <div className="column">
          <GatsbyImage image={macImage} width={2} height={2} />
        </div>
        <div className="column">Make A Coin</div>
      </div>
    </div>
  )
}

export default Interface
