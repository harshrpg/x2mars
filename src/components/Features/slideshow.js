import * as React from "react"
import "./style/slideshow.scss"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const delay = 4500
const imageContent = [
  "Fill a simple form to provide token details",
  "Connect your wallet and deploy contract",
  "Grow your business with Create Launchpad",
]

const SlideShow = () => {
  const data = useStaticQuery(
    graphql`
      query {
        image1: file(relativePath: { eq: "slide1_simple.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
        image2: file(relativePath: { eq: "slide2_simple.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
        image3: file(relativePath: { eq: "slide3_simple.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
      }
    `
  )
  var images = [data.image1, data.image2, data.image3]
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
      () => setIndex(prevIndex => (prevIndex === 2 ? 0 : prevIndex + 1)),
      delay
    )

    return () => {
      resetTimeout()
    }
  }, [index])

  return (
    <div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-4-fullhd">
      <div className="column">
        <div className="slideshow">
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
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
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx)
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="column">
        <p className="title is-size-3-desktop is-size-3-fullhd is-size-3-widescreen is-size-4-tablet is-size-4-mobile">Make your token in 3 simple steps</p>

        <div className="content">
          <ul>
            {imageContent.map((content, idx) => (
              <li
                className={`explainer subtitle is-size-5-desktop is-size-5-fullhd is-size-5-widescreen is-size-6-tablet is-size-6-mobile${
                  index === idx ? " is-explainer-active" : ""
                }`}
              >
                {content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SlideShow
