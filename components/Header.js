import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import SmoothScroll from "../components/SmoothScroll";
import Api from "../config/Api";
import Dropdown from "./Dropdown";
import { redirect, hideTransition, isLogged, getStorageItem } from "../config/Config";
import { openMenu, closeMenu, isMenuOpen } from "./Menu";

//import "../styles/header.css";

class Header extends React.Component {

    state = {
        top: 0,
        height: 130,
        padding: 40,
        direction: 0,

        index: null,
        category: null,

        search: "",
    }

    constructor() {
        super();

        this.startAnimation = this.startAnimation.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.addDropdown = this.addDropdown.bind(this);
        this.handkeKeyPress = this.handkeKeyPress.bind(this);
    }

    async componentDidMount() {
        this.prev = window.scrollY;

        this.handleDropdown();
        await this.addDropdown("header-link-1", 1, 1);
        await this.addDropdown("header-link-2", 2, 2);
        await this.addDropdown("header-link-3", 3, 4);
        //await this.addDropdown("header-link-4", 4, 3);

        var searchBar = document.getElementById("header-search-bar");
        searchBar.addEventListener("keypress", this.handkeKeyPress);

        window.loading = () => {
            this.setState({});
        }
    }

    handkeKeyPress(event) {
        if (event.key === "Enter") {
            this.props.router.push("/obchod?kategoria=-1&vyhladavanie=" + this.state.search.trim());
            closeMenu();
        }
    }

    handleDropdown() {
        var dropdown = document.getElementById("dropdown");

        window.addEventListener("scroll", () => {
            dropdown.style.display = "none";
        });

        dropdown.addEventListener("mouseover", () => {
            const { index } = this.state;

            var link = document.getElementById("header-link-" + index);

            dropdown.style.display = "inline-block";
            link.style.borderBottomColor = "rgb(235, 172, 1)";
        });

        dropdown.addEventListener("mouseout", () => {
            const { index } = this.state;

            var link = document.getElementById("header-link-" + index);

            dropdown.style.display = "none";
            link.style.borderBottomColor = "transparent";
        });
    }

    async addDropdown(id, index, category) {
        var link = document.getElementById(id);
        var header = document.getElementById("header");
        var dropdown = document.getElementById("dropdown");

        link.addEventListener("mouseover", () => {
            this.setState({ category: category, index: index }, async () => {

                dropdown.style.display = "inline-block";

                dropdown.style.top = header.getBoundingClientRect().bottom + "px";
                dropdown.style.left = link.getBoundingClientRect().left + "px";
    
                link.style.borderBottomColor = "rgb(235, 172, 1)";
            });
        });

        link.addEventListener("mouseout", () => {
            dropdown.style.display = "none";
            
            link.style.borderBottomColor = "transparent";
        });
    }

    startAnimation() {
        document.getElementById("sale-left").style.flex = "0";
        document.getElementById("sale-right").style.flex = "1";

        this.interval = setInterval(() => {
            if (this.state.direction === 0) {
                document.getElementById("sale-left").style.flex = "1";
                document.getElementById("sale-right").style.flex = "0";

                this.setState({ direction: 1 });
            } else {
                document.getElementById("sale-left").style.flex = "0";
                document.getElementById("sale-right").style.flex = "1";

                this.setState({ direction: 0 });
            }
        }, 5000);
    }

    componentWillUnmount() {
        var searchBar = document.getElementById("header-search-bar");
        searchBar.removeEventListener("keypress", this.handkeKeyPress);
    }

    render() {
        return(
            <div id="header" style={{ top: this.state.top }}>
                <div className="top-panel">
                    <a className="logo-panel" href="/">
                        <img className="logo" src={require("../assets/logo.png")} alt="Logo" />
                    </a>

                    <div style={{ flex: 1 }} />

                    <div className="search-panel">
                        <input className="field" id="header-search-bar" type="text" value={this.state.search} onChange={(event) => this.setState({ search: event.target.value })} placeholder="Vyhľadávať na e-shope" />

                        <a className="button" href={"/obchod?kategoria=-1&vyhladavanie=" + this.state.search.trim()} onClick={() => closeMenu()}>
                            <ion-icon name="search-outline"></ion-icon>
                        </a>
                    </div>

                    <a className="link" href="/kosik" onClick={() => closeMenu()}>
                        <ion-icon name="bag"></ion-icon>
                        {getStorageItem("cart") && getStorageItem("cart").length > 0 ? <div className="cart-count">{getStorageItem("cart").length}</div> : null}
                    </a>

                    <a className="link" href={getStorageItem("token") ? "/profil" : "/prihlasenie"}>
                        <ion-icon name="person"></ion-icon>
                    </a>

                    <div className="hamburger" onClick={() => isMenuOpen() ? closeMenu() : openMenu()}>
                        <div className="line" />
                        <div className="line" />
                        <div className="line" />
                    </div>
                </div>

                <div className="bottom-panel">

                    <div className="menu">
                        <a className="link" href="/obchod?kategoria=1" id="header-link-1">
                            <img className="icon" src={require("../assets/icons/dioptricke-okuliare.svg")} alt="Ikona pre dioptrické okuliare" />
                            Dioptrické
                        </a>

                        <a className="link" href="/obchod?kategoria=2" id="header-link-2">
                            <img className="icon" src={require("../assets/icons/slnecne-okuliare.svg")} alt="Ikona pre slnečné okuliare" />
                            Slnečné
                        </a>

                        <a className="link" href="/obchod?kategoria=4" id="header-link-3">
                            <img className="icon" src={require("../assets/icons/sportove-okuliare.svg")} alt="Ikona pre športové okuliare" />
                            Športové
                        </a>

                        <a className="link" href="/obchod?kategoria=3" id="header-link-4">
                            <img className="icon" src={require("../assets/icons/sosovky.svg")} alt="Ikona pre šošovky" />
                            Šošovky
                        </a>

                        <a className="link" href="/obchod?kategoria=5" id="header-link-5">
                            <img className="icon" src={require("../assets/icons/doplnky.svg")} alt="Ikona pre doplnky ku okulariom" />
                            Doplnky
                        </a>

                        <a className="link" href="/blog">
                            Blog
                        </a>

                        <a className="link" href="/">
                            Služby
                        </a>

                        <a className="link" href="/">
                            Prevádzky
                        </a>

                        <a className="button" href="/rezervacia-terminu">
                            <img className="icon open" src={require("../assets/eye-open.png")} alt="Ikona pre otvorené oko" />
                            <img className="icon closed" src={require("../assets/eye-closed.png")} alt="Ikona pre zatvorené oko" />
                            Rezervácia online
                        </a>
                    </div>

                </div>

                <Dropdown
                    category={this.state.category}
                />
            </div>
        )
    }
}

export default withRouter(Header);