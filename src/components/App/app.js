import * as React from "react"

import Layout from "../layout"
import Seo from "../seo"
import Hero from "../Hero/hero"
import Features from "../Features/features"
import Discord from "../Discord/discord"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

import "./style/index.scss";
import RoadMap from "../Roadmap/roadmap";
import Pricing from "../pricing/pricing";

const App = props => {
    library.add(fab)
  return (
    <Layout>
      <Seo title={props.pageTitle} />
      <Hero />
      <Features />
      <Pricing />
      <RoadMap />
      <Discord />
    </Layout>
  )
}

export default App;
