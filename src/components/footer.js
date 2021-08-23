import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return(
        <footer data-testid="footer" className="footer">
            <div className="container">
              <div className="columns is-mobile is-multiline">
              <div className="column is-half-mobile is-one-quarter-desktop">
                      <h6 className="title is-5">X2MARS</h6>
                      <p>X2MARS is a new token factory protocol allowing anyone to make their FOT crypto currency and launch it on Binance Smart Chain</p>
                  </div>

                  <div className="column is-half-mobile is-one-quarter-desktop">
                      <h6 className="title is-5">Community</h6>
                      <ul>
                          <li><a data-testid="footerDiscord" href="/">Discord</a></li>
                          <li><a data-testid="footerForums" href="/">Forums</a></li>
                          <li><a data-testid="footerReddit" href="/">Reddit</a></li>
                          <li><a data-testid="footerTelegram" href="/">Telegram</a></li>
                      </ul>
                  </div>

                  <div className="column is-half-mobile is-one-quarter-desktop">
                      <h6 className="title is-5">Resources</h6>
                      <ul>
                          <li><a data-testid="footerBranding" href="/">Branding</a></li>
                          <li><a data-testid="footerWallet" href="/">Wallet Tracker</a></li>
                          <li><a data-testid="footerContact" href="/">Contact</a></li>
                          <li><a data-testid="footerPaper" href="/">White paper</a></li>
                      </ul>
                  </div>

                  <div className="column is-half-mobile is-one-quarter-desktop">
                      <h6 className="title is-5">Social</h6>
                      <ul>
                          <li><a data-testid="footerFacebook" href="#0"><i  className="fab fa-fw fa-facebook"></i>Facebook</a></li>
                          <li><a data-testid="footerInstagram" href="#0"><i className="fab fa-fw fa-instagram"></i>Instagram</a></li>
                          <li><a data-testid="footerTwitter" href="#0"><i className="fab fa-fw fa-twitter"></i>Twitter</a></li>
                          <li><a data-testid="footerYouTube" href="#0"><i className="fab fa-fw fa-youtube"></i>YouTube</a></li>
                          <li><a data-testid="footerLinkedIn" href="#0"><i className="fab fa-fw fa-linkedin"></i>LinkedIn</a></li>
                      </ul>
                  </div>
              </div>

              <p className="has-text-centered">&copy; 2021 X2MARS. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer