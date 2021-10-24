import { navigate } from "gatsby-link";
import * as React from "react"
import "./style/logo.scss"

export const PlaygroundLogo = () => {
  return (
    <>
      <div className="logo" style={{ fontSize: "2rem" }}>
        Pl<span className="logoA">a</span>ygr
        <span className="logoO">o</span>und
      </div>
    </>
  )
}

export const Logo = () => (
  // <div className="logo is-size-1" onClick={() => navigate("/")}>
  //     <span>CREATE</span>
  // </div>

  <div className="logo" style={{ fontSize: "2rem" }}>
    Cre<span className="logoCreateA">a</span>te
  </div>
)