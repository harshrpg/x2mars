/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"

import Navbar from "./Navbar/navbar"
import AppNavbar from "./AppNavbar/appnavbar"
import AppFooter from "../components/AppFooter/appfooter"
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./applayout.css"

const Layout = ({ children }) => {
  return (
    <>
    <div class="app">
      <div class="container appcontainer">
        <AppNavbar />
        <div
          style={{
            margin: `0 auto`,
          }}
        >
          <main>{children}</main>
          
        </div>
      </div>
      <AppFooter />
    </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
