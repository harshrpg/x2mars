import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { navigate } from "gatsby-link"
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import "./style/hero.scss"
import "./style/hero.css"
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
                <div className="columns" style={{paddingBottom: "2rem"}}>
                  <div
                    className="column left-text-align is-3 is-3-mobile is-narrow-widescreen "
                    style={{ padding: 0 }}
                  >
                    <span className="is-size-1 orange-text">
                      <AnimatedText />
                    </span>
                  </div>
                  <div className="column has-text-centered-mobile">
                    <span
                      className="is-size-1"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Your Own Economy
                    </span>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <span className="is-size-4">
                      Unleash the power of blockchain to build a strong market
                      position for yourself
                    </span>
                  </div>
                </div>
                <div className="columns is-mobile">
                  <div className="column is-1" style={{ width: "auto" }}>
                    <HiArrowNarrowRight />
                    {` `}
                  </div>
                  <div className="column">
                    <span className="is-size-6 is-size-6-mobile">
                      Extend your community to the decentralized world
                    </span>
                  </div>
                </div>
                <div className="columns is-mobile">
                  <div className="column is-1" style={{ width: "auto" }}>
                    <HiArrowNarrowRight />
                    {` `}
                  </div>
                  <div className="column">
                    <span className="is-size-6 is-size-6-mobile">
                      Incentivize your fans using your crypto currency
                    </span>
                  </div>
                </div>
                <div className="columns is-mobile">
                  <div className="column is-1" style={{ width: "auto" }}>
                    <HiArrowNarrowRight />
                    {` `}
                  </div>
                  <div className="column">
                    <span className="is-size-6 is-size-6-mobile">
                      Discover your worth by quantifying your relationship with
                      your community
                    </span>
                  </div>
                </div>
                <div className="columns is-mobile" style={{paddingTop: "2rem"}}>
                  <div className="column is-half is-offset-one-quarter">
                    <button
                      className="button theme-action-button-gradient-blue padded"
                      type="button"
                      onClick={() => navigate("/interface/")}
                    >
                      <span>Lets Create Your Currency</span>
                      <span class="icon is-size-3">
                        <BsArrowRight />
                      </span>
                    </button>
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
