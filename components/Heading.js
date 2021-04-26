import React from "react";
import Fade from "react-reveal";

import { logout } from "../config/Config";
import Animated from "./Animated";

//import "../styles/heading.css";

export default function Heading(props) {
    const heading = props.heading;
    const title = props.title;
    const withBorder = props.withBorder;

    return(
        <div className="global-title">
            <div className="container"><div className="line" style={!withBorder ? { opacity: 0 } : null} /></div>
            <div className="heading-content">
                <h3 className="heading">{heading}</h3>
                <h2 className="title">{title}</h2>
            </div>
            <div className="container">
                <div className="line" style={!withBorder ? { opacity: 0 } : null} />
                {props.withLogout ? <div className="button" onClick={() => {
                    logout();
                    window.location.reload();
                }}>Odhlásiť sa</div> : null}
            </div>
        </div>
    )
}