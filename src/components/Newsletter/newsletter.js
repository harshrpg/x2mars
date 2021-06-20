import * as React from "react"
import "./style/newsletter.scss"
const Newsletter = () => {
  return (
    <>
      <section class="section is-comm">
        <div class="container is-max-desktop has-text-centered">
          <div id="hero-banner-text-subtitle" class=" has-text-centered">
            <div class="columns is-gapless">
              <div class="column ">
                <span class="is-size-6">
                  Signup to our newsletter and get the latest updates.
                </span>
              </div>
              <div class="column">
                <button class="button is-light custom-button">Subscribe</button>
              </div>
              {/* <div class="column">
                <button class="button is-light">Join Telegram</button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Newsletter;
