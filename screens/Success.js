import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import { getStorageItem, setStorageItem, removeStorageItem, removeFromCart, addToCart, increaseCartAmount, decreaseCartAmount, hideTransition, redirect, showTransition } from "../config/Config";
import Api, { API_URL } from "../config/Api";
import Popup from "../components/Popup";
import Loading from "../components/Loading";

//import "../styles/success.css";

class Success extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        hideTransition();
    }

    render() {
        const type = this.props.type;

        if (type === "reservation") {
            return(
                <div id="success">
                    <div className="content">
                        <h2 className="title">Úspešne ste si zarezervovali termín prehliadky</h2>
                        <p className="text">
                            Ďakujeme Vám za rezerváciu termínu na prehliadku v IMOOPTIK. Dve hodiny pred prehliadkou Vás budeme kontaktovať pomocou SMS správy.
                        </p>
                        <Link href="/">
                            <a className="button" onClick={() => showTransition()}>Domov</a>
                        </Link>
                    </div>
                </div>
            )
        } else if (type === "order") {
            return(
                <div id="success">
                    <div className="content">
                        <h2 className="title">Ďakujeme za Váš nákup</h2>
                        <p className="text">
                            Ďakujeme Vám za nákup okuliarov v IMOOPTIK. O Vašej objednávke Vás budeme informovať pomocou e-mailu.
                        </p>
                        <Link href="/">
                            <a className="button" onClick={() => showTransition()}>Domov</a>
                        </Link>
                    </div>
                </div>
            )
        }

        return null;
    }
}

export default withRouter(Success);