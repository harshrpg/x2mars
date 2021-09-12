import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const PrivPolicy = () => {
  const { backgroundImage123 } = useStaticQuery(
    graphql`
      query {
        backgroundImage123: file(relativePath: { eq: "Law.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1300
              quality: 100
              webpOptions: { quality: 100 }
            )
          }
        }
      }
    `
  )
  const heroImage = getImage(backgroundImage123)

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="is-size-1">Privacy Policy</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <span className="is-size-4">
                This Privacy Policy describes how your personal information is
                collected, used, and shared when you visit or make a purchase
                from createconomy.com (the “Site”).
              </span>
            </div>
          </div>
        </div>
        <div className="column is-size-1">
          <GatsbyImage image={heroImage} width={100} height={100} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="container">
            <div className="columns">
              <div className="column">
                <span className="is-size-4">
                  PERSONAL INFORMATION WE COLLECT
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-6">
                  When you visit the Site, we automatically collect your account
                  address, wallet type, wallet balance network information and
                  more information that may be collected by third party tools
                  associated with the application. These information may be
                  about your device, including information about your web
                  browser, IP address, time zone, and some of the cookies that
                  are installed on your device.
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-6">
                  Additionally, as you browse the Site, we may collect
                  information about the individual web pages or products that
                  you view, what websites or search terms referred you to the
                  Site, and information about how you interact with the Site. We
                  refer to this automatically-collected information as “Device
                  Information.” We collect Device Information using the
                  following technologies: - “Log files” track actions occurring
                  on the Site, and collect data including your IP address,
                  browser type, Internet service provider, referring/exit pages,
                  and date/time stamps. - “Web beacons,” “tags,” and “pixels”
                  are electronic files used to record information about how you
                  browse the Site. When we talk about “Personal Information” in
                  this Privacy Policy, we are talking both about Device
                  Information and Order Information.
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-4">
                  HOW DO WE USE YOUR PERSONAL INFORMATION?
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-6">
                  We use the Order Information that we collect generally to
                  fulfill any orders placed through the Site (including
                  processing your payment information, arranging for shipping,
                  and providing you with invoices and/or order confirmations).
                  Additionally, we use this Order Information to: Communicate
                  with you;Screen our orders for potential risk or fraud; and
                  When in line with the preferences you have shared with us,
                  provide you with information or advertising relating to our
                  products or services.
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-6">
                  We use the Device Information that we collect to help us
                  screen for potential risk and fraud (in particular, your IP
                  address), and more generally to improve and optimize our Site
                  (for example, by generating analytics about how our customers
                  browse and interact with the Site, and to assess the success
                  of our marketing and advertising campaigns).
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-6">
                  We also use Google Analytics to help us understand how our
                  customers use the Site--you can read more about how Google
                  uses your Personal Information here:
                  https://www.google.com/intl/en/policies/privacy/. You can also
                  opt-out of Google Analytics here:
                  https://tools.google.com/dlpage/gaoptout.
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-4">CHANGES</span>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <span className="is-size-6">
                  We may update this privacy policy from time to time in order
                  to reflect, for example, changes to our practices or for other
                  operational, legal or regulatory reasons.CONTACT US For more
                  information about our privacy practices, if you have
                  questions, or if you would like to make a complaint, please
                  contact us by e-mail at legal@createconomy.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivPolicy;