import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"
import { animated, useTransition } from "@react-spring/web"
import "./style/hero.scss"
import "./style/hero.css"
import { useImageForData } from "../../hooks/useAllImages"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"

const Hero = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "hero.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1100
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
          <div className="columns hero-page">
            {/* <div className="column hero-body-texts"> */}
            <div className="column">
              <div className="hero-space">
                <span className="is-size-1">
                  Create Your Own <span className="orange-text">Economy</span>
                </span>
              </div>

              <div className="hero-sub-texts">
                <div className="columns">
                  <div className="column">
                    <div className="columns">
                      <div className="column">
                        <span className="is-size-4">
                          Unleash the power of blockchain to build a strong
                          market position for your business
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="columns">
                      <div className="column is-1" style={{ width: "auto" }}>
                        <HiArrowNarrowRight />
                        {` `}
                      </div>
                      <div className="column">
                        <span className="is-size-6 hero-text-background">
                          Use your custom crypto coins to build a stronger & a
                          larger community using the power of decentralization
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="columns">
                      <div className="column is-1" style={{ width: "auto" }}>
                        <HiArrowNarrowRight />
                        {` `}
                      </div>
                      <div className="column">
                        <span className="is-size-6 is-size-6-mobile">
                          Build your coins on multiple blockchain platforms
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="columns">
                      <div className="column is-1" style={{ width: "auto" }}>
                        <HiArrowNarrowRight />
                        {` `}
                      </div>
                      <div className="column">
                        <span className="is-size-6 is-size-6-mobile">
                          Select between Governance DAO Coins or more advanced Fee
                          based crypto coins
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="columns">
                      <div className="column is-1" style={{ width: "auto" }}>
                        <HiArrowNarrowRight />
                        {` `}
                      </div>
                      <div className="column">
                        <span className="is-size-6 is-size-6-mobile">
                          Use the first{" "}
                          <Link to="/">
                            <span className="orange-text">
                              Decentralized Autonomous Crypto Maker
                            </span>
                          </Link>{" "}
                          to make your currency
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="hero-image">
                <GatsbyImage image={heroImage} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="animated-hero is-size-1">
          <AnimatedText />
        </div> */}
      </section>
    </>
  )
}

const AnimatedText = () => {
  const ref = React.useRef([])
  const [items, setItems] = React.useState([])
  // const transitions = useTransition(items, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  //   delay: 200,
  //   onRest: () => setItems([]),
  // })
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#2f4858",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#28d79f" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      { color: "#c23369" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#2f4858" },
    // onRest: () => setItems([])
  })
  const reset = React.useCallback(() => {
    ref.current.forEach(clearTimeout)
    ref.current = []
    setItems([])
    ref.current.push(setTimeout(() => setItems(["Design"]), 2000))
    ref.current.push(setTimeout(() => setItems(["Control"]), 5000))
    ref.current.push(setTimeout(() => setItems(["Create"]), 8000))
  })
  React.useEffect(() => {
    reset()
    return () => ref.current.forEach(clearTimeout)
  }, [])
  return (
    <div className="hero-container">
      <div className="hero-main">
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div
            className="transitionsItem"
            style={rest}
            onClick={reset}
          >
            <animated.div style={{ overflow: "hidden" }}>{item}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default Hero
