import * as React from "react"
import { useState } from "react"
import SideBar from "./components/Sidebar/Sidebar"
import "./style/profile.scss"

const ProfileContainer = () => {
  const [rtl, setRtl] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [image, setImage] = useState(false)
  const [toggled, setToggled] = useState(false)

  const handleCollapsedChange = checked => {
    setCollapsed(checked)
  }

  const handleRtlChange = checked => {
    setRtl(checked)
  }
  const handleImageChange = checked => {
    setImage(checked)
  }

  const handleToggleSidebar = value => {
    setToggled(value)
  }

  return (
    <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
      <SideBar />
      {/* Insert Main Content Here */}
    </div>
  )
}

export default ProfileContainer
