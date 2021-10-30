import * as React from "react"

import Hero from "../Hero/hero"
import Newsletter from "../Newsletter/newsletter"
import RoadMap from "../Roadmap/roadmap"
import Timeline from "../Timeline/timeline"
import Benefits from "../Benefits/benefits"
import Why from "../Why/why"
import IndexSteps from "../IndexSteps/indexSteps"
import HeroFeatures from "../HeroFeatures/hero-features"

const App = () => {
  return (
    <div>
      <Hero />
      <Why />
      {/* <HeroFeatures /> */}
      <Benefits />
      <div style={{margin: "1rem"}}>
        <IndexSteps />
      </div>
      <RoadMap />
      <Timeline />
      <Newsletter />
    </div>
  )
}

export default App
