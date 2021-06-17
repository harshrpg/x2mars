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
        backgroundImage123: file(relativePath: { eq: "hero.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 2000
              quality: 50
              webpOptions: { quality: 70 }
            )
          }
        }
      }
    `
  )

  const pluginImage = getImage(backgroundImage123)
  return (
    <section class="section">
      <div class="container hero-banner is-max-desktop has-text-centered ">
        <div id="hero-banner-text-title">
          <span class="is-size-1 is-size-3-mobile">
            World's 1st Token Factory
          </span>
        </div>
        <div id="hero-banner-text-subtitle" class=" has-text-centered">
          <div class="columns is-gapless">
            <div class="column ">
              <span class="is-size-6">
                The only protocol designed to build more protocols. Join the
                conversation.
              </span>
            </div>
            <div class="column is-one-fifth has-text-left">
              <button class="button is-light">Join Telegram</button>
            </div>
          </div>
        </div>
      </div>
      <div class="container is-fluid float-image">
        <BgImage image={pluginImage} className="hero-image">
          <div class="centered has-text-centered">
            <div class="columns">
              <div class="column">
                <span class="is-size-4">MISSION MARS</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="is-size-6">
                  X2Mars is a new token factory protocol allowing anyone to make
                  their FOT crypto currency and launch it on Binance Smart
                  Chain.
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
