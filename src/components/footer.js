import React from "react"
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns is-mobile is-multiline">
          <div className="column is-half-mobile is-one-quarter-desktop">
            <h6 className="title is-5">CREATE</h6>
            <p>
              Create is a decentralized smart contract building protocol
              allowing anyone to make their crypto currency and launch it on
              Ethereum or BSC
            </p>
          </div>

          <div className="column is-half-mobile is-one-quarter-desktop">
            <h6 className="title is-5">Community</h6>
            <ul>
              <li>
                <a href="/">Discord</a>
              </li>
              <li>
                <a href="/">Forums</a>
              </li>
              <li>
                <a href="/">Reddit</a>
              </li>
              <li>
                <a href="/">Telegram</a>
              </li>
            </ul>
          </div>

          <div className="column is-half-mobile is-one-quarter-desktop">
            <h6 className="title is-5">Resources</h6>
            <ul>
              <li>
                <a href="/whitepaper">About Dac</a>
              </li>
              <li>
                <a href="/token-guide">Token Guide</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="column is-half-mobile is-one-quarter-desktop">
            <h6 className="title is-5">Social</h6>
            <ul>
              <li>
                <a href="#0">
                  <i className="fab fa-fw fa-facebook"></i>Facebook
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-fw fa-instagram"></i>Instagram
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-fw fa-twitter"></i>Twitter
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-fw fa-youtube"></i>YouTube
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-fw fa-linkedin"></i>LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="has-text-centered">
          &copy; 2021 CREATE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
