import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

import "./style/hero.scss"
import "./style/hero.css"
import { useImageForData } from "../../hooks/useAllImages"

const Hero = () => {
  // const { backgroundImage123 } = useStaticQuery(
  //   graphql`
  //   query {
  //     backgroundImage123: file(relativePath: { eq: "Hero2.png" }) {
  //       childImageSharp {
  //         gatsbyImageData(
  //           width: 1024
  //           quality: 100
  //           webpOptions: { quality: 100 }
  //         )
  //       }
  //     }
  //     backgroundImage123_mobile: file(relativePath: { eq: "Hero2.png" }) {
  //       childImageSharp {
  //         gatsbyImageData(
  //           width: 320
  //           height: 320
  //           quality: 100
  //           webpOptions: { quality: 100 }
  //         )
  //       }
  //     }
  //   }
  //   `
  // )

  const pluginImage = useImageForData("hero.png")
  return (
    <section className="section">
      <div className="hero">
      <div className="centered has-text-left">
            <div className="columns">
              <div className="column">
                <div id="hero-banner-text-title">
                  <span className="is-size-1 is-size-3-mobile">
                    World's 1st Decentralized
                    <br /> Token Factory
                  </span>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-6-mobile">
                  The only protocol designed to build more protocols. <br />
                  X2Mars is a token factory protocol allowing anyone without
                  technical knowledge to build and deploy their crypto currency
                  on Binance Smart Chain.
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <button className="button custom-button">WHITEPAPER</button>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Hero
