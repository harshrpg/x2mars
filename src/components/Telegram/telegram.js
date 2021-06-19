import * as React from "react"
import "./style/telegram.scss"
const Telegram = () => {
  return (
    <>
      <section class="section is-comm">
        <div class="container is-max-desktop has-text-centered">
          <div id="hero-banner-text-subtitle" class=" has-text-centered">
            <div class="columns is-gapless tele">
              <div class="column ">
                <span class="is-size-6">
                  Meet others in the discussion.
                </span>
              </div>
              <div class="column">
                <button class="button is-light">Join Telegram</button>
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

export default Telegram;
