import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight"
import "./style/slideshow.scss"
const delay = 6000
const imageContent = [
  "Your currency signifies you and your business",
  "Open your business to a bigger world of decentralized community",
  "Easy monitization of your customer's support and fanbase",
  "Stand out amongst your competition",
]

const Benefits = () => {
  const data = useStaticQuery(
    graphql`
      query {
        image1: file(relativePath: { eq: "tailCur.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
        image2: file(relativePath: { eq: "grwCom.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
        image3: file(relativePath: { eq: "incentive.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
        image4: file(relativePath: { eq: "stdOut.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
      }
    `
  )
  var images = [data.image1, data.image2, data.image3, data.image4]
  const [index, setIndex] = React.useState(0)
  const timeoutRef = React.useRef(null)
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  React.useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex(prevIndex => (prevIndex === 3 ? 0 : prevIndex + 1)),
      delay
    )

    return () => {
      resetTimeout()
    }
  }, [index])
  return (
    <section className="hero is-halfheight custom-hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-4-fullhd">
                <div className="column">
                  <div className="slideshow">
                    <div
                      className="slideshowSlider"
                      style={{
                        transform: `translate3d(${-index * 100}%, 0, 0)`,
                      }}
                    >
                      {images.map((image, index) => (
                        <GatsbyImage
                          className="slide slide-image"
                          key={index}
                          image={getImage(image)}
                        />
                      ))}
                    </div>

                    <div className="slideshowDots">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`slideshowDot${
                            index === idx ? " active" : ""
                          }`}
                          onClick={() => {
                            setIndex(idx)
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="columns is-mobile">
                <div className="column">
                  <span className="is-size-2 hero-body-resize">
                    Why you should have your currency?
                  </span>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="is-size-6 hero-body-resize">
                    <ul>
                      {imageContent.map((content, idx) => (
                        <li
                          className={`explainer subtitle is-size-5-desktop is-size-5-fullhd is-size-5-widescreen is-size-6-tablet is-size-6-mobile${
                            index === idx ? " is-explainer-active" : ""
                          }`}
                        >
                          <div
                            className="columns is-mobile"
                            onClick={() => setIndex(idx)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="column is-1">
                              <HiArrowNarrowRight />
                            </div>
                            <div className="column">{content}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
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

export default Benefits
