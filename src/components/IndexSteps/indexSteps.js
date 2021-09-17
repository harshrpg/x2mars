import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import { navigate } from "gatsby-link"
import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import { useImageForData } from "../../hooks/useAllImages"

import "./style/style.scss"

const IndexSteps = () => {
  const step1Image = useImageForData("tailCur.png")
  const step2Image = useImageForData("sum.png")
  const step3Image = useImageForData("mac.png")
  return (
    <>
      <div className="container index-steps-container">
        <div className="columns">
          <div className="column">
            <span className="is-size-1">
              Your currency with you in less than 5 minutes
            </span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <span className="is-size-4">It's just 3 steps</span>
          </div>
        </div>
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-4">
              <div className="columns">
                <div className="column centered-text-align">
                  <div className="theme-view-box">
                    <div className="columns" style={{ paddingLeft: "2rem" }}>
                      <div className="column">
                        <div className="columns">
                          <div className="column">
                            <span
                              className="is-size-4"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Step 1
                            </span>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="column">
                            <span className="is-size-7">
                              Select between Governance DAO Coins or Fee On
                              Transfer (Meme) Coins
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <GatsbyImage
                          image={step1Image}
                          alt={"token type"}
                          width={2}
                          height={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="columns">
                <div className="column centered-text-align">
                  <div className="theme-view-box">
                    <div className="columns" style={{ paddingLeft: "2rem" }}>
                      <div className="column">
                        <div className="columns">
                          <div className="column">
                            <span
                              className="is-size-4"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Step 2
                            </span>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="column">
                            <span className="is-size-7">
                              Provide Coin Details, such as Coin Name, Coin
                              Ticker, Coin Supply
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <GatsbyImage
                          image={step2Image}
                          alt={"coin details"}
                          width={2}
                          height={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="columns">
                <div className="column centered-text-align">
                  <div className="theme-view-box">
                    <div className="columns" style={{ paddingLeft: "2rem" }}>
                      <div className="column">
                        <div className="columns">
                          <div className="column">
                            <span
                              className="is-size-4"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Step 3
                            </span>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="column">
                            <span className="is-size-7">
                              Select additional features for your coins
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <GatsbyImage
                          image={step3Image}
                          alt={"token type"}
                          width={2}
                          height={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container columns has-text-centered">
            <div className="column">
              <button
                className="button theme-action-button-gradient-blue padded contained"
                type="button"
                onClick={() => navigate("/interface/")}
              >
                <span>Lets Create Your Currency</span>
                <span class="icon is-size-3">
                  <BsArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexSteps
