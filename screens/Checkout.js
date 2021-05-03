import React from "react";
import { withRouter } from "next/router";

import { getStorageItem, setStorageItem, removeStorageItem, removeFromCart, addToCart, increaseCartAmount, decreaseCartAmount, redirect, hideTransition, showTransition } from "../config/Config";
import Api from "../config/Api";
import Loading from "../components/Loading";
import Popup from "../components/Popup";
import { Summary } from "./Cart";

//import "../styles/order.css";

import Icon from "../assets/empty-cart.svg";
import { get } from "jquery";

class Checkout extends React.Component {

    state = {
        price: 0,
        discount: 0,

        saleDiscount: 0,

        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        addres: "",
        psc: "",
        city: "",
        country: "",

        overwrite: false,
        overwriteAddress: "",
        overwritePsc: "",
        overwriteCity: "",
        overwriteCountry: "",

        buyingAsCompany: false,

        companyName: "",
        companyIco: "",
        companyDic: "",
        companyIcdph: "",
        companyAddress: "",
        companyPsc: "",
        companyCity: "",
        companyCountry: "",

        popup: false,
        loading: false,
        message: ""
    }

    constructor() {
        super();

        this.loadData = this.loadData.bind(this);
        this.loadOrderData = this.loadOrderData.bind(this);
        this.saveOrderData = this.saveOrderData.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.saveUserData = this.saveUserData.bind(this);
    }

    async loadData() {
        this.loadOrderData();
        await this.loadUserData();
    }

    async loadUserData() {
        const { user } = this.props;

        if (user) {
            this.setState({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                address: user.address,
                psc: user.psc,
                city: user.city,
                country: user.country,
            });

            if (user.company != null) {
                this.setState({
                    companyName: user.company.companyName,
                    companyIco: user.company.companyIco,
                    companyDic: user.company.companyDic,
                    companyIcdph: user.company.companyIcdph,
                    companyAddress: user.company.companyAddress,
                    companyPsc: user.company.companyPsc,
                    companyCity: user.company.companyCity,
                    companyCountry: user.company.companyCountry,
                });
            }
        }
    }

    async saveUserData() {
        const token = getStorageItem("token");

        const { firstname, lastname, email, phone, address, psc, city, country,
                companyName, companyIco, companyDic, companyIcdph,
                companyAddress, companyPsc, companyCity, companyCountry,
                buyingAsCompany
        } = this.state;

        if (firstname.trim() === "" ||
            lastname.trim() === "" ||
            email.trim() === "" ||
            phone.trim() === "" ||
            address.trim() === "" ||
            psc.trim() === "" ||
            city.trim() === "" ||
            country.trim() === "") {

            this.setState({
                popup: true,
                loading: false,
                message: "Všetky polia musia byť vyplnené"
            });
            return;
        }

        if (token) {
            var data = {
                name: firstname + " " + lastname,
                email: email,
                phone: phone,
                address: address,
                psc: psc,
                city: city,
                country: country
            }

            if (buyingAsCompany) {
                data["company"] = {
                    name: companyName,
                    ico: companyIco,
                    dic: companyDic,
                    icdph: companyIcdph,
                    address: companyAddress,
                    psc: companyPsc,
                    city: companyCity,
                    country: companyCountry
                }
            }

            const call = await Api.editUser(data, token);

            if (call.user) {
                showTransition();
                this.props.router.push("/doprava-a-platba");
            } else {
                this.setState({
                    popup: true,
                    loading: false,
                    message: "Niektoré údaje sú v zlom formáte"
                });
            }
        }
    }

    async saveOrderData() {
        const token = getStorageItem("token");
        var userId = null;

        if (token) {
            const call = await Api.profile(token);

            if (call.user) {
                userId = call.user._id;
            } else {
                this.setState({
                    popup: true,
                    loading: false,
                    message: "Nastala chyba pri objednávke"
                });

                return;
            }
        } else {
            const { firstname, lastname, email, phone, address, psc, city, country,
                    buyingAsCompany, companyName, companyIco, companyDic, companyIcdph,
                    companyAddress, companyPsc, companyCity, companyCountry } = this.state;

            const lenses = getStorageItem("lenses");

            var data = {
                name: firstname.trim() + " " + lastname.trim(),
                email: email.trim(),
                phone: phone.trim(),
                address: address.trim(),
                psc: psc.trim(),
                city: city.trim(),
                country: country.trim(),
                lenses: lenses
            }

            if (lenses) {
                data["lenses"] = lenses;
            }

            if (buyingAsCompany) {
                data["company"] = {
                    name: companyName.trim(),
                    ico: companyIco.trim(),
                    dic: companyDic.trim(),
                    icdph: companyIcdph.trim(),
                    address: companyAddress.trim(),
                    psc: companyPsc.trim(),
                    city: companyCity.trim(),
                    country: companyCountry.trim()
                }
            }

            const call = await Api.tempUser(data);

            if (call.id) {
                userId = call.id;
            } else {
                this.setState({
                    popup: true,
                    loading: false,
                    message: "Nastala chyba pri objednávke"
                });

                return;
            }
        }

        const orderData = getStorageItem("order");

        var newOrderData = {
            ...orderData,
            userId: userId,
            buyingAsCompany: this.state.buyingAsCompany
        };

        if (this.state.overwrite) {
            newOrderData["overwrite"] = {
                address: this.state.overwriteAddress.trim(),
                psc: this.state.overwritePsc.trim(),
                city: this.state.overwriteCity.trim(),
                country: this.state.overwriteCountry.trim()
            }
        }

        setStorageItem("order", newOrderData);
    }

    loadOrderData() {
        const data = getStorageItem("order");

        this.setState({
            price: data.price,
            discount: data.discount,
            saleDiscount: data.saleDiscount
        });
    }

    async componentDidMount() {
        showTransition();
        this.props.router.push("/pripravujeme");

        await this.loadData();

        hideTransition();
    }

    render() {
        var summaryData = [];
        summaryData.push([ "Suma", (this.state.price / 100).toFixed(2) ]);
        summaryData.push([ "Kupón", (this.state.discount / 100).toFixed(2) ]);

        if (this.state.saleDiscount !== 0) {
            summaryData.push([ "Zľava 1+1", (this.state.saleDiscount / 100).toFixed(2) ]);
        }

        return(
            <div className="screen order-screen" id="checkout">
                <div className="body">
                    <div className="left-panel">
                        <div className="cart-header">
                            <div className="heading">Košík</div>
                            <div className="divider" />
                            <div className="heading active">Osobné údaje</div>
                            <div className="divider" />
                            <div className="heading">Doprava</div>
                            <div className="divider" />
                            <div className="heading">Potvrdenie</div>
                        </div>

                        <br />

                        <div className="section">Kontaktné údaje</div>

                        <div className="row">
                            <div className="item">
                                <div className="heading">Meno</div>
                                <input className="field" type="text" value={this.state.firstname} onChange={(event) => this.setState({ firstname: event.target.value })} />
                            </div>
                        
                            <div className="item">
                                <div className="heading">Priezvisko</div>
                                <input className="field" type="text" value={this.state.lastname} onChange={(event) => this.setState({ lastname: event.target.value })} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="item">
                                <div className="heading">E-mail</div>
                                <input className="field" type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                            </div>

                            <div className="item">
                                <div className="heading">Telefónne číslo</div>
                                <input className="field" type="text" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
                            </div>
                        </div>

                        <div style={{ height: 20 }} />

                        <div className="section">Adresa</div>

                        <div className="row">
                            <div className="item">
                                <div className="heading">Adresa</div>
                                <input className="field" type="text" value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} />
                            </div>
                        
                            <div className="item">
                                <div className="heading">PSČ</div>
                                <input className="field" type="text" value={this.state.psc} onChange={(event) => this.setState({ psc: event.target.value })} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="item">
                                <div className="heading">Mesto</div>
                                <input className="field" type="text" value={this.state.city} onChange={(event) => this.setState({ city: event.target.value })} />
                            </div>
                        
                            <div className="item">
                                <div className="heading">Krajina</div>
                                <input className="field" type="text" value={this.state.country} onChange={(event) => this.setState({ country: event.target.value })} />
                            </div>
                        </div>

                        <div style={{ height: 20 }} />
                        
                        <div className="address-choice">
                            <div className="title">Iná fakturačná adresa</div>
                            <div className="button-panel">
                                <div className="button" onClick={() => this.setState({ overwrite: true })}  style={this.state.overwrite ? null : { backgroundColor: "rgba(0, 0, 0, 0.1)", color: "black" }}>Áno</div>
                                <div className="button" onClick={() => this.setState({ overwrite: false })} style={!this.state.overwrite ? null : { backgroundColor: "rgba(0, 0, 0, 0.1)", color: "black" }}>Nie</div>
                            </div>
                        </div>

                        <div style={{ height: 20 }} />

                        {this.state.overwrite ?
                            <div className="section">Fakturačná adresa</div>
                        : null}

                        {this.state.overwrite ?
                            <div className="row">
                                <div className="item">
                                    <div className="heading">Adresa</div>
                                    <input className="field" type="text" value={this.state.overwriteAddress} onChange={(event) => this.setState({ overwriteAddress: event.target.value })} />
                                </div>
                            
                                <div className="item">
                                    <div className="heading">PSČ</div>
                                    <input className="field" type="text" value={this.state.overwritePsc} onChange={(event) => this.setState({ overwritePsc: event.target.value })} />
                                </div>
                            </div>
                        : null}

                        {this.state.overwrite ?
                             <div className="row">
                                <div className="item">
                                    <div className="heading">Mesto</div>
                                    <input className="field" type="text" value={this.state.overwriteCity} onChange={(event) => this.setState({ overwriteCity: event.target.value })} />
                                </div>
                            
                                <div className="item">
                                    <div className="heading">Krajina</div>
                                    <input className="field" type="text" value={this.state.overwriteCountry} onChange={(event) => this.setState({ overwriteCountry: event.target.value })} />
                                </div>
                            </div>
                        : null}

                        <div style={{ height: 20 }} />

                        <div className="section">
                            {this.state.buyingAsCompany ? "Firemné údaje" : "Nákup na firmu"}
                            <div style={{ flex: 1 }} />
                            <div className="button" onClick={() => this.setState({ buyingAsCompany: true })} style={this.state.buyingAsCompany ? { marginRight: 15 } : { backgroundColor: "rgba(0, 0, 0, 0.1)", color: "black", marginRight: 15 }}>Áno</div>
                            <div className="button" onClick={() => this.setState({ buyingAsCompany: false })} style={!this.state.buyingAsCompany ? null : { backgroundColor: "rgba(0, 0, 0, 0.1)", color: "black" }}>Nie</div>
                        </div>

                        {this.state.buyingAsCompany ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                                <div className="row">
                                    <div className="item">
                                        <div className="heading">Názov firmy</div>
                                        <input className="field" type="text" value={this.state.companyName} onChange={(event) => this.setState({ companyName: event.target.value })} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="item">
                                        <div className="heading">Adresa firmy</div>
                                        <input className="field" type="text" value={this.state.companyAddress} onChange={(event) => this.setState({ companyAddress: event.target.value })} />
                                    </div>

                                    <div className="item">
                                        <div className="heading">PSČ</div>
                                        <input className="field" type="text" value={this.state.companyPsc} onChange={(event) => this.setState({ companyPsc: event.target.value })} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="item">
                                        <div className="heading">Mesto</div>
                                        <input className="field" type="text" value={this.state.companyCity} onChange={(event) => this.setState({ companyCity: event.target.value })} />
                                    </div>

                                    <div className="item">
                                        <div className="heading">Krajina</div>
                                        <input className="field" type="text" value={this.state.companyCountry} onChange={(event) => this.setState({ companyCountry: event.target.value })} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="item">
                                        <div className="heading">IČO</div>
                                        <input className="field" type="text" value={this.state.companyIco} onChange={(event) => this.setState({ companyIco: event.target.value })} />
                                    </div>

                                    <div className="item">
                                        <div className="heading">DIČ</div>
                                        <input className="field" type="text" value={this.state.companyDic} onChange={(event) => this.setState({ companyDic: event.target.value })} />
                                    </div>

                                    <div className="item">
                                        <div className="heading">IČDPH</div>
                                        <input className="field" type="text" value={this.state.companyIcdph} onChange={(event) => this.setState({ companyIcdph: event.target.value })} />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <Summary
                        data={summaryData}
                        onClick={async () => {
                            await this.saveOrderData();
                            this.saveUserData();
                        }}
                        buttonTitle="Pokračovať"
                    />
                </div>

                {this.state.popup ? (
                    <Popup
                        loading={this.state.loading}
                        title={this.state.message}
                        close={() => this.setState({ popup: false })}
                    />
                ) : null}
            </div>
        )
    }
}

export default withRouter(Checkout);