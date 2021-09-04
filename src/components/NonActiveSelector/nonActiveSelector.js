import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import "./style/style.scss"
import { useImageForData } from "../../hooks/useAllImages"
import WalletSelect from "../walletSelect/walletselect"
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

  export default NonActiveSelectors;