import React from "react";
import { withRouter } from "next/router";

import { getStorageItem, isLogged, logout, redirect, hideTransition, diopterValues, cylinderValues, cylinderAxisValues, distanceValues, removeStorageItem, setStorageItem, addToCart } from "../config/Config";

import Loading from "../components/Loading";
import Popup from "../components/Popup";
import Heading from "../components/Heading";
import { branches, deliveryCompanies } from "../config/Database";

import Api, { API_URL } from "../config/Api";

//import "../styles/profile.css";

class Profile extends React.Component {

    state = {
        section: 1,

        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        address: "",
        psc: "",
        city: "",
        country: "",

        oldPassword: "",
        password: "",
        repeatPassword: "",

        distanceOption: "short",

        diopters: [],
        cylinder: [],
        cylinderAxes: [],
        distance: [],

        orders: [],

        loading: false,

        popup: false,
        popupLoading: false,
        message: ""
    }

    constructor() {
        super();

        this.getUser = this.getUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.logout = this.logout.bind(this);
        this.repeatOrder = this.repeatOrder.bind(this);
    }

    async getUser() {
        const { user } = this.props;

        if (user) {
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                psc: user.psc,
                city: user.city,
                country: user.country,
                orders: user.orders,

                diopters: user.diopters,
                cylinder: user.cylinder,
                cylinderAxes: user.cylinderAxes,
                distance: user.distance,

                distanceOption: user.distanceOption,
            });
        } else {
            this.props.router.push("/prihlasenie");
        }
    }

    async editUser() {
        this.setState({ popup: true, popupLoading: true });

        const token = getStorageItem("token");
        const { firstName, lastName, email, phone, address, psc, city, country, distanceOption,
                diopters, cylinder, cylinderAxes, distance } = this.state;

        var data = {};

        if (firstName.trim() !== "" && lastName.trim() !== "") data["name"] = firstName.trim() + " " + lastName.trim();
        if (email.trim() !== "") data["email"] = email.trim();
        if (phone.trim() !== "") data["phone"] = phone.trim().replace(/\s/g, "");
        if (address.trim() !== "") data["address"] = address.trim();
        if (psc.trim() !== "") data["psc"] = psc.trim();
        if (city.trim() !== "") data["city"] = city.trim();
        if (country.trim() !== "") data["country"] = country.trim();

        if (distanceOption === "short") {
            data["lenses"] = {
                diopters: [ diopters[0], diopters[1], 1001, 1001 ],
                cylinder: [ cylinder[0], cylinder[1], 1001, 1001 ],
                cylinderAxes: [ cylinderAxes[0], cylinderAxes[1], 1001, 1001 ],
                distance: [ distance[0], distance[1], 1001, 1001 ],
            }
        } else {
            data["lenses"] = {
                diopters: [ 1001, 1001, diopters[2], diopters[3] ],
                cylinder: [ 1001, 1001, cylinder[2], cylinder[3] ],
                cylinderAxes: [ 1001, 1001, cylinderAxes[2], cylinderAxes[3] ],
                distance: [ 1001, 1001, distance[2], distance[3] ],
            }
        }

        const call = await Api.editUser(data, token);

        if (call.user) {
            this.setState({ popupLoading: false, message: "Údaje boli úspešne aktualizované" });
        }
    }

    async changePassword() {
        this.setState({ popup: true, popupLoading: true });

        const { oldPassword, password, repeatPassword } = this.state;
        const token = getStorageItem("token");

        if (password.trim() !== repeatPassword.trim()) {
            this.setState({ popupLoading: false, message: "Heslá sa nezhodujú" });
        }

        const call = await Api.changePassword({
            oldPassword: oldPassword,
            password: password
        }, token);

        if (call.message === "Password changed successfully") {
            this.setState({
                popupLoading: false,
                message: "Heslo bolo úspešne zmenené",

                oldPassword: "",
                password: "",
                repeatPassword: ""
            });
        } else {
            this.setState({
                popupLoading: false,
                message: "Staré heslo je nesprávne"
            });
        }
    }

    logout() {
        logout();

        window.location.href = "/prihlasenie";
    }

    repeatOrder(order) {
        const buyingAsCompany = order.buyingAsCompany;
        const deliveryType = order.deliveryType;
        const deliveryCompany = order.deliveryCompany || "";
        const paymentType = order.paymentType;
        const fetchedProducts = order.combinedProducts;
        const products = fetchedProducts.map((product) => product._id);
        const pickUpPremises = order.premises;
        const pickUpPremisesName = branches[pickUpPremises].name;
        const price = order.discountedValue;
        const discount = order.value === order.discountedValue ? 0 : order.discountedValue - order.value;
        const userId = order.orderedBy._id;
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return(
            <div className="screen" id="profile">
                <div className="body">
                    <div className="content">
                        <div className="sidebar">
                            <div className="title">Súhrn profilu</div>

                            <div className="menu">
                                <div className={"item" + (this.state.section === 1 ? " active" : "")} onClick={() => this.setState({ section: 1 }, () => this.getUser())}><ion-icon name={"person" + (this.state.section !== 1 ? "-outline" : "")}></ion-icon>Osobné údaje</div>
                                <div className={"item" + (this.state.section === 2 ? " active" : "")} onClick={() => this.setState({ section: 2 }, () => this.getUser())}><ion-icon name={"albums" + (this.state.section !== 2 ? "-outline" : "")}></ion-icon>Objednávky</div>
                                <div className={"item" + (this.state.section === 3 ? " active" : "")} onClick={() => this.setState({ section: 3 })}><ion-icon name={"key" + (this.state.section !== 3 ? "-outline" : "")}></ion-icon>Zmena hesla</div>
                                <a className="item" href="/prihlasenie" onClick={() => logout()}>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                    Odhlásiť sa
                                </a>
                            </div>
                        </div>

                        {this.state.section === 1 ? (
                            <div className="data">
                                <div className="title">Osobné údaje</div>

                                {this.state.loading ? <Loading /> :
                                    <div className="form">
                                        <div className="section">Kontaktné údaje</div>

                                        <div className="row">
                                            <div className="item">
                                                <div className="heading">Meno</div>
                                                <input className="field" type="text" value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
                                            </div>

                                            <div className="item">
                                                <div className="heading">Priezvisko</div>
                                                <input className="field" type="text" value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
                                            </div>
                                        </div>

                                        <div style={{ height: 20 }} />

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

                                        <div className="button" onClick={() => this.editUser()}>Uložiť</div>

                                        <div style={{ height: 50 }} />

                                        <div className="section">Fakturačné údaje</div>

                                        <div className="row">
                                            <div className="item">
                                                <div className="heading">Adresa a číslo domu</div>
                                                <input className="field" type="text" value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} />
                                            </div>

                                            <div className="item">
                                                <div className="heading">PSČ</div>
                                                <input className="field" type="text" value={this.state.psc} onChange={(event) => this.setState({ psc: event.target.value })} />
                                            </div>
                                        </div>

                                        <div style={{ height: 20 }} />

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

                                        <div className="button" onClick={() => this.editUser()}>Uložiť</div>

                                        <div style={{ height: 50 }} />

                                        <div className="section" id="pds">
                                            Očné hodnoty

                                            <div style={{ flex: 1 }} />

                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <div className={"button" + (this.state.distanceOption === "long" ? " empty" : "")} onClick={() => this.setState({ distanceOption: "short" })}>Do blízky</div>
                                                <div style={{ width: 10 }} />
                                                <div className={"button" + (this.state.distanceOption === "short" ? " empty" : "")} onClick={() => this.setState({ distanceOption: "long" })}>Do diaľky</div>
                                            </div>
                                        </div>

                                        <div className="grid">
                                            <div className="empty" />
                                            <div className="heading">SPH</div>
                                            <div className="heading">CYL</div>
                                            <div className="heading">AX</div>
                                            <div className="heading">PD</div>

                                            <div className="heading">Pravé oko</div>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.diopters[0] : this.state.diopters[2]} onChange={(event) => {
                                                var { diopters, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    diopters[0] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    diopters[2] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ diopters: diopters });
                                            }}>
                                                {diopterValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                                            </select>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.cylinder[0] : this.state.cylinder[2]} onChange={(event) => {
                                                var { cylinder, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    cylinder[0] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    cylinder[2] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ cylinder: cylinder });
                                            }}>
                                                {cylinderValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                                            </select>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.cylinderAxes[0] : this.state.cylinderAxes[2]} onChange={(event) => {
                                                var { cylinderAxes, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    cylinderAxes[0] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    cylinderAxes[2] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ cylinderAxes: cylinderAxes });
                                            }}>
                                                {cylinderAxisValues().map((value) => <option value={value}>{value}</option>)}
                                            </select>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.distance[0] : this.state.distance[2]} onChange={(event) => {
                                                var { distance, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    distance[0] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    distance[2] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ distance: distance });
                                            }}>
                                                {distanceValues().map((value) => <option value={value}>{value}</option>)}
                                            </select>

                                            <div className="heading">Ľavé oko</div>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.diopters[1] : this.state.diopters[3]} onChange={(event) => {
                                                var { diopters, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    diopters[1] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    diopters[3] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ diopters: diopters });
                                            }}>
                                                {diopterValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                                            </select>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.cylinder[1] : this.state.cylinder[3]} onChange={(event) => {
                                                var { cylinder, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    cylinder[1] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    cylinder[3] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ cylinder: cylinder });
                                            }}>
                                                {cylinderValues().map((value) => <option value={value}>{value === "-" ? value : value.toFixed(2)}</option>)}
                                            </select>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.cylinderAxes[1] : this.state.cylinderAxes[3]} onChange={(event) => {
                                                var { cylinderAxes, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    cylinderAxes[1] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    cylinderAxes[3] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ cylinderAxes: cylinderAxes });
                                            }}>
                                                {cylinderAxisValues().map((value) => <option value={value}>{value}</option>)}
                                            </select>

                                            <select className="field" value={this.state.distanceOption === "short" ? this.state.distance[1] : this.state.distance[3]} onChange={(event) => {
                                                var { distance, distanceOption } = this.state;

                                                if (distanceOption === "short") {
                                                    distance[1] = event.target.value === "-" ? "1001" : event.target.value;
                                                } else {
                                                    distance[3] = event.target.value === "-" ? "1001" : event.target.value;
                                                }

                                                this.setState({ distance: distance });
                                            }}>
                                                {distanceValues().map((value) => <option value={value}>{value}</option>)}
                                            </select>
                                        </div>

                                        <div style={{ height: 20 }} />

                                        <div className="button" onClick={() => this.editUser()}>Uložiť</div>
                                    </div>
                                }
                            </div>
                        ) : null}

                        {this.state.section === 2 ? (
                            <div className="data">
                                <div className="title">Vaše objednávky</div>

                                {this.state.loading ? <Loading /> : (
                                    <div className="orders">
                                        {this.state.orders.length === 0 ? <div className="message">Nemáte žiadne objednávky</div> : this.state.orders.map((order) => <Order order={order} repeatOrder={this.repeatOrder} />)}
                                    </div>
                                )}
                            </div>
                        ) : null}

                        {this.state.section === 3 ? (
                            <div className="data">
                                <div className="title">Zmena hesla</div>

                                <div className="form">
                                    <div className="section">Zmena hesla</div>

                                    <div className="row">
                                        <div className="item">
                                            <div className="heading">Staré heslo</div>
                                            <input className="field" type="password" value={this.state.oldPassword} onChange={(event) => this.setState({ oldPassword: event.target.value })} />
                                        </div>
                                    </div>

                                    <div style={{ height: 20 }} />

                                    <div className="row">
                                        <div className="item">
                                            <div className="heading">Nové heslo</div>
                                            <input className="field" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                                        </div>

                                        <div className="item">
                                            <div className="heading">Potvrdiť nové heslo</div>
                                            <input className="field" type="password" value={this.state.repeatPassword} onChange={(event) => this.setState({ repeatPassword: event.target.value })} />
                                        </div>
                                    </div>

                                    <div style={{ height: 20 }} />

                                    <div className="text">Heslo musí byť dlhé aspoň 6 znakov a obsahovať aspoň jedno veľké písmeno a jedno číslo</div>

                                    <div className="button" onClick={() => this.changePassword()}>Uložiť</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                {this.state.popup ? (
                    <Popup
                        loading={this.state.popupLoading}
                        title={this.state.message}
                        close={() => this.setState({ popup: false })}
                    />
                ) : null}
            </div>
        )
    }
}

function Order(props) {
    const order = props.order;
    const date = order.date.split("T")[0].split("-")[2] + "." + order.date.split("T")[0].split("-")[1] + "." + order.date.split("T")[0].split("-")[0];

    const delivery = order.deliveryType === "courier" ? "Kuriér" : order.deliveryType === "pickup" ? "Osobný odber" : "Na poštu";
    const payment = order.paymentType === "cash" ? "Hotovosť" : "Kartou";

    const deliveryCompany = order.deliveryType === "courier" ? order.deliveryCompany : order.deliveryType === "pickup" ? order.pickUpPremises : "";

    return(
        <div className="order-item">
            <div className="top-panel">
                <div className="info-panel">
                    <div className="heading">Číslo objednávky</div>
                    <div className="info">{order.customId}</div>

                    <div className="heading">Dátum</div>
                    <div className="info">{date}</div>
                </div>

                <div className="summary-panel">
                    <div className="heading">Doprava</div>
                    <div className="info">{delivery} ({deliveryCompany})</div>

                    <div className="heading">Platba</div>
                    <div className="info">{payment}</div>

                    <div className="heading">Suma</div>
                    <div className="info">{(order.discountedValue / 100).toFixed(2)}€</div>
                </div>
            </div>

            <div className="products-panel">
                {order.combinedProducts.map((product, index) => (
                    <div className="product">
                        <div className="number">{index + 1}</div>
                        <div className="name">{product.name}</div>
                        <div className="info">{product.eanCode}</div>
                        <div className="info">{(product.price / 100).toFixed(2)}€</div>
                    </div>
                ))}
            </div>

            <div className="button" onClick={() => props.repeatOrder(order)}>Zopakovať objednávku</div>
        </div>
    )
}

export default withRouter(Profile);