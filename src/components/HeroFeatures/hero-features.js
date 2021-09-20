import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import { useImageForData } from "../../hooks/useAllImages"
import "./style/style.scss"
const HeroFeatures = () => {
  return (
    <>
      <section className="hero is-small is-info hero-page ">
        <div className="hero-body ">
          <span className="is-size-2">
            Benefits of using <span className="orange-text">Create</span>
          </span>
          <div className="container">
            <HeroSelectCoinTypeFeatures />
            <HeroSelectFeatures />
            <HeroDashboardFeatures />
          </div>
        </div>
      </section>
    </>
  )
}

const HeroSelectCoinTypeFeatures = () => {
  const step1Image = useImageForData("tailCur.png")
  const fotImage = useImageForData("fot.png")
  return (
    <>
      <section className="hero is-small is-info hero-page">
        <div className="hero-body">
          <span className="is-size-3">
            Select between two types of coins
          </span>
          <div
            className="columns is-mobile"
            style={{ alignItems: "flex-start" }}
          >
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Governance (DAO) Coins
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          Make your project truly decentralized. This coin
                          powers your users to gain more control of the services
                          you provide to them, making your business truly
                          customer focussed.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={step1Image}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Fee On Transfer (Meme) Coins
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          Charge Fee whenever your coin exchanges hands, but use that fee for exciting features.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={fotImage}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const HeroSelectFeatures = () => {
  const step1Image = useImageForData("MultiDex.png")
  const rfiImage = useImageForData("rfi.png")
  const awpImage = useImageForData("awp.png")
  const abImage = useImageForData("ab.png")
  const acImage = useImageForData("ac.png")
  return (
    <>
      <section className="hero is-small is-info hero-page">
        <div className="hero-body">
          <span className="is-size-3">
            Select Exciting features for your coins
          </span>
          <div
            className="columns is-mobile"
            style={{ alignItems: "flex-start" }}
          >
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Decentralized Exchange Pool
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          {/* Select if you need a Decentralized Exchange Pool for
                          your coin. Here you can allow your customers to easily
                          swap and exchange ETH (on Ethereum) or BNB (on Binance
                          Smart Chain) for your coin very easily straight from
                          their wallet. */}
                          Swap your coin with ETH or BNB directly from their
                          wallets.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={step1Image}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Automatic Liquidation
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          {/* Don't let your coin run out of supply. The fee you
                          charge is added back to Decentralized Exchange you
                          created. This ensures a free market always for your
                          customers to exchange their coins. */}
                          Maintain a constant supply in your Decentralized
                          Exchange
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={step1Image}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="columns is-mobile"
            style={{ alignItems: "flex-start" }}
          >
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          RFI Static Rewards
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          {/* Loyalty must be rewarded. This feature does exactly
                          that. Every holder of your coin gets rewarded with
                          your token whenever a fee is charged. This ensures
                          that your customers will hold your coins for longer to
                          grow their rewards. */}
                          Redirect the fees directly to your customers growing
                          the quantity of your coins in their wallets, ensuring
                          loyalty.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={rfiImage}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Whale Protection
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          {/* Whales can manipulate value by buying and selling
                          large amounts of coins at once. Protect your coins
                          from whales. Discourage any whale to manipulate your
                          coin's value. This feature ensures a steady buy and
                          sell price for your coin and a loyal and long lasting
                          customer base for you. */}
                          Discourage major coin value manipulation by whales.
                          This feature ensures security of assets.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={awpImage}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="columns is-mobile"
            style={{ alignItems: "flex-start" }}
          >
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Automatic Fee Burn
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          {/* Everytime the coin burns, its supply decreases; and
                          with demand its price increases. This creates
                          excitement amongst your users. */}
                          Increase the value of your coin by burning the fee
                          away. This feature ensures growth.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={abImage}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="hero-theme-view-box-none">
                <div className="columns" style={{ paddingLeft: "2rem" }}>
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span
                          className="is-size-4"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Automatic Charity Donation
                        </span>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-7">
                          {/* Show to your customers that you care for a noble
                          cause. By selecting this feature you automatically
                          send a small amount of fee to the charity of your
                          choice. This ensures a strong customer base. */}
                          Donate the fee towards a good cause, ensuring trust
                          and generosity towards your customers.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <GatsbyImage
                      image={acImage}
                      alt={"token type"}
                      width={2}
                      height={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const HeroDashboardFeatures = () => {
    const step1Image = useImageForData("DashboardAbout_Reflect.png")
    return (
      <>
        <section className="hero is-small is-info hero-page">
          <div className="hero-body">
            <span className="is-size-3">
              Interact with your coin through your own Dashboard
            </span>
            <div
              className="columns is-mobile"
              style={{ alignItems: "flex-start" }}
            >
              <div className="column">
                <div className="hero-theme-view-box-none">
                  <div className="columns" style={{ paddingLeft: "2rem" }}>
                    <div className="column">
                      <div className="columns">
                        <div className="column">
                          <span
                            className="is-size-3"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Dashboard
                          </span>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <span className="is-size-7">
                            View your coin details and interact with it, like adding or removing features to your coin.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <GatsbyImage
                        image={step1Image}
                        alt={"token type"}
                        width={2}
                        height={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
export default HeroFeatures
