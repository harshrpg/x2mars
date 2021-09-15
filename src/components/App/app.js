import * as React from "react"

import Hero from "../Hero/hero"
import Features from "../Features/features"
import Discord from "../Discord/discord"
import Telegram from "../Telegram/telegram"
import Newsletter from "../Newsletter/newsletter"
import RoadMap from "../Roadmap/roadmap";
import Pricing from "../pricing/pricing";
import Timeline from "../Timeline/timeline";
import Benefits from "../Benefits/benefits"
import Why from "../Why/why"
import IndexSteps from "../IndexSteps/indexSteps"
import Discover from "../Discover/discover"

const App = () => {
    
  return (
    <div>
      <Hero />
      {/* <Discover /> */}
      {/* <Telegram /> */}
      {/* <Features /> */}
      <Benefits />
      <Why />
      <IndexSteps />
      {/* <Discord /> */}
      {/* <Pricing /> */}
      <RoadMap />
      <Timeline />
      <Newsletter />
    </div>
  )
}

export default App;
