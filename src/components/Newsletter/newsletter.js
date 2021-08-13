import * as React from "react"
import "./style/newsletter.scss"
import "./style/newsletter.css"
const Newsletter = () => {
  return (
    <>
      <section className="section is-comm">
        <div className="container is-max-desktop has-text-centered">
          <div id="hero-banner-text-subtitle" className=" has-text-centered">
            <div className="columns is-gapless">
              <div className="column ">
                <span className="is-size-6">
                  Signup to our newsletter and get the latest updates.
                </span>
              </div>
              <div className="column">
                <button className="button is-light custom-button community-mobile">Subscribe</button>
              </div>
              {/* <div className="column">
                <button className="button is-light">Join Telegram</button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Newsletter;
