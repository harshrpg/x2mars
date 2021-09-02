/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import AppNavbar from "./AppNavbar/appnavbar"
import AppFooter from "../components/AppFooter/appfooter"
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./applayout.scss"
import { Web3Provider } from "@ethersproject/providers"

const Layout = ({ children }) => {
  const getLibrary = provider => {
    const library = new Web3Provider(provider, "any")
    library.pollingInterval = 12000
    return library
  }

  return (
    <>
      <AppNavbar />
      <main>
        <div className="main-app-layout">{children}</div>
      </main>
      <AppFooter />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
