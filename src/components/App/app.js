import * as React from "react"

import Layout from "../layout"
import Seo from "../seo"
import Hero from "../Hero/hero"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

import "./style/index.scss";
const App = props => {
    library.add(fab)
  return (
    <Layout>
      <Seo title={props.pageTitle} />
      <Hero />
    </Layout>
  )
}

export default App;
