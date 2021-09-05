import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import AboutDac from "../components/AboutDac/aboutDac"
import { AuthProvider } from "../context"

const Whitepaper = () => {
  return (
    <Layout>
        <Seo title="whitepaper" />
        <AboutDac />
      </Layout>
  )
}

export default Whitepaper
