import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft"
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import { FaRocket } from "@react-icons/all-files/fa/FaRocket"
import { GiCardExchange } from "@react-icons/all-files/gi/GiCardExchange"
import { FaFileContract } from "@react-icons/all-files/fa/FaFileContract"
import { FaHistory } from "@react-icons/all-files/fa/FaHistory"
import { MdCreate } from "@react-icons/all-files/md/MdCreate"
import { FaChartPie } from "@react-icons/all-files/fa/FaChartPie"
import { GiReceiveMoney } from "@react-icons/all-files/gi/GiReceiveMoney"
import { BiCog } from "@react-icons/all-files/bi/BiCog"
import { IoMdHelp } from "@react-icons/all-files/io/IoMdHelp"
import * as React from "react"
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Menu,
  MenuItem,
} from "react-pro-sidebar"
import { NetworkIcon } from "../../../Icons/icons"
import "./style/sidebar.scss"

const SideBar = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const collapseMenu = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div id="sidebar">
      <ProSidebar collapsed={collapsed}>
        <SidebarHeader>
          <div className="container">
            <div id="profileHeader">
              <ProfileHeader />
            </div>
            <div className="collapse-menu" onClick={collapseMenu}>
              {/* changing menu collapse icon on click */}
              <span className="collapser">
                {collapsed ? <BsArrowRight /> : <BsArrowLeft />}
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FaChartPie />}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaFileContract />}>Contracts</MenuItem>
            <MenuItem icon={<FaRocket />}>Launchpad</MenuItem>
            <MenuItem icon={<GiCardExchange />}>Exchange</MenuItem>
            <MenuItem icon={<GiReceiveMoney />}>Earn</MenuItem>
            <MenuItem icon={<BiCog />}>Settings</MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<MdCreate />}>Create Contract</MenuItem>
            <MenuItem icon={<FaHistory />}>History Transactions</MenuItem>
            <MenuItem icon={<IoMdHelp />}>Help</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  )
}

const ProfileHeader = () => {
  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column has-text-centered">
            <span className="header-logo">
              <span className="header-logo-text">
                <NetworkIcon network="eth" />
              </span>
            </span>
          </div>
          <div className="column">
            <div className="columns">
              <div className="column">Balance</div>
            </div>
            <div className="columns">
              <div className="column">Address</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar
