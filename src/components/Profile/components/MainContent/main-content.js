import * as React from "react"
import { useProfileState } from "../../../../context/context"
import ComingSoon from "../../../ComingSoon/comingSoon"
import CommunityLaunchpad from "../Community/community-launchpad"
import Dashboard from "../Dashboard/dashboard"
import Help from "../Help/help"
import MyCoins from "../MyCoins/my-coins"
import Settings from "../Settings/settings"

import "./style.scss"
const Main = () => {
  const profileState = useProfileState()
  const sideBarSelected = profileState.profileSideBarSelection

  return (
    <div className="container main-container">
      {sideBarSelected[0] ? (
        <Dashboard />
      ) : sideBarSelected[1] ? (
        <MyCoins />
      ) : sideBarSelected[2] ? (
        <CommunityLaunchpad />
      ) : sideBarSelected[3] ? (
        `Exchange`
      ) : sideBarSelected[4] ? (
        `Earn`
      ) : sideBarSelected[5] ? (
        <Settings />
      ) : sideBarSelected[6] ? (
        <Help />
      ) : (
        `Error`
      )}
    </div>
  )
}

export default Main
