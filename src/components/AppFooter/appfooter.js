import React from "react"
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Link, navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./style/appfooter.scss"


const AppFooter = () => {
  return (
    <footer className="footer">
      <div className="container content has-text-centered">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full-mobile is-one-quarter-desktop mobile-column">
            <h6 style={{ fontWeight: "bolder" }}>Create LLC Corporation</h6>
            <p><Link to="/legal/terms-and-conditions">Terms & Conditions</Link></p>
            <p><Link to="/legal/privacy-policy">Privacy Policy</Link></p>
          </div>

          <div className="column mobile-column">
            <button className="button is-normal custom-button app-button-footer" onClick={() => navigate("/whitepaper")}>
              WHITEPAPER
            </button>
          </div>

          <div className="column is-full-mobile is-one-quarter-desktop social-links mobile-column">
          <Link to="/" className="navbar-item" activeClassName="navbar-item">
                <FontAwesomeIcon icon={["fab", "telegram-plane"]} />
              </Link>
              <Link to="/" className="navbar-item" activeClassName="navbar-item">
                <FontAwesomeIcon icon={["fab", "medium-m"]} />
              </Link>
              <Link to="/" className="navbar-item" activeClassName="navbar-item">
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </Link>
              <Link to="/" className="navbar-item" activeClassName="navbar-item">
                <FontAwesomeIcon icon={["fab", "discord"]} />
              </Link>
              <Link to="/" className="navbar-item" activeClassName="navbar-item">
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </Link>
              <Link to="/" className="navbar-item" activeClassName="navbar-item">
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </Link>
          </div>

          <div className="column mobile-column">
            <button className="button is-light custom-button app-button-footer" onClick={() => navigate("/contact-us")}>
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
