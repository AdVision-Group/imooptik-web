import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import { hideTransition, redirect, showTransition } from "../config/Config";
import Api, { API_URL } from "../config/Api";
import Popup from "../components/Popup";
import Loading from "../components/Loading";

class Soon extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        hideTransition();
    }

    render() {
        return(
            <div id="soon">
                <div className="content">
                    <h2 className="title">Už čoskoro...</h2>
                    <p className="text">
                        E-shop, objednávky, registrácia a ďalšie veci sa už pripravujú a čoskoro budú funkčné. Sledujte náš Instagram a Facebook a nezmeškajte vydanie nášho nového webu.
                    </p>
                    <Link href="/">
                        <a className="button" onClick={() => showTransition()}>Domov</a>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Soon);