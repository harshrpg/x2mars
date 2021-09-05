import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const ComingSoon = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "csp.png" }) {
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
    <div className="container">
      <div className="columns">
      <div className="column">
        <div className="columns">
          <div className="column"><span className="is-size-1">Coming Soon</span></div>
        </div>
        <div className="columns">
          <div className="column"><span className="is-size-4">Stay Tuned</span></div>
        </div>
        </div>
        <div className="column is-size-1">
          <GatsbyImage image={heroImage} width={100} height={100} />
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
