import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import "../../style/style.scss"
import { useImageForData } from "../../../../hooks/useAllImages"
import { Steps } from "../../../../util/factory-steps"
const Explain = () => {
  return (
    <div className="container">
      <Overview />
      <WalletConnector />
      <BlockchainSelector />
      <SmartContracts />
      <UserInputForm />
      <Subgraph />
      <Dashboard />
    </div>
  )
}

const Overview = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "dfe.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1300
              quality: 100
              webpOptions: { quality: 100 }
            )
          }
        }
      }
    `
  )

  const heroImage = getImage(backgroundImage123)
  return (
    <div className="columns">
      <div className="column">
        <GatsbyImage image={heroImage} />
      </div>
      <div className="column">
        <div className="columns">
          <div className="column">
            <span className="is-size-3">Overview</span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-6">
              DAC has multiple components carefully interconnected with each
              other to provide the best experiences to anyone who is looking to
              build their own crypto currency.{" "}
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-6">Components:</span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column is-1">
                <HiArrowNarrowRight />
              </div>
              <div className="column">Wallet Connector</div>
            </div>
            <div className="columns">
              <div className="column is-1">
                <HiArrowNarrowRight />
              </div>
              <div className="column">Blockchain Selector</div>
            </div>
            <div className="columns">
              <div className="column is-1">
                <HiArrowNarrowRight />
              </div>
              <div className="column">Smart Contracts</div>
            </div>
            <div className="columns">
              <div className="column is-1">
                <HiArrowNarrowRight />
              </div>
              <div className="column">User Input Form</div>
            </div>
            <div className="columns">
              <div className="column is-1">
                <HiArrowNarrowRight />
              </div>
              <div className="column">Subgraph Blockchain Indexer</div>
            </div>
            <div className="columns">
              <div className="column is-1">
                <HiArrowNarrowRight />
              </div>
              <div className="column">Dashboard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WalletConnector = () => {
  const image = useImageForData("WalletConnector.png")
  return (
    <div className="container">
      <div className="title">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage image={image} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-size-3">Wallet Connector</div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">
            This is the entry point for the system. By connecting a digital
            wallet, DAC identifies the blockchain network and accordingly
            switches to the respective network. It is also possible to use the
            app on a test network.
          </span>
        </div>
      </div>
    </div>
  )
}

const BlockchainSelector = () => {
  const image = useImageForData("BlockchainSelector.png")
  return (
    <div className="container">
      <div className="title">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage image={image} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-size-3">Blockchain Selector</div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">
            Once a wallet is connected, this component switches the app the
            blockchain network supported by the wallet
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="note">
            Currently only Ethereum and Binance Smart Chain is supported
          </div>
        </div>
      </div>
    </div>
  )
}

const SmartContracts = () => {
  const image = useImageForData("SmartContracts.png")
  return (
    <div className="container">
      <div className="title">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage image={image} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-size-3">Smart Contracts</div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">
            This the brain of the entire system. DAC uses factory pattern to
            clone templates of coins depending on the choices made by the user
            on the User Input Form. These smart contracts have been deployed on
            Ethereum Mainnet, Rinkeby and Ropsten so DAC can be also used in
            these test networks.
          </span>
        </div>
      </div>
    </div>
  )
}

const UserInputForm = () => {
  const image = useImageForData("UnerInputForm.png")
  const gTokenImage = useImageForData(Steps.Step1.cardData[0].img)
  const fotTokenImage = useImageForData(Steps.Step1.cardData[1].img)
  return (
    <div className="container">
      <div className="title">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage image={image} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-size-3">User Input Form</div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">
            Building the coin is as simple as a 3 step procedure. By filling a
            simple Input Form, the primary interface of DAC, anyone can create
            their own crypto currency. Currently DAC supports creating two types
            of coins. Form requires some additional inputs for Fee On Transfer
            coins.
            <div className="container columns">
              <div className="column">
                <div className="columns">
                  <div className="column is-1">
                    <GatsbyImage image={gTokenImage} />
                  </div>
                  <div className="column">Governance DAO coins</div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">Token Name</div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">Token Symbol</div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">Token Supply</div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">
                    An Optional input if Dex Pool is needed with the coin
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-1">
                    <GatsbyImage image={fotTokenImage} />
                  </div>
                  <div className="column">Fee On Transfer (Meme) coins</div>
                </div>
                <div className="columns">
                  <div className="column">
                    Along with Governance DAO coins options, this coin provides
                    more features that can be added to the contract
                  </div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">Automatic Liquidation</div>
                </div>
                <div className="columns" style={{ marginLeft: "2rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">
                    Fee charged per transaction is deposited back to the DEX pool
                    created. This ensures a stable liquidity supply to the
                    market
                  </div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">Whale Protection</div>
                </div>
                <div className="columns" style={{ marginLeft: "2rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">
                    If this feature is selected, a hard limit of 0.5% of the
                    total supply is imposed on any transaction that can be
                    performed for the coin. This makes sure that whales do not
                    manipulate the market.
                  </div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">RFI Static Rewards</div>
                </div>
                <div className="columns" style={{ marginLeft: "2rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">
                    Fee charged per transaction is divided and rewarded back to
                    the holders
                  </div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">Automatic Burn</div>
                </div>
                <div className="columns" style={{ marginLeft: "2rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">
                    Fee charged per transaction is completely burned. Transfered
                    to the 'DEAD' burn address
                  </div>
                </div>
                <div className="columns" style={{ marginLeft: "1rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">Automatic Charity Donation</div>
                </div>
                <div className="columns" style={{ marginLeft: "2rem" }}>
                  <div className="column is-1">
                    <HiArrowNarrowRight />
                  </div>
                  <div className="column">
                    Fee charged per transaction is donated to charity. The
                    wallet address for the charity is also needed.
                  </div>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

const Subgraph = () => {
  const image = useImageForData("SubgraphEventIndexer.png")
  return (
    <div className="container">
      <div className="title">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage image={image} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-size-3">Subgraph Event Indexer</div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">
            Subgraph Event Indexer, indexes all the events generated by the
            smart contracts while a user creates their currency. The data
            retrieved is used to display on the Dashboard.
          </span>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
    const image = useImageForData("DashboardAbout.png")
  return (
    <div className="container">
      <div className="title">
        <div className="columns">
          <div className="column is-2">
            <GatsbyImage image={image} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-size-3">Dashboard</div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-5">
            A place where the user can view their contracts and interact with them.
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="note">
            This component is currently a work in progress
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explain
