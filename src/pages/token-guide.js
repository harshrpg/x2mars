import * as React from "react"
import ComingSoon from "../components/ComingSoon/comingSoon"
import Layout from "../components/layout"
import Seo from "../components/seo"

const TokenGuide = () => {
  return (
    <>
      <Layout>
        <Seo title={"Token Guide"} />
        <ComingSoon />
      </Layout>
    </>
  )
}

export default TokenGuide
