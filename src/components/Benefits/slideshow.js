import * as React from "react"
import "./style/slideshow.scss"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const delay = 4500
const imageContent = [
    "Currency tailored to your needs",
    "Use decentralization to grow your community",
    "Crypto Incentives for your customers",
    "Stand out amongst your competition",
  ]

const SlideShow = () => {
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
        image4: file(relativePath: { eq: "stdout.png" }) {
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
    </div>
  )
}

export default SlideShow
