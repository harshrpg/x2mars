import "./applayout.scss"
import DashboardNavbar from "./DashboardNavbar/dashboardNavbar"
import AppFooter from "../components/AppFooter/appfooter"
import * as React from "react"
import PropTypes from "prop-types"

const DashboardLayout = ({ children }) => {

  return (
    <>
      <DashboardNavbar />
      <main>
        <div className="main-app-layout">{children}</div>
      </main>
      <AppFooter />
    </>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardLayout