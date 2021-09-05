import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import "../../style/style.scss"
const Hero = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "aboutDac.png" }) {
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
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <div className="columns">
                <div className="column">
                  <span className="is-size-1">
                    Decantralized Autonomous Coin Maker
                  </span>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <span className="is-size-5">
                    The easiest way to make your currency
                  </span>
                </div>
              </div>

              <div className="columns">
                <div className="column has-text-centered">
                  <div className="note">
                    <span className="is-size-6">
                      This page is a Work In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-8">
              <GatsbyImage image={heroImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
