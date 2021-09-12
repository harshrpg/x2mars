import * as React from "react"
import Layout from "../../components/layout"
import PrivPolicy from "../../components/PrivacyPolicy/privacyPolicy"
import Seo from "../../components/seo"

const PrivacyPolicy = () => {
  return (
    <>
      <Layout>
        <Seo title={"Privacy Policy"} />
        <PrivPolicy />
      </Layout>
    </>
  )
}

export default PrivacyPolicy
