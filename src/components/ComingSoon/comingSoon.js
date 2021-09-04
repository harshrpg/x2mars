import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import { useImageForData } from "../../hooks/useAllImages"

const ComingSoon = () => {
  const comingSoonImage = useImageForData("cs.png")
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-size-1">
          <GatsbyImage image={comingSoonImage} width={100} height={100} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span className="is-size-3">Stay tuned</span>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon