import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import { hideTransition, redirect, showTransition } from "../config/Config";
import Api, { API_URL } from "../config/Api";
import Popup from "../components/Popup";
import Loading from "../components/Loading";

//import "../styles/banner.css";

class Banner extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        showBanner();
    }

    render() {
        return(
            <div id="banner">
                <div className="content">
                    <ion-icon name="close-outline" onClick={() => hideBanner()}></ion-icon>

                    <h2 className="title">Zarezervujte si termín prehliadky online</h2>
                    <p className="text">
                        Zarezervujte si termín prehliadky online na jednej z našich prevádzok pomocou nášho formulára.
                    </p>
                    <Link href="/rezervacia-terminu">
                        <a className="button" onClick={() => showTransition()}>Rezervovať</a>
                    </Link>
                </div>
            </div>
        )
    }
}

export const showBanner = () => {
    const width = window.innerWidth;

    setTimeout(() => {
        var banner = document.getElementById("banner");

        if (width > 700) {
            banner.style.right = "30px";
            banner.style.bottom = "30px";
        } else {
            banner.style.right = "0px";
            banner.style.bottom = "0px";
        }
    }, 3000);
}

export const hideBanner = () => {
    const width = window.innerWidth;

    var banner = document.getElementById("banner");

    if (width > 700) {
        banner.style.right = "-500px";
        banner.style.bottom = "30px";
    } else {
        banner.style.right = "0px";
        banner.style.bottom = "-100vh";
    }
}

export default withRouter(Banner);