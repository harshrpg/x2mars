import * as React from "react"

import Hero from "../Hero/hero"
import Newsletter from "../Newsletter/newsletter"
import RoadMap from "../Roadmap/roadmap";
import Timeline from "../Timeline/timeline";
import Benefits from "../Benefits/benefits"
import Why from "../Why/why"
import IndexSteps from "../IndexSteps/indexSteps"

const App = () => {
    
  return (
    <div>
      <Hero />
      <Benefits />
      <Why />
      <IndexSteps />
      <RoadMap />
      <Timeline />
      <Newsletter />
    </div>
  )
}

export default App;
