import * as React from "react"
import "./style/discord.scss"
const Discord = () => {
  return (
    <>
      <section class="section is-comm">
        <div class="container is-max-desktop has-text-centered">
          <div id="hero-banner-text-subtitle" class=" has-text-centered">
            <div class="columns is-gapless">
              <div class="column ">
                <span class="is-size-6">
                  Join others in the discussion. Build your own token now.
                </span>
              </div>
              <div class="column">
                <button class="button is-light">Join Discord</button>
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

export default Discord;
