import * as React from "react"
import "./style/timeline.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const Timeline = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "Timeline.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1200
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
    <div className="container has-text-centered">
      <GatsbyImage image={heroImage} />
    </div>
  )
}

export default Timeline
