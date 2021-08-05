import * as React from "react"
import "./style/herobanner.scss"
const HeroBanner = props => {
  return (
    <section className="hero is-medium is-feat">
      <div className="hero-body has-text-centered">
        <p className="title is-size-3 is-size-5-mobile">{props.title}</p>
        <p className="subtitle is-size-6 is-size-6-mobile">{props.subtitle}</p>
        <p>{props.body}</p>
      </div>
    </section>
  )
}

export default HeroBanner
