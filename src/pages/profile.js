import { library } from "@fortawesome/fontawesome-svg-core"
import * as React from "react"
import ProfileContainer from "../components/Profile/profile-container"
import Seo from "../components/seo"
import "../style/profile.scss"
import { fab } from "@fortawesome/free-brands-svg-icons"
const Profile = () => {
  library.add(fab);
  return (
    <>
      <Seo title="Profile" />
      <ProfileContainer />
    </>
  )
}

export default Profile;
