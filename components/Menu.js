import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { redirect, showTransition } from "../config/Config";

//import "../styles/menu.css";

class Menu extends React.Component {

    componentDidMount() {
        var menu = document.getElementById("menu");
        menu.style.display = "none";
    }

    render() {
        return(
            <div id="menu">
                <div className="content">
                    <Link href="/obchod?kategoria=1">
                        <a
                            className="link"
                            onClick={() => {
                                closeMenu();
                                showTransition();
                            }}
                        >
                            <img className="icon" src={require("../assets/icons/dioptricke-okuliare.svg")} alt="Ikona pre dioptrické okuliare" />
                            Dioptrické
                        </a>
                    </Link>

                    <Link href="/obchod?kategoria=2">
                        <a
                            className="link"
                            onClick={() => {
                                closeMenu();
                                showTransition();
                            }}
                        >
                            <img className="icon" src={require("../assets/icons/slnecne-okuliare.svg")} alt="Ikona pre slnečné okuliare" />
                            Slnečné
                        </a>
                    </Link>

                    <Link href="/obchod?kategoria=4">
                        <a
                            className="link"
                            onClick={() => {
                                closeMenu();
                                showTransition();
                            }}
                        >
                            <img className="icon" src={require("../assets/icons/sportove-okuliare.svg")} alt="Ikona pre športové okuliare" />
                            Športové
                        </a>
                    </Link>

                    <Link href="/obchod?kategoria=3">
                        <a
                            className="link"
                            onClick={() => {
                                closeMenu();
                                showTransition();
                            }}
                        >
                            <img className="icon" src={require("../assets/icons/sosovky.svg")} alt="Ikona pre šošovky" />
                            Šošovky
                        </a>
                    </Link>

                    <Link href="/obchod?kategoria=5">
                        <a
                            className="link"
                            onClick={() => {
                                closeMenu();
                                showTransition();
                            }}
                        >
                            <img className="icon" src={require("../assets/icons/doplnky.svg")} alt="Ikona pre doplnky" />
                            Doplnky
                        </a>
                    </Link>

                    <Link href="/blog">
                        <a
                            className="link"
                            onClick={() => {
                                closeMenu();
                                showTransition();
                            }}
                        >
                            Blog
                        </a>
                    </Link>

                    <Link href="/">
                        <a
                            className="link"
                        >
                            Služby
                        </a>
                    </Link>

                    <Link href="/">
                        <a
                            className="link"
                        >
                            Prevádzky
                        </a>
                    </Link>

                    <Link href="/rezervacia-terminu">
                        <a
                            className="button"
                            onClick={() => {
                                closeMenu();
                                showTransition();
                            }}
                        >
                            <img className="icon open" src={require("../assets/eye-open.png")} alt="Ikona pre otvorené oko" />
                            <img className="icon closed" src={require("../assets/eye-closed.png")} alt="Ikona pre zavreté oko" />
                            Rezervácia online
                        </a>
                    </Link>
                </div>
            </div>
        )
    }
}

export const openMenu = () => {
    var menu = document.getElementById("menu");

    menu.style.display = "inline-block";
    setTimeout(() => {
        menu.style.opacity = "1";
    }, 10);
}

export const closeMenu = () => {
    var menu = document.getElementById("menu");

    menu.style.opacity = "0";
    setTimeout(() => {
        menu.style.display = "none";
    }, 410);
}

export const isMenuOpen = () => {
    var menu = document.getElementById("menu");

    if (menu.style.display === "none") return false;

    return true;
}

export default withRouter(Menu);