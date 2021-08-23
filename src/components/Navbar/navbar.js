import * as React from "react"
import Logo from "../Logo/logo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./style/navbar.scss"
const Navbar = () => {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <nav data-testid="navbar" className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Logo data-testid="navbarLogo" />
        <button
          onClick={() => setIsActive(!isActive)}
          className={`hamburger hamburger--emphatic ${isActive ? "is-active" : ""}`}
          type="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-x2m"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <div id="navbar-x2m" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link
            to="/"
            className="navbar-item"
            activeClassName="navbar-item"
            data-testid="navbarAbout"
          >
            about
          </Link>
          <Link
            to="/"
            className="navbar-item"
            activeClassName="navbar-item"
            data-testid="navbarBlog"
          >
            blog
          </Link>
          <Link
            to="/"
            className="navbar-item"
            activeClassName="navbar-item"
            data-testid="navbarPaper"
          >
            whitepaper
          </Link>
          <Link
            to="/"
            className="navbar-item"
            activeClassName="navbar-item"
            data-testid="navbarBuy"
          >
            buy x2m
          </Link>
          <Link
            to="/interface"
            className="navbar-item"
            activeClassName="navbar-item"
            type="openapp"
            data-testid="navbarApp"
          >
            open app
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="/" data-testid="navbarTelegram" className="navbar-item" activeClassName="navbar-item">
          
            <FontAwesomeIcon icon={["fab", "telegram-plane"]} />
          </Link>
          <Link to="/" data-testid="navbarMedium" className="navbar-item" activeClassName="navbar-item">
          
            <FontAwesomeIcon icon={["fab", "medium-m"]} />
          </Link>
          <Link to="/" data-testid="navbarTwitter" className="navbar-item" activeClassName="navbar-item">
          
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </Link>
          <Link to="/" data-testid="navbarDiscord" className="navbar-item" activeClassName="navbar-item">
          
            <FontAwesomeIcon icon={["fab", "discord"]} />
          </Link>
          <Link to="/" data-testid="navbarYoutube" className="navbar-item" activeClassName="navbar-item">
          
            <FontAwesomeIcon icon={["fab", "youtube"]} />
          </Link>
          <Link to="/" data-testid="navbarFacebook" className="navbar-item" activeClassName="navbar-item">
          
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
