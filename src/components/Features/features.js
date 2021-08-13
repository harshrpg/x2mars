import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import SlideShow from "./slideshow"

import "./style/features.scss"

const benefitsContent = [
  "0 Development Knowledge",
  "Rug-Pull Protection",
  "Anti Whale Protection",
  "Easy Deployment",
  "Community Driven",
]
const Features = () => {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title is-size-3 is-size-5-mobile">THE FACTORY</p>
          <p className="subtitle">
            The easiest way to initiate your next successful dapp protocol
          </p>
        </div>
      </div>
      <div className="container">
        <div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-4-fullhd factoryimgparent">
          <div className="column">
            <p className="title is-size-3-desktop is-size-3-fullhd is-size-3-widescreen is-size-4-tablet is-size-7-mobile">
              Benefits of Factory
            </p>
            <div className="content">
              <ul>
                {benefitsContent.map((content, _) => (
                  <li className="subtitle is-size-5-desktop is-size-5-fullhd is-size-5-widescreen is-size-6-tablet is-size-7-mobile">
                    {content}
                  </li>
                ))}
                
              </ul>
            </div>
          </div>
          <div className="column factoryimg">
            <StaticImage src="../../images/factory_alone.png" />
          </div>
        </div>
         <SlideShow />
      </div>
    </section>
  )
}

export default Features
