import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import { hideTransition, redirect, showTransition } from "../config/Config";
import Api, { API_URL } from "../config/Api";
import Popup from "../components/Popup";
import Loading from "../components/Loading";
import { showBanner } from "../components/Banner";

//import "../styles/notfound.css";

class NotFound extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        showTransition();
        this.props.router.push("/pripravujeme");

        hideTransition();
    }

    render() {
        return(
            <div id="not-found">
                <div className="content">
                    <h2 className="title">404 - Stránka sa nenašla</h2>
                    <p className="text">
                        Hľadaná stránka sa nenašla, skontrolujte hľadanú URL alebo navštívte našu domovskú stránku, z ktorej sa dostanete na ostatné podstránky.
                    </p>
                    <Link href="/">
                        <a className="button" onClick={() => showTransition()}>Domov</a>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(NotFound);