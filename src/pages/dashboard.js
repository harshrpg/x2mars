import { library } from "@fortawesome/fontawesome-svg-core"
import * as React from "react"
import ProfileContainer from "../components/Profile/profile-container"
import Seo from "../components/seo"
import "../style/profile.scss"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { AuthProvider } from "../context"
const Dashboard = () => {
  library.add(fab);
  return (
    <AuthProvider>
      <Seo title="Profile" />
      <ProfileContainer />
    </AuthProvider>
  )
}

export default Dashboard;
