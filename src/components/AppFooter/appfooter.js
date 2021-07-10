import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './appfooter.css'

const AppFooter = () => {
    return(
        <footer class="footer">
            <div class="container">
              <div class="columns is-mobile is-multiline">
              <div class="column is-half-mobile is-one-quarter-desktop">
                      <h6 style={{fontWeight: "bolder"}}>X2MARS LLC Corporation</h6>
                      <p>Terms & Conditions</p>
                  </div>

                  <div class="column is-half-mobile is-one-quarter-desktop">
                  <button class="button is-light custom-button app-button">WHITEPAPER</button> 
                  </div>

                  <div class="column is-half-mobile is-one-quarter-desktop">
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

                  <div class="column is-half-mobile is-one-quarter-desktop">
                  <button class="button is-light custom-button app-button">CONTACT US</button>
                  </div>
              </div>
            </div>
        </footer>
    )
}

export default AppFooter