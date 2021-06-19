import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import SlideShow from "./slideshow"

import "./style/features.scss"

const Features = () => {
  return (
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title is-size-3 is-size-5-mobile">THE FACTORY</p>
          <p class="subtitle">
            The easiest way to initiate your next successful dapp protocol
          </p>
        </div>
      </div>
      <div class="container">
        <div class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-4-fullhd">
          <div class="column">
            <p class="title is-size-4">Benefits of Factory</p>
            <div class="content">
              <ul>
                <li class="subtitle is-size-6">0 Development Knowledge</li>
                <li class="subtitle is-size-6">Rug-Pull Protection</li>
                <li class="subtitle is-size-6">Anti Whale Protection</li>
                <li class="subtitle is-size-6">Easy Deployment</li>
                <li class="subtitle is-size-6">Community Driven</li>
              </ul>
            </div>
          </div>
          <div class="column">
            <StaticImage src="../../images/factory_alone.png" />
          </div>
        </div>
        <div class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-4-fullhd">
          <div class="column">
            <SlideShow />
          </div>
          <div class="column">
            <p class="title is-size-4">Use the factory in 3 simple steps</p>
            <div class="content">
              <ul>
                <li class="subtitle is-size-6">
                  Provide details and fill the form
                </li>
                <li class="subtitle is-size-6">
                  Provide protocol owner's address and deploy your contract
                  <p class="is-size-7">Note: Owner's address is needed to transfer ownership</p>
                </li>
                <li class="subtitle is-size-6">
                  Receive your contract's address and grow your business with
                  X2Mars Launchpad
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
