import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import "./style/roadmap.scss"

const RoadMap = () => {
  return (
    <section class="hero is-fullheight is-roadmap">
      <div class="hero-body">
        <div class="columns has-text-centered">
          <div class="column">
          <p class="title is-size-3 is-size-5-mobile">THE ROADMAP</p>
          <p class="subtitle is-size-6 is-size-6-mobile">
            FIND LATEST EVENTS IN OUR ROADMAP
          </p>
          </div>
          <div class="column">
          <StaticImage class="image" src="../../images/roadmap_1250.png" height="100vh"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoadMap
