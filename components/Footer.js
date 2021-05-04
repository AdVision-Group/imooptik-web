import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import { redirect, showTransition } from "../config/Config";
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

                        <Link href="/obchod">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="storefront-outline"></ion-icon>
                                E-shop
                            </a>
                        </Link>

                        <Link href="/blog">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="newspaper-outline"></ion-icon>
                                Blog
                            </a>
                        </Link>

                        <Link href="/">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="hammer-outline"></ion-icon>
                                Služby
                            </a>
                        </Link>

                        <Link href="/">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="storefront-outline"></ion-icon>
                                Prevádzky
                            </a>
                        </Link>

                        <Link href="/rezervacia-terminu">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="time-outline"></ion-icon>
                                Rezervácia online
                            </a>
                        </Link>
                    </div>

                    <div className="column">
                        <p className="title">Pobočky</p>

                        <Link href="/prevadzky/bratislava-obchodna">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="storefront-outline"></ion-icon>
                                Obchodná 57, Bratislava
                            </a>
                        </Link>
                        <a className="text" href="tel: +421904533732"><ion-icon name="call-outline"></ion-icon>+421 904 533 732</a>

                        <div style={{ height: 15 }} />

                        <Link href="/prevadzky/bratislava-mileticova">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="storefront-outline"></ion-icon>
                                Miletičova 38, Bratislava
                            </a>
                        </Link>
                        <a className="text" href="tel: +421948784197"><ion-icon name="call-outline"></ion-icon>+421 948 784 197</a>

                        <div style={{ height: 15 }} />

                        <Link href="/prevadzky/bratislava-rolnicka">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="storefront-outline"></ion-icon>
                                Vajnory, Bratislava
                            </a>
                        </Link>
                        <a className="text">Otvárame čoskoro</a>

                        <div style={{ height: 15 }} />

                        <Link href="/prevadzky/bratislava-vajnorska">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="storefront-outline"></ion-icon>
                                Vajnorská, Bratislava
                            </a>
                        </Link>
                        <a className="text" href="tel: +421905553250"><ion-icon name="call-outline"></ion-icon>+421 905 553 250</a>

                        <div style={{ height: 15 }} />

                        <Link href="/prevadzky/senica-namestie-oslobodenia">
                            <a className="text" onClick={() => showTransition()}>
                                <ion-icon name="storefront-outline"></ion-icon>
                                Senica, OC Branč
                            </a>
                        </Link>
                        <a className="text" href="tel: +421948176626"><ion-icon name="call-outline"></ion-icon>+421 948 176 626</a>
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

                        <Link href="/obchodne-podmienky">
                            <div className="text" onClick={() => showTransition()}>
                                <ion-icon name="card-outline"></ion-icon>
                                Obchodné podmienky
                            </div>
                        </Link>

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