import * as React from "react"
import ComingSoon from "../src/components/ComingSoon/comingSoon"
import Layout from "../src/components/layout"
import Seo from "../src/components/seo"

const Contact = () => {
    return (
        <>
      <Layout>
        <Seo title={"Token Guide"} />
        <ComingSoon />
      </Layout>
    </>
    )
}

export default Contact;