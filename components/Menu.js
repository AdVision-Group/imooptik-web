import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { redirect } from "../config/Config";

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
                    <a
                        className="link"
                        href="/obchod?kategoria=1"
                        onClick={() => closeMenu()}
                    >
                        <img className="icon" src={require("../assets/icons/dioptricke-okuliare.svg")} alt="Ikona pre dioptrické okuliare" />
                        Dioptrické
                    </a>

                    <a
                        className="link"
                        href="/obchod?kategoria=2"
                        onClick={() => closeMenu()}
                    >
                        <img className="icon" src={require("../assets/icons/slnecne-okuliare.svg")} alt="Ikona pre slnečné okuliare" />
                        Slnečné
                    </a>

                    <a
                        className="link"
                        href="/obchod?kategoria=4"
                        onClick={() => closeMenu()}
                    >
                        <img className="icon" src={require("../assets/icons/sportove-okuliare.svg")} alt="Ikona pre športové okuliare" />
                        Športové
                    </a>

                    <a
                        className="link"
                        href="/obchod?kategoria=3"
                        onClick={() => closeMenu()}
                    >
                        <img className="icon" src={require("../assets/icons/sosovky.svg")} alt="Ikona pre šošovky" />
                        Šošovky
                    </a>

                    <a
                        className="link"
                        href="/obchod?kategoria=5"
                        onClick={() => closeMenu()}
                    >
                        <img className="icon" src={require("../assets/icons/doplnky.svg")} alt="Ikona pre doplnky" />
                        Doplnky
                    </a>

                    <a
                        className="link"
                        href="/blog"
                        onClick={() => closeMenu()}
                    >
                        Blog
                    </a>

                    <a
                        className="link"
                        href="/"
                    >
                        Služby
                    </a>

                    <a
                        className="link"
                        href="/"
                    >
                        Prevádzky
                    </a>

                    <a
                        className="button"
                        href="/rezervacia-terminu"
                        onClick={() => closeMenu()}
                    >
                        <img className="icon open" src={require("../assets/eye-open.png")} alt="Ikona pre otvorené oko" />
                        <img className="icon closed" src={require("../assets/eye-closed.png")} alt="Ikona pre zavreté oko" />
                        Rezervácia online
                    </a>
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