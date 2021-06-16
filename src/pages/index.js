import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/Hero/hero"

import "../style/index.scss";
import "../style/test.css";
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
const IndexPage = () => {
  library.add(fab)
  return (
  <Layout>
    <Seo title="Home" />
      <Hero />
  </Layout>
)}

export default IndexPage
