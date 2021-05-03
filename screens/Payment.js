import React from "react";
import { withRouter } from "next/router";

import { getStorageItem, setStorageItem, courierDeliveryPrice, courierPaymentPrice, mailPaymentPrice, redirect, hideTransition, showTransition } from "../config/Config";
import { branches, deliveryCompanies } from "../config/Database";
import Api from "../config/Api";
import Loading from "../components/Loading";
import { Summary } from "./Cart";

//import "../styles/order.css";

class Payment extends React.Component {

    state = {
        price: 0,
        discount: 0,
        saleDiscount: 0,

        deliveryType: "courier",
        paymentType: "card",

        deliveryCompany: 0,
        pickUpPremises: 0,
    }

    constructor() {
        super();

        this.loadData = this.loadData.bind(this);
        this.loadOrderData = this.loadOrderData.bind(this);
        this.saveOrderData = this.saveOrderData.bind(this);
    }

    async loadData() {
        this.loadOrderData();
    }

    saveOrderData() {
        const { deliveryType, paymentType, deliveryCompany, pickUpPremises } = this.state;
        const orderData = getStorageItem("order");

        setStorageItem("order", {
            ...orderData,
            deliveryType: deliveryType,
            paymentType: paymentType,
            deliveryCompany: deliveryCompanies[deliveryCompany].name,
            pickUpPremises: branches[pickUpPremises].calendar,
            pickUpPremisesName: branches[pickUpPremises].name
        });

        showTransition();
        this.props.router.push("/potvrdenie");
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
        await this.loadData();

        hideTransition();
    }

    render() {
        showTransition();
        this.props.router.push("/pripravujeme");

        var summaryData = [];
        summaryData.push([ "Suma", (this.state.price / 100).toFixed(2) ]);
        summaryData.push([ "Kupón", (this.state.discount / 100).toFixed(2) ]);

        if (this.state.saleDiscount !== 0) {
            summaryData.push([ "Zľava 1+1", (this.state.saleDiscount / 100).toFixed(2) ]);
        }

        var courierPrice = (this.state.price - this.state.discount) >= 10000 ? 0.0 : (courierDeliveryPrice / 100).toFixed(2);

        if (this.state.deliveryType === "courier") summaryData.push([ "Doprava", courierPrice ]);
        if (this.state.deliveryType === "courier" && this.state.paymentType === "cash") summaryData.push([ "Dobierka", (courierPaymentPrice / 100) ]);
        if (this.state.deliveryType === "pickup") summaryData.push([ "Osobný odber", 0 ]);
        if (this.state.deliveryType === "mail" && this.state.paymentType === "cash") summaryData.push([ "Pošta", (mailPaymentPrice / 100) ]);

        return(
            <div className="screen order-screen" id="payment">
                <div className="body">
                    <div className="left-panel">
                        <div className="cart-header">
                            <div className="heading">Košík</div>
                            <div className="divider" />
                            <div className="heading">Osobné údaje</div>
                            <div className="divider" />
                            <div className="heading active">Doprava</div>
                            <div className="divider" />
                            <div className="heading">Potvrdenie</div>
                        </div>

                        <br />

                        <div className="section">Doprava</div>

                        <div className="chooser">
                            <div className="item" onClick={() => this.setState({ deliveryType: "courier", paymentType: "card" })} style={this.state.deliveryType === "courier" ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                <div className="bullet">{this.state.deliveryType === "courier" ? <div className="selected" /> : null}</div>
                                <ion-icon name="car-outline"></ion-icon>
                                <div className="title">Doprava kuriérom</div>
                                <div style={{ flex: 1 }} />
                                <div className="price">{parseFloat(courierPrice).toFixed(2)}€</div>
                            </div>

                            {this.state.deliveryType === "courier" ? (
                                <div className="options">
                                    {deliveryCompanies.map((company, index) => (
                                        <div className="item" onClick={() => this.setState({ deliveryCompany: index })} style={this.state.deliveryCompany === index ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                            <div className="bullet">{this.state.deliveryCompany === index ? <div className="selected" /> : null}</div>
                                            <div className="image" />
                                            <div className="title">{company.name}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            <div className="item" onClick={() => this.setState({ deliveryType: "pickup", paymentType: "card" })} style={this.state.deliveryType === "pickup" ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                <div className="bullet">{this.state.deliveryType === "pickup" ? <div className="selected" /> : null}</div>
                                <ion-icon name="cube-outline"></ion-icon>
                                <div className="title">Osobný odber</div>
                                <div style={{ flex: 1 }} />
                                <div className="price">0.00€</div>
                            </div>

                            {this.state.deliveryType === "pickup" ? (
                                <div className="options">
                                    {branches.map((branch, index) => (
                                        <div className="item" onClick={() => this.setState({ pickUpPremises: index })} style={this.state.pickUpPremises === index ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                            <div className="bullet">{this.state.pickUpPremises === index ? <div className="selected" /> : null}</div>
                                            <ion-icon name="storefront-outline"></ion-icon>
                                            <div className="title">{branch.name}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            <div className="item" onClick={() => this.setState({ deliveryType: "mail", paymentType: "cash" })} style={this.state.deliveryType === "mail" ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                <div className="bullet">{this.state.deliveryType === "mail" ? <div className="selected" /> : null}</div>
                                <ion-icon name="mail-outline"></ion-icon>
                                <div className="title">Na poštu</div>
                                <div style={{ flex: 1 }} />
                                <div className="price">{(mailPaymentPrice / 100).toFixed(2)}€</div>
                            </div>
                        </div>

                        <br />

                        <div className="section">Platba</div>

                        <div className="chooser">
                            {this.state.deliveryType === "courier" || this.state.deliveryType === "pickup" ? (
                                <div className="item" onClick={() => this.setState({ paymentType: "card" })} style={this.state.paymentType === "card" ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                    <div className="bullet">{this.state.paymentType === "card" ? <div className="selected" /> : null}</div>
                                    <ion-icon name="card-outline"></ion-icon>
                                    <div className="title">Platba kartou</div>
                                    <div style={{ flex: 1 }} />
                                    <div className="price">0.00€</div>
                                </div>
                            ) : null}

                            {this.state.deliveryType === "pickup" || this.state.deliveryType === "mail" ? (
                                <div className="item" onClick={() => this.setState({ paymentType: "cash" })} style={this.state.paymentType === "cash" ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                    <div className="bullet">{this.state.paymentType === "cash" ? <div className="selected" /> : null}</div>
                                    <ion-icon name="wallet-outline"></ion-icon>
                                    <div className="title">Platba v hotovosti</div>
                                    <div style={{ flex: 1 }} />
                                    <div className="price">0.00€</div>
                                </div>
                            ) : null}

                            {this.state.deliveryType === "courier" ? (
                                <div className="item" onClick={() => this.setState({ paymentType: "cash" })} style={this.state.paymentType === "cash" ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null}>
                                    <div className="bullet">{this.state.paymentType === "cash" ? <div className="selected" /> : null}</div>
                                    <ion-icon name="wallet-outline"></ion-icon>
                                    <div className="title">Platba na dobierku</div>
                                    <div style={{ flex: 1 }} />
                                    <div className="price">{(courierPaymentPrice / 100).toFixed(2)}€</div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <Summary
                        data={summaryData}
                        onClick={() => {
                            this.saveOrderData();
                        }}
                        buttonTitle="Pokračovať"
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Payment);