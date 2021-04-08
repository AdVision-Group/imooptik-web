import React from "react";
import { withRouter } from "next/router";

import { hideTransition, redirect } from "../config/Config";
import Title from "../components/Title";
import Api from "../config/Api";

//import "../styles/registerconfirm.css";

class RegisterConfirm extends React.Component {

    constructor() {
        super();
    }

    render() {
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
                            <a className="button" href="/prihlasenie">Prihlásiť sa</a>
                        </div>
                    :
                        <div className="content">
                            <h2 className="title">Nepodarilo sa overiť Vašu registráciu</h2>
                            <p className="text">
                                Vašu registráciu sa nepodarilo overiť. Skúste ešte raz alebo nás kontaktujte na zaslanie nového overovacieho e-mailu.
                            </p>
                            <a className="button" href="/">Domov</a>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterConfirm);