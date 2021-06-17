import * as React from "react"

import Layout from "../layout"
import Seo from "../seo"
import Hero from "../Hero/hero"
import Features from "../Features/features"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

import "./style/index.scss";
const App = props => {
    library.add(fab)
  return (
    <Layout>
      <Seo title={props.pageTitle} />
      <Hero />
      <Features />
    </Layout>
  )
}

export default App;
