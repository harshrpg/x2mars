import * as React from "react"
import "./style/discord.scss"
import "./style/discord.css"
const Discord = () => {
  return (
    <>
      <section className="section is-comm">
        <div className="container is-max-desktop has-text-centered">
          <div id="hero-banner-text-subtitle" className=" has-text-centered">
            <div className="columns is-gapless">
              <div className="column ">
                <span className="is-size-6">
                  Join others in the discussion. Build your own token now.
                </span>
              </div>
              <div className="column">
                <button className="button is-light custom-button community-mobile">Join Discord</button>
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

export default Discord;
