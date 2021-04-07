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
                    <div
                        className="link"
                        to={{ pathname: "/obchod", state: { category: 1 } }}
                        onClick={() => {
                            redirect(this.props.location, "/obchod");
                            closeMenu();
                        }}
                    >
                        <img className="icon" src={require("../assets/icons/dioptricke-okuliare.svg")} alt="Ikona pre dioptrické okuliare" />
                        Dioptrické
                    </div>

                    <div
                        className="link"
                        to={{ pathname: "/obchod", state: { category: 2 } }}
                        onClick={() => {
                            redirect(this.props.location.pathname);
                            closeMenu();
                        }}
                    >
                        <img className="icon" src={require("../assets/icons/slnecne-okuliare.svg")} alt="Ikona pre slnečné okuliare" />
                        Slnečné
                    </div>

                    <div
                        className="link"
                        to={{ pathname: "/obchod", state: { category: 4 } }}
                        onClick={() => {
                            redirect(this.props.location.pathname, "/obchod");
                            closeMenu();
                        }}
                    >
                        <img className="icon" src={require("../assets/icons/sportove-okuliare.svg")} alt="Ikona pre športové okuliare" />
                        Športové
                    </div>

                    <div
                        className="link"
                        to={{ pathname: "/obchod", state: { category: 3 } }}
                        onClick={() => {
                            redirect(this.props.location.pathname, "/obchod");
                            closeMenu();
                        }}
                    >
                        <img className="icon" src={require("../assets/icons/sosovky.svg")} alt="Ikona pre šošovky" />
                        Šošovky
                    </div>

                    <div
                        className="link"
                        to={{ pathname: "/obchod", state: { category: 5 } }}
                        onClick={() => {
                            redirect(this.props.location.pathname, "/obchod");
                            closeMenu();
                        }}
                    >
                        <img className="icon" src={require("../assets/icons/doplnky.svg")} alt="Ikona pre doplnky" />
                        Doplnky
                    </div>

                    <div
                        className="link"
                        to="/blog"
                        onClick={() => {
                            redirect(this.props.location, "/blog");
                            closeMenu();
                        }}
                    >
                        Blog
                    </div>

                    <div
                        className="link"
                        to="/"
                    >
                        Služby
                    </div>

                    <div
                        className="link"
                        to="/"
                    >
                        Prevádzky
                    </div>

                    <div
                        className="button"
                        to="/rezervacia-terminu"
                        onClick={() => {
                            redirect(this.props.location, "/rezervacia-terminu");
                            closeMenu();
                        }}
                    >
                        <img className="icon open" src={require("../assets/eye-open.png")} alt="Ikona pre otvorené oko" />
                        <img className="icon closed" src={require("../assets/eye-closed.png")} alt="Ikona pre zavreté oko" />
                        Rezervácia online
                    </div>
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