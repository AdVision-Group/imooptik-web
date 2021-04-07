import React from "react";
import { withRouter } from "next/router";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { getStorageItem, setStorageItem, getTotalPrice, courierDeliveryPrice, courierPaymentPrice, mailPaymentPrice, redirect, hideTransition } from "../config/Config";
import Api, { API_URL } from "../config/Api";
import Loading from "../components/Loading";
import Popup from "../components/Popup";
import { Summary } from "./Cart";

import CardForm from "../components/CardForm";

//import "../styles/order.css";

import Icon from "../assets/empty-cart.svg";

const promise = loadStripe("pk_test_51Hc5rMFGDIXHKcdbAeI9FeG5b2rAXAu6ATFBsoxB3bBCA7ajJ8UhroPzGVq3eOBDtKqRxVNMr4wKPFnP9zP8Zkts00jnc80SNN");

class Confirm extends React.Component {

    state = {
        price: 0,
        discount: 0,
        saleDiscount: 0,
        saleProducts: [],

        overwrite: null,

        coupon: "",
        deliveryType: "",
        paymentType: "",

        buyingAsCompany: false,

        deliveryCompany: "",
        pickUpPremises: null,
        pickUpPremisesName: "",

        products: [],

        user: {},

        popup: false,
        loading: true,
        message: ""
    }

    constructor() {
        super();

        this.loadData = this.loadData.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.loadOrderData = this.loadOrderData.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.pay = this.pay.bind(this);
        this.redirectHome = this.redirectHome.bind(this);
        this.isInSaleProducts = this.isInSaleProducts.bind(this);
    }

    redirectHome() {
        window.location.href = "/";
        //redirect(this.props.location, "/dakujeme-za-nakup");
    }

    async createOrder() {
        const orderData = getStorageItem("order");

        var data = {
            user: orderData.userId,
            combinedProducts: orderData.products,
            buyingAsCompany: orderData.buyingAsCompany
        }

        if (orderData.overwrite) {
            data["overwrite"] = orderData.overwrite;
        }

        const call = await Api.createOrder(data);

        if (call.orderId) {
            return call.orderId;
        }

        return null;
    }

    async pay() {
        this.setState({
            popup: true,
            loading: true
        });

        const orderId = await this.createOrder();

        if (orderId === null) {
            this.setState({
                loading: false,
                message: "Nastala chyba pri dokončení objednávky"
            });

            return;
        }

        var orderData = {
            paymentType: this.state.paymentType,
            deliveryType: this.state.deliveryType,
            onePlusOne: this.state.saleDiscount == 0 ? false : true
        }

        if (this.state.discount !== 0 && this.state.coupon !== "") {
            orderData["couponCode"] = this.state.coupon;
        }

        if (this.state.deliveryType === "courier") {
            orderData["deliveryCompany"] = this.state.deliveryCompany;
        } else if (this.state.deliveryType === "pickup") {
            orderData["pickUpPremises"] = this.state.pickUpPremises;
        }

        const call = await Api.createPayment(orderId, orderData);

        if (call.order) {
            setStorageItem("cart", []);
            
            window.location.href = "/";
            //redirect(this.props.location, "/dakujeme-za-nakup");
        } else {
            this.setState({
                loading: false,
                message: "Nastala chyba pri dokončení objednávky"
            });
        }
    }

    loadData() {
        this.loadUserData();
        this.loadOrderData();
    }

    loadUserData() {
        const { user } = this.props;

        if (user) {
            this.setState({
                user: user
            });
        }
    }

    loadOrderData() {
        const data = getStorageItem("order");

        this.setState({
            price: data.price,
            discount: data.discount,
            saleDiscount: data.saleDiscount,
            saleProducts: data.saleProducts,
            coupon: data.coupon,
            deliveryType: data.deliveryType,
            paymentType: data.paymentType,
            products: data.fetchedProducts,
            deliveryCompany: data.deliveryCompany,
            pickUpPremises: data.pickUpPremises,
            pickUpPremisesName: data.pickUpPremisesName,
            buyingAsCompany: data.buyingAsCompany,
            overwrite: data.overwrite
        });
    }

    async componentDidMount() {
        this.loadData();
    }

    isInSaleProducts(id) {
        const { saleProducts } = this.state;

        for (let i = 0; i < saleProducts.length; i++) {
            if (saleProducts[i] === id) {
                return true;
            }
        }

        return false;
    }

    render() {
        var orderData = {
            paymentType: this.state.paymentType,
            deliveryType: this.state.deliveryType,
            onePlusOne: this.state.discount == 0 ? false : true
        }

        if (this.state.discount !== 0 && this.state.coupon !== "") {
            orderData["couponCode"] = this.state.coupon;
        }

        return(
            <div className="screen order-screen" id="confirm">
                <div className="body">
                    <div className="left-panel">
                        <div className="cart-header">
                            <div className="heading">Košík</div>
                            <div className="divider" />
                            <div className="heading">Osobné údaje</div>
                            <div className="divider" />
                            <div className="heading">Doprava</div>
                            <div className="divider" />
                            <div className="heading active">Potvrdenie</div>
                        </div>

                        <br />

                        <div className="title">Súhrn</div>

                        <div className="content">
                            <div className="left">
                                <div className="section">Osobné údaje</div>

                                <div className="user-info">
                                    <div className="heading">Meno</div>
                                    <div className="info">{this.state.user.name && this.state.user.name.split(" ")[0]}</div>
                                    <div className="heading">Priezvisko</div>
                                    <div className="info">{this.state.user.name && this.state.user.name.split(" ")[1]}</div>
                                    <div className="heading">E-mail</div>
                                    <div className="info">{this.state.user.email}</div>
                                    <div className="heading">Telefón</div>
                                    <div className="info">{this.state.user.phone}</div>
                                    <div className="heading">Adresa</div>
                                    <div className="info">{this.state.user.address}</div>
                                    <div className="heading">PSČ</div>
                                    <div className="info">{this.state.user.psc}</div>
                                    <div className="heading">Mesto</div>
                                    <div className="info">{this.state.user.city}</div>
                                    <div className="heading">Krajina</div>
                                    <div className="info">{this.state.user.country}</div>
                                </div>

                                {this.state.overwrite ?
                                    <div className="section">Fakturačná adresa</div>
                                : null}

                                {this.state.overwrite ?
                                    <div className="user-info">
                                        <div className="heading">Adresa</div>
                                        <div className="info">{this.state.overwrite.address}</div>
                                        <div className="heading">PSČ</div>
                                        <div className="info">{this.state.overwrite.psc}</div>
                                        <div className="heading">Mesto</div>
                                        <div className="info">{this.state.overwrite.city}</div>
                                        <div className="heading">Krajina</div>
                                        <div className="info">{this.state.overwrite.country}</div>
                                    </div>
                                : null}

                                {this.state.buyingAsCompany ?
                                    <div className="section">Nákup na firmu</div>
                                : null}

                                {this.state.buyingAsCompany ?
                                    <div className="user-info">
                                        <div className="heading">Názov firmy</div>
                                        <div className="info">{this.state.user.company.name ? this.state.user.company.name : "-"}</div>
                                        <div className="heading">Adresa</div>
                                        <div className="info">{this.state.user.company.address ? this.state.user.company.address : "-"}</div>
                                        <div className="heading">PSČ</div>
                                        <div className="info">{this.state.user.company.psc ? this.state.user.company.psc : "-"}</div>
                                        <div className="heading">Mesto</div>
                                        <div className="info">{this.state.user.company.city ? this.state.user.company.city : "-"}</div>
                                        <div className="heading">Krajina</div>
                                        <div className="info">{this.state.user.company.country ? this.state.user.company.country : "-"}</div>
                                        <div className="heading">IČO</div>
                                        <div className="info">{this.state.user.company.ico ? this.state.user.company.ico : "-"}</div>
                                        <div className="heading">DIČ</div>
                                        <div className="info">{this.state.user.company.dic ? this.state.user.company.dic : "-"}</div>
                                        <div className="heading">IČDPH</div>
                                        <div className="info">{this.state.user.company.icdph ? this.state.user.company.icdph : "-"}</div>
                                    </div>
                                : null}         

                                <div className="section">Suma</div>

                                <div className="payment-info">
                                    <div className="heading">Kupón</div>
                                    <div className="info">{this.state.coupon === "" ? "-" : this.state.coupon}</div>
                                    <div className="info">{(this.state.discount / 100).toFixed(2)}€</div>

                                    <div className="heading">Zľava 1+1</div>
                                    <div className="info">{this.state.saleDiscount === 0 ? "-" : "Áno"}</div>
                                    <div className="info">{(this.state.saleDiscount / 100).toFixed(2)}€</div>

                                    <div className="heading">Doprava</div>
                                    <div className="info">
                                        {this.state.deliveryType === "courier" ? "Doprava kuriérom (" + this.state.deliveryCompany + ")" : ""}
                                        {this.state.deliveryType === "pickup" ? "Osobný odber (" + this.state.pickUpPremisesName + ")" : ""}
                                        {this.state.deliveryType === "mail" ? "Na poštu" : ""}
                                    </div>
                                    <div className="info">
                                        {this.state.deliveryType === "courier" ? ((this.state.price - this.state.discount) >= 10000 ? (0).toFixed(2) : (courierDeliveryPrice / 100).toFixed(2)) + "€" : ""}
                                        {this.state.deliveryType === "pickup" ? "0.00€" : ""}
                                        {this.state.deliveryType === "mail" ? (mailPaymentPrice / 100).toFixed(2) + "€" : ""}
                                    </div>


                                    <div className="heading">Platba</div>
                                    <div className="info">
                                        {this.state.paymentType === "card" ? "Platba kartou" : ""}
                                        {this.state.paymentType === "cash" ? (
                                            (this.state.deliveryType === "courier" ? "Dobierka" : "V hotovosti")
                                         ) : null}
                                    </div>
                                    <div className="info">
                                        {this.state.paymentType === "card" ? "0.00€" : ""}
                                        {this.state.paymentType === "cash" ? (
                                            (this.state.deliveryType === "courier" ? (courierPaymentPrice / 100).toFixed(2) + "€" : "0.00€")
                                         ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                <div className="section">Košík</div>

                                <div className="products">
                                    {this.state.products.map((product) => <Product combinedProduct={product} withSale={this.isInSaleProducts(product._id)} />)}
                                </div>
                            </div>
                        </div>

                        {this.state.paymentType === "card" ? (
                            <Elements stripe={promise} style={{ width: "100%" }}>
                                <CardForm createOrder={this.createOrder} orderData={orderData} redirect={this.redirectHome} />
                            </Elements>
                        ) : null}

                        <div className="section"></div>

                        <div className="bottom-panel">
                            <div className="total-price">Celková suma: {(getTotalPrice(this.state.price, this.state.discount, this.state.saleDiscount, this.state.deliveryType, this.state.paymentType) / 100).toFixed(2)}€</div>
                            {this.state.paymentType !== "card" ? <div className="button" onClick={() => this.pay()}>Objednať</div> : null}
                        </div>
                    </div>
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

function Product(props) {
    const combinedProduct = props.combinedProduct;
    const product = combinedProduct.product;
    const lens = combinedProduct.lens;
    const specs = combinedProduct.lenses;
    const price = combinedProduct.price;

    const productPrice = props.withSale ? 0 : product.price;
    const lensPrice = lens ? lens.price : 0;
    const totalPrice = productPrice + (lensPrice * 2);

    return(
        <div className="product">
            <img className="image" src={API_URL + "/uploads/" + product.image.imagePath} alt={"Fotka produktu " + product.name} />

            <div className="info">
                <div className="name">{product.name}</div>
                <div className="description">{product.eanCode}</div>
                
                {lens ?
                <div className="info-panel">
                    <div className="label">Šošovky</div>
                    <div className="value">{lens.name}</div>
                </div>
                : null}

                <div className="price">
                    {totalPrice === 0 ? "ZADARMO" : (totalPrice / 100).toFixed(2) + "€"}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Confirm);