import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
// import "../style/index.scss"
// import { useStaticQuery, graphql } from "gatsby"
// import { library } from "@fortawesome/fontawesome-svg-core"
// import { fab } from "@fortawesome/free-brands-svg-icons"
const Interface = () => {
//     const data = useStaticQuery(graphql`
//     query SiteTitleQuery {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)
//   library.add(fab)
    return (
        <Layout>
            <Seo title="App" />
        </Layout>
        
    )
}

export default Interface;