import * as React from "react"
import "./style/telegram.scss"
import "./style/telegram.css"

const Telegram = () => {
  return (
    <>
      <section className="section is-comm">
        <div className="container is-max-desktop has-text-centered">
          <div id="hero-banner-text-subtitle" className=" has-text-centered">
            <div className="columns is-gapless">
              <div className="column ">
                <span className="is-size-6">
                  Meet others in the discussion.
                </span>
              </div>
              <div className="column">
                <button className="button is-light custom-button community-mobile">Join Telegram</button>
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

export default Telegram;
