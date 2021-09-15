import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import "./style/style.scss"
const Discover = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "Worth.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1800
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
    <>
      <section className="hero is-small is-info hero-page">
        <div class="hero-body">
          <div className="columns">
            <div className="column">
              <GatsbyImage image={heroImage} />
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <span className="is-size-1">
                    <span className="orange-text">Discover</span> your worth
                  </span>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <span className="is-size-4">
                    Quantify your relationship with your community
                  </span>
                </div>
              </div>
              {/* <div className="columns">
                  <div className="column is-1" style={{ width: "auto" }}>
                    <HiArrowNarrowRight />
                    {` `}
                  </div>
                  <div className="column">
                    <span className="is-size-6 is-size-6-mobile">
                      Build your Crypto Currency on multiple blockchain
                      platforms
                    </span>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-1" style={{ width: "auto" }}>
                    <HiArrowNarrowRight />
                    {` `}
                  </div>
                  <div className="column">
                    <span className="is-size-6 is-size-6-mobile">
                      Select between Governance DAO Coins or more advanced Fee
                      on Transfer based crypto coins
                    </span>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-1" style={{ width: "auto" }}>
                    <HiArrowNarrowRight />
                    {` `}
                  </div>
                  <div className="column">
                    <span className="is-size-6 is-size-6-mobile">
                      Use the first{" "}
                      <Link to="/whitepaper">
                        <span className="orange-text">
                          Decentralized Autonomous Crypto Maker
                        </span>
                      </Link>{" "}
                      to make your currency
                    </span>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-1" style={{ width: "auto" }}>
                    <HiArrowNarrowRight />
                    {` `}
                  </div>
                  <div className="column">
                    <span className="is-size-6 hero-text-background">
                      Use your crypto currency to build a stronger & a larger
                      community using the power of decentralization
                    </span>
                  </div>
                </div>
               */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Discover
