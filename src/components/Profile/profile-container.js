import * as React from "react"
import { useState } from "react"
import { ProfileProvider } from "../../context/context"
import Main from "./components/MainContent/main-content"
import SideBar from "./components/Sidebar/Sidebar"
import "./style/profile.scss"

const ProfileContainer = () => {
  return (
    <ProfileProvider>
      <div className="app">
        <SideBar />
        <Main />
      </div>
    </ProfileProvider>
  )
}

export default ProfileContainer
