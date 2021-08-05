import * as React from "react"

import App from "../components/App/app"
import Seo from "../components/seo"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import "../style/index.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

const IndexPage = (props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  library.add(fab)
  return (
    <Layout data-testid="layoutInIndex">
      
      <Seo title={data.site.siteMetadata.title} />
      <App data-testid="appInIndex" />
    </Layout>
  )
}

export default IndexPage
