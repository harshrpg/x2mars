import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const NetworkIcon = ({ network, color }) => {
  return (
    <span className="is-size-5 is-size-7-mobile has-text-centered icon-style" style={!!color ? {color: color} : {}}>
      {network === "eth" ? (
        <FontAwesomeIcon icon={["fab", "ethereum"]} />
      ) : (
        // TODO: Convert to js svg like coinbase and metamask
        <StaticImage src="../../images/assets/bnb.svg" width={30} height={30} />
      )}
    </span>
  )
}

export default NetworkIcon