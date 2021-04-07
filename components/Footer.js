import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import { redirect } from "../config/Config";
import SmoothScroll from "../components/SmoothScroll";

//import "../styles/footer.css";

class Footer extends React.Component {

    render() {
        return(
            <div id="footer">
                <div className="top-panel">
                    <img className="logo" src={require("../assets/logo.png")} alt="Logo" />
                </div>

                <div className="bottom-panel">
                    <div className="column">
                        <p className="title">Navigácia</p>

                        <div className="text" to="/obchod">
                            <ion-icon name="storefront-outline"></ion-icon>
                            E-shop
                        </div>

                        <div className="text" to="/blog">
                            <ion-icon name="newspaper-outline"></ion-icon>
                            Blog
                        </div>

                        <div className="text" to="/" onClick={() => setTimeout(() => SmoothScroll.scroll("#services"), 20)}>
                            <ion-icon name="hammer-outline"></ion-icon>
                            Služby
                        </div>

                        <div className="text" to="/" onClick={() => setTimeout(() => SmoothScroll.scroll("#branches"), 20)}>
                        <ion-icon name="storefront-outline"></ion-icon>
                            Prevádzky
                        </div>

                        <div className="text" to="/rezervacia-terminu">
                            <ion-icon name="time-outline"></ion-icon>
                            Rezervácia online
                        </div>
                    </div>

                    <div className="column">
                        <p className="title">Pobočky</p>

                        <div className="text" to="/bratislava-obchodna" onClick={() => redirect(this.props.location, "/bratislava-obchodna")}>
                            <ion-icon name="storefront-outline"></ion-icon>
                            Obchodná 57, Bratislava
                        </div>

                        <div className="text" to="/bratislava-mileticova" onClick={() => redirect(this.props.location, "/bratislava-mileticova")}>
                            <ion-icon name="storefront-outline"></ion-icon>
                            Miletičova 38, Bratislava
                        </div>

                        <div className="text" to="/bratislava-rolnicka" onClick={() => redirect(this.props.location, "/bratislava-rolnicka")}>
                            <ion-icon name="storefront-outline"></ion-icon>
                            Vajnory, Bratislava
                        </div>

                        <div className="text" to="/bratislava-vajnorska" onClick={() => redirect(this.props.location, "/bratislava-vajnorska")}>
                            <ion-icon name="storefront-outline"></ion-icon>
                            Vajnorská, Bratislava
                        </div>

                        <div className="text" to="/senica-namestie-oslobodenia" onClick={() => redirect(this.props.location, "/senica-namestie-oslobodenia")}>
                            <ion-icon name="storefront-outline"></ion-icon>
                            Senica, OC Branč
                        </div>
                    </div>

                    <div className="column">
                        <p className="title">Kontakt</p>

                        <p className="text"><ion-icon name="location-outline"></ion-icon>Obchodná 57, Bratislava</p>
                        <a className="text" href="mailto: info@imooptik.sk"><ion-icon name="mail-outline"></ion-icon>info@imooptik.sk</a>
                        <a className="text" href="tel: +421905553250"><ion-icon name="call-outline"></ion-icon>+421 905 553 250</a>

                        <div style={{ height: 20 }} />

                        <a className="text" href="https://facebook.com"><ion-icon name="logo-facebook"></ion-icon>Facebook</a>
                        <a className="text" href="https://instagram.com"><ion-icon name="logo-instagram"></ion-icon>Instagram</a>
                    </div>

                    <div className="column">
                        <p className="title">Partneri</p>

                        <p className="text">Parneri, s ktorými<br />spolupracujeme</p>

                        <div className="partners">
                            <img className="partner" src={require("../assets/edenred.png")} alt="Edenred partner" />
                            <div style={{ width: 20 }} />
                            <img className="partner" src={require("../assets/benefit-plus.png")} alt="Edenred partner" />
                        </div>
                    </div>

                    <div className="column">
                        <p className="title">Súkromie</p>

                        <div className="text">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            Ochrana osobných údajov
                        </div>

                        <div className="text" to="/obchodne-podmienky" onClick={() => redirect(this.props.location, "/obchodne-podmienky")}>
                            <ion-icon name="card-outline"></ion-icon>
                            Obchodné podmienky
                        </div>

                        <div className="text">
                            <ion-icon name="filter-circle-outline"></ion-icon>
                            Cookies
                        </div>
                    </div>
                </div>

                <div className="company-panel">
                    <div className="heading">© IMOOPTIK 2021 | Web vytvoril <a className="company" href="https://advision.sk">AdVision Digital Marketing</a></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Footer);