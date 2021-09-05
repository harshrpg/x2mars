import { navigate } from "gatsby-link";
import * as React from "react"

import "./style/logo.scss"

const Logo = () => (
    <div className="logo is-size-1" onClick={() => navigate("/")}>
        <span>CREATE</span>
    </div>
);

export default Logo;