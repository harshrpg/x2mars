import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

import "./style/features.scss"

const Features = () => {
  return (
    <section class="section is-medium is-fullheight">
      <span class="floater">
        <StaticImage class="image" src="../../images/feat.png" />
      </span>
      <section class="hero is-medium is-feat">
        <div class="hero-body has-text-centered">
          <p class="title is-size-3 is-size-5-mobile">THE TOKEN FACTORY</p>
          <p class="subtitle is-size-6 is-size-6-mobile">
            BUILD YOUR NEXT FOT TOKEN WITH EASE
          </p>
          <p>
            Create, Build and Deploy your own Fee-On-Transfer <br /> tokens from our
            wide range of token types using just a simple form
          </p>
        </div>
      </section>
    </section>
  )
}

export default Features
