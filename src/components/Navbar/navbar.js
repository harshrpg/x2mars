import * as React from "react"
import Logo from "../Logo/logo"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./style/navbar.scss"
const Navbar = () => {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Logo />
        <button
          onClick={() => setIsActive(!isActive)}
          className={`hamburger hamburger--emphatic ${
            isActive ? "is-active" : ""
          }`}
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
      <div
        id="navbar-x2m"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link to="/whitepaper" className="navbar-item" activeClassName="navbar-item">
            about dac
          </Link>
          {/* <Link
            to="/"
            className="navbar-item"
            activeClassName="navbar-item"
          >
            blog
          </Link> */}
          {/* <Link
            to="/"
            className="navbar-item"
            activeClassName="navbar-item"
          >
            whitepaper
          </Link> */}
          <Link to="/" className="navbar-item" activeClassName="navbar-item">
            token guide
          </Link>
          <Link
            to="/interface"
            className="navbar-item"
            activeClassName="navbar-item"
            type="openapp"
          >
            open app
          </Link>
        </div>
        <div className="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Community</a>

            <div class="navbar-dropdown">
              <Link
                to="/"
                className="navbar-item"
                activeClassName="navbar-item"
              >
                <span class="icon">
                  <FontAwesomeIcon icon={["fab", "github"]} />
                </span>
                <span>GitHub</span>
              </Link>
              <Link
                to="/"
                className="navbar-item"
                activeClassName="navbar-item"
              >
                <span class="icon">
                  <FontAwesomeIcon icon={["fab", "medium-m"]} />
                </span>
                <span>Medium</span>
              </Link>
              <Link
                to="/"
                className="navbar-item"
                activeClassName="navbar-item"
              >
                <span class="icon">
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </span>
                <span>Twitter</span>
              </Link>
              <Link
                to="/"
                className="navbar-item"
                activeClassName="navbar-item"
              >
                <span class="icon">
                  <FontAwesomeIcon icon={["fab", "discord"]} />
                </span>
                <span>Discord</span>
              </Link>
              <Link
                to="/"
                className="navbar-item"
                activeClassName="navbar-item"
              >
                <span class="icon">
                  <FontAwesomeIcon icon={["fab", "youtube"]} />
                </span>
                <span>Youtube</span>
              </Link>
              <Link
                to="/"
                className="navbar-item"
                activeClassName="navbar-item"
              >
                <span class="icon">
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                </span>
                <span>Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
