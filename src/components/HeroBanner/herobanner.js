import * as React from "react"
import "./style/herobanner.scss"
const HeroBanner = props => {
  return (
    <section class="hero is-medium is-feat">
      <div class="hero-body has-text-centered">
        <p class="title is-size-3 is-size-5-mobile">{props.title}</p>
        <p class="subtitle is-size-6 is-size-6-mobile">{props.subtitle}</p>
        <p>{props.body}</p>
      </div>
    </section>
  )
}

export default HeroBanner
