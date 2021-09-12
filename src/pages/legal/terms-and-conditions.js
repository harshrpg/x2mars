import * as React from "react"
import ComingSoon from "../../components/ComingSoon/comingSoon"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import TnC from "../../components/TermsAndConditions/tnc"

const TermsAndConditions = () => {
  return (
    <>
      <Layout>
        <Seo title={"Terms And Conditions"} />
        {/* <ComingSoon /> */}
        <TnC />
      </Layout>
    </>
  )
}

export default TermsAndConditions
