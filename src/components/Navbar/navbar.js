import * as React from "react"
import Logo from "../Logo/logo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./style/navbar.scss"
const Navbar = () => {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <nav data-testid="navbar" className="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Logo data-testid="navbarLogo"/>
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
            data-testid="navbarAbout"
          >
            about
          </Link>
          <Link
            to="/"
            class="navbar-item"
            activeClassName="navbar-item"
            data-testid="navbarBlog"
          >
            blog
          </Link>
          <Link
            to="/"
            class="navbar-item"
            activeClassName="navbar-item"
            data-testid="navbarPaper"
          >
            whitepaper
          </Link>
          <Link
            to="/"
            class="navbar-item"
            activeClassName="navbar-item"
            data-testid="navbarBuy"
          >
            buy x2m
          </Link>
          <Link
            to="/interface"
            class="navbar-item"
            activeClassName="navbar-item"
            type="openapp"
            data-testid="navbarApp"
          >
            open app
          </Link>
        </div>
        <div class="navbar-end">
          <Link to="/" data-testid="navbarTelegram" class="navbar-item" activeClassName="navbar-item">
          <FontAwesomeIcon icon={["fab", "telegram-plane"]} />
          </Link>
          <Link to="/" data-testid="navbarMedium" class="navbar-item" activeClassName="navbar-item">
          <FontAwesomeIcon icon={["fab", "medium-m"]} />
          </Link>
          <Link to="/" data-testid="navbarTwitter" class="navbar-item" activeClassName="navbar-item">
          <FontAwesomeIcon icon={["fab", "twitter"]} />
          </Link>
          <Link to="/" data-testid="navbarDiscord" class="navbar-item" activeClassName="navbar-item">
          <FontAwesomeIcon icon={["fab", "discord"]} />
          </Link>
          <Link to="/" data-testid="navbarYoutube" class="navbar-item" activeClassName="navbar-item">
          <FontAwesomeIcon icon={["fab", "youtube"]} />
          </Link>
          <Link to="/" data-testid="navbarFacebook" class="navbar-item" activeClassName="navbar-item">
          <FontAwesomeIcon icon={["fab", "facebook"]} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
