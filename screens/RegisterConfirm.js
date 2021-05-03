import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import { hideTransition, redirect, showTransition } from "../config/Config";
import Title from "../components/Title";
import Api from "../config/Api";

//import "../styles/registerconfirm.css";

class RegisterConfirm extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        hideTransition();
    }

    render() {
        showTransition();
        this.props.router.push("/pripravujeme");

        const success = this.props.success;

        return(
            <div className="screen" id="register-confirm">
                 <div className="body">
                    {success ?
                        <div className="content">
                            <h2 className="title">Vaša registrácia bola úspešne potvrdená</h2>
                            <p className="text">
                                Ďakujeme Vám za Vašu registráciu v IMOOPTIK. Teraz sa môžete prihlásiť do Vášho účtu a nakupovať v našom e-shope.
                            </p>
                            <Link href="/prihlasenie">
                                <a className="button" onClick={() => showTransition()}>Prihlásiť sa</a>
                            </Link>
                        </div>
                    :
                        <div className="content">
                            <h2 className="title">Nepodarilo sa overiť Vašu registráciu</h2>
                            <p className="text">
                                Vašu registráciu sa nepodarilo overiť. Skúste ešte raz alebo nás kontaktujte na zaslanie nového overovacieho e-mailu.
                            </p>
                            <Link href="/">
                                <a className="button" onClick={() => showTransition()}>Domov</a>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterConfirm);