import * as React from "react"
import "./style/newsletter.scss"
import "./style/newsletter.css"
const Newsletter = () => {
  return (
    <>
      <div className="container has-text-centered">
        <div className="columns">
          <div className="column">
            <span className="is-size-3">Stay Updated</span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-6">
              Get news on upcoming events and community information straight to
              your inbox.
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column is-3"></div>
          <div className="column is-4">
            <div className="centerinput">
              <div className="input-block default borderless">
                <input
                  type="email"
                  id="featureInput"
                  required="required"
                  spellcheck="false"
                />
                <span className="placeholder">Your Email Address</span>
              </div>
            </div>
          </div>
          <div className="column is-2 is-half-mobile is-offset-3-mobile">
            <button
              className="button theme-action-button-gradient-blue"
              type="submit"
              style={{ marginBottom: "30px" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Newsletter
