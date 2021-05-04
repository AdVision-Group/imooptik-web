import React, { useEffect } from "react";
import Router, { withRouter } from "next/router";

import Loading from "../components/Loading";

//import "../styles/transition.css";

function Transition(props) {
    useEffect(() => {
        Router.events.on("routeChangeStart", (data) => {
            if (data !== props.router.pathname) {
                var transition = document.getElementById("transition");

                transition.style.display = "flex";
                transition.style.transition = "none";
                transition.style.opacity = "1";
            }
        });
    }, []);

    return(
        <div id="transition">
            <Loading />
        </div>
    )
}

export default withRouter(Transition);