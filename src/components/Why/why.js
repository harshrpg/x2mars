import * as React from "react"
import { useImageForData } from "../../hooks/useAllImages"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import "./style/style.scss"
const Why = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "wu.png" }) {
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
    <section className="hero is-halfheight custom-hero">
      <div class="hero-body">
        <div class="container">
          <div className="columns">
            <div className="column">
              <GatsbyImage image={heroImage} />
            </div>

            <div className="column">
              <div className="columns">
                <div className="column">
                  <span className="is-size-2">
                    Why use <span className="orange-text">Create ?</span>
                  </span>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <span className="is-size-5">
                    Create uses world's first <span className="orange-text">Form Based</span> decentralized autonoumous coin making system deployed on
                    both Ethereum and Binance Smart Chain. We call it the{" "}
                    <Link to="/">
                      <span className="orange-text">
                        Decentralized Autonomous Crypto Maker
                      </span>
                    </Link>{" "}
                  </span>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <span className="is-size-3">What are its benefits ?</span>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="columns">
                    <div className="column is-1">
                      <HiArrowNarrowRight />
                      {` `}
                    </div>
                    <div className="column is-7">
                      <span className="is-size-6">
                        Anyone can make their currency. No development needed. A Simple Form Based UI
                      </span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-1">
                      <HiArrowNarrowRight />
                      {` `}
                    </div>
                    <div className="column is-7">
                      <span className="is-size-6">
                        You are always in control. DAC allows you to create your
                        own currency and maintain it using a custom dashboard. You can create as many you like
                      </span>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-1">
                      <HiArrowNarrowRight />
                      {` `}
                    </div>
                    <div className="column is-7">
                      <span className="is-size-6">
                        Super fast and cheap. Get your currency in your wallet in 5 minutes with fees as low as 2 ETH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why
