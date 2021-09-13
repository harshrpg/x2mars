import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import { animated, useTransition } from "@react-spring/web"
import "./style/hero.scss"
import "./style/hero.css"
import { useImageForData } from "../../hooks/useAllImages"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import TextTransition, { presets } from "react-text-transition"
const Hero = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "hero.png" }) {
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
              <div className="hero-sub-texts">
              <div className="columns">
                <div
                  className="column left-text-align is-3 is-3-mobile is-narrow-widescreen "
                  style={{padding: 0}}
                >
                  <span className="is-size-1 orange-text">
                    <AnimatedText />
                  </span>
                </div>
                <div className="column has-text-centered-mobile">
                  <span className="is-size-1" style={{whiteSpace: "nowrap"}}>Your Own Economy</span>
                </div>
              </div>
                <div className="columns">
                  <div className="column">
                    <span className="is-size-4">
                      Unleash the power of blockchain to build a strong market
                      position for your business
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
              </div>
            </div>

            <div className="column">
              <GatsbyImage image={heroImage} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const AnimatedText = () => {
  const TEXTS = ["Design", "Market", "Create"]
  const delay = 3000
  const [index, setIndex] = React.useState(0)
  const timeoutRef = React.useRef(null)
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  function clearIndex() {
    setIndex(0)
  }

  React.useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex(prevIndex => (prevIndex === 2 ? 2 : prevIndex + 1)),
      delay
    )
    return () => {
      resetTimeout()
    }
  }, [index])
  return (
    <div className="hero-container">
      <div
        className="hero-main"
        onClick={clearIndex}
        style={{ cursor: "pointer" }}
      >
        <TextTransition text={TEXTS[index]} springConfig={presets.molasses} />
      </div>
    </div>
  )
}

export default Hero
