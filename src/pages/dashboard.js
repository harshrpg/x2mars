
import { library } from "@fortawesome/fontawesome-svg-core"
import * as React from "react"
import DashboardLayout from "../components/dashboardLayout"
import ProfileContainer from "../components/Profile/profile-container"
import Seo from "../components/seo"
import "../style/profile.scss"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { AuthProvider } from "../context"
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
const getLibrary = provider => {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 12000
  return library
}
const Dashboard = () => {
  library.add(fab)
  return (
    <AuthProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <DashboardLayout>
          <Seo title="App" />
          {/* <Factory /> */}
          <ProfileContainer />
        </DashboardLayout>
      </Web3ReactProvider>
    </AuthProvider>
  )
}

export default Dashboard
