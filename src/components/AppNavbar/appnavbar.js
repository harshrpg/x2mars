import * as React from "react"
import Logo from "../Logo/logo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./style/appnavbar.scss"
const AppNavbar = () => {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Logo />
        <button
          onClick={() => setIsActive(!isActive)}
          class={`hamburger hamburger--emphatic ${isActive ? "is-active" : ""}`}
          type="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-x2m"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <div id="navbar-x2m" class={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div class="navbar-start">
          <Link
            to="/"
            class="navbar-item"
            activeClassName="navbar-item"
          >
            Home
          </Link>
          
        </div>
        <div class="navbar-end">
          <Link to="/" class="navbar-item" activeClassName="navbar-item">
            <FontAwesomeIcon icon={["fab", "telegram-plane"]} />
          </Link>
          <Link to="/" class="navbar-item" activeClassName="navbar-item">
            <FontAwesomeIcon icon={["fab", "medium-m"]} />
          </Link>
          <Link to="/" class="navbar-item" activeClassName="navbar-item">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </Link>
          <Link to="/" class="navbar-item" activeClassName="navbar-item">
            <FontAwesomeIcon icon={["fab", "discord"]} />
          </Link>
          <Link to="/" class="navbar-item" activeClassName="navbar-item">
            <FontAwesomeIcon icon={["fab", "youtube"]} />
          </Link>
          <Link to="/" class="navbar-item" activeClassName="navbar-item">
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
