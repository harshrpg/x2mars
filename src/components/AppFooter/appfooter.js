import React from "react"
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Link, navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./style/appfooter.scss"


const AppFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter-desktop">
            <h6 className="title is-5" style={{ color: "white" }}>
              CREATE
            </h6>
            <p style={{ color: "white" }}>
              Create is a decentralized smart contract building protocol
              allowing anyone to make their crypto currency and launch.
            </p>
            <p>
              <a href="https://www.the-playground.io/tnc" target="_blank">Terms and Conditions</a>
            </p>
            <p>
              <a href="https://www.the-playground.io/privacyPolicy" target="_blank">Privacy Policy</a>
            </p>
          </div>

          <div className="column">
            <h6 className="title is-5">Resources</h6>
            <ul>
              <li>
                <Link to="/whitepaper">Litepaper</Link>
              </li>
              <li>
                <Link to="/token-guide">Token Guide</Link>
              </li>
            </ul>
          </div>

          <div className="column is-one-quarter-desktop">
            <h6 className="title is-5">Social</h6>
            <ul>
              <li>
                <a href="https://discord.gg/7mGgQAPH">
                  <i className="fab fa-fw fa-discord"></i>Discord
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/playground.io/?utm_source=qr">
                  <i className="fab fa-fw fa-instagram"></i>Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/playgroundCSP">
                  <i className="fab fa-fw fa-twitter"></i>Twitter
                </a>
              </li>
              <li>
                <a href="https:www.the-playground.io/contact">
                  <button
                    className="button footerPrimaryButtonBack"
                    style={{ marginTop: "1rem" }}
                  >
                    <span className="footerPrimaryButtonFront">Contact</span>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="has-text-centered" style={{ color: "white" }}>
          &copy; 2021 CREATE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default AppFooter
