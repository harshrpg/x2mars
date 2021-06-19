import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import "./style/slideshow.scss"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const colors = [
  "../../images/slide1.png",
  "../../images/slide2.png",
  "../../images/slide3.png",
]
const delay = 4500

const SlideShow = () => {
  const data = useStaticQuery(
    graphql`
      query {
        image1: file(relativePath: { eq: "slide1_fin.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
        image2: file(relativePath: { eq: "slide2_fin.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
        image3: file(relativePath: { eq: "slide3_fin.png" }) {
          childImageSharp {
            gatsbyImageData(width: 640, quality: 100, aspectRatio: 1.33)
          }
        }
      }
    `
  )
  console.log(getImage(data.image1))
  console.log(data)
  var images = [data.image1, data.image2, data.image3]
  console.log(images.length)
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
    <div class="slideshow">
      <div
        class="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <GatsbyImage
            class="slide slide-image"
            key={index}
            image={getImage(image)}
          />
        ))}
      </div>

      <div class="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            class={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx)
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default SlideShow
