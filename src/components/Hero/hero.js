import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

import "./style/hero.css"
import "./style/hero.scss"

const Hero = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "Hero2.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1024
              quality: 100
              webpOptions: { quality: 100 }
            )
          }
        }
      }
    `
  )

  const pluginImage = getImage(backgroundImage123)
  return (
    <section class="section">
      <div class="hero">
        <BgImage image={pluginImage} className="hero-image">
          <div class="centered has-text-left">
            <div class="columns">
              <div class="column">
                <div id="hero-banner-text-title">
                  <span class="is-size-1 is-size-3-mobile">
                    World's 1st Decentralized
                    <br /> Token Factory
                  </span>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="is-size-6">
                  The only protocol designed to build more protocols. <br />
                  X2Mars is a token factory protocol allowing anyone without
                  technical knowledge to build and deploy their crypto currency
                  on Binance Smart Chain.
                </span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <button class="button custom-button">WHITEPAPER</button>
              </div>
            </div>
          </div>
        </BgImage>
      </div>
    </section>
  )
}

export default Hero
