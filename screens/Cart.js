import React from "react";
import { withRouter } from "next/router";

import { getStorageItem, setStorageItem, removeStorageItem, removeFromCart, addToCart, increaseCartAmount, decreaseCartAmount, hideTransition, redirect, showTransition } from "../config/Config";
import Api, { API_URL } from "../config/Api";
import Popup from "../components/Popup";
import Loading from "../components/Loading";

//import "../styles/order.css";

class Cart extends React.Component {

    state = {
        combinedProducts: [],

        price: 0,
        coupon: "",
        discount: 0,

        saleDiscount: 0,
        saleProducts: [],

        popup: false,
        message: "",
        loading: false
    }

    constructor() {
        super();

        this.loadData = this.loadData.bind(this);
        this.evaluateCoupon = this.evaluateCoupon.bind(this);
        this.saveOrderData = this.saveOrderData.bind(this);

        this.calculateSaleDiscount = this.calculateSaleDiscount.bind(this);
        this.isInSaleProducts = this.isInSaleProducts.bind(this);
    }

    async loadData() {
        const { combinedProducts, price } = this.props;

        this.setState({
            combinedProducts: combinedProducts,
            price: price
        });
    }

    async evaluateCoupon() {
        this.setState({
            popup: true,
            loading: true
        });

        const { coupon, price } = this.state;

        const call = await Api.getCoupon(coupon.trim());

        if (call.coupon) {
            var discount = 0;

            if (call.coupon.type === "flat") {
                discount = call.coupon.value;
            } else if (call.coupon.type === "percentage") {
                discount = price * (call.coupon.value / 100);
            }

            this.setState({ 
                discount: -discount,
                loading: false,
                message: "Zľavový kupón úspešne pridaný"
            });
        } else {
            this.setState({
                loading: false,
                message: "Nesprávny zľavový kupón"
            });
        }
    }

    saveOrderData() {
        const { combinedProducts, price, coupon, discount, saleDiscount, saleProducts } = this.state;

        if (combinedProducts.length === 0) {
            this.setState({
                popup: true,
                loading: false,
                message: "Váš košík je prázdny"
            });

            return;
        }

        setStorageItem("order", {
            products: getStorageItem("cart"),
            fetchedProducts: combinedProducts,
            price: price,
            discount: discount,
            coupon: coupon,

            saleDiscount: saleDiscount,
            saleProducts: saleProducts
        });

        showTransition();
        this.props.router.push("/osobne-udaje");
    }

    async componentDidMount() {
        showTransition();
        this.props.router.push("/pripravujeme");

        await this.loadData();
        await this.calculateSaleDiscount();

        hideTransition();
    }

    async calculateSaleDiscount() {
        var cart = getStorageItem("cart");

        var products = [];

        var branded = [];
        var nonBranded = [];

        var nonBrandedIds = [];
        var saleDiscount = 0;

        // load products from backend
        for (let i = 0; i < cart.length; i++) {
            const call = await Api.getCombinedProduct(cart[i]);

            if (call.combinedProduct) {
                products.push(call.combinedProduct);
            }
        }

        // separate branded and non-branded products
        for (let i = 0; i < products.length; i++) {
            var product = products[i];

            if (product.product.brand !== "Neznačkové") {
                branded.push(product);
            } else {
                nonBranded.push(product);
            }
        }

        // generate branded - non-branded sale
        for (let i = 0; i < branded.length; i++) {
            const nonBrandedProduct = nonBranded[i];

            if (nonBrandedProduct) {
                nonBrandedIds.push(nonBrandedProduct._id);
                saleDiscount -= nonBrandedProduct.product.price;
            }
        }

        var remainingNonBranded = nonBranded.slice(nonBrandedIds.length, nonBranded.length);

        remainingNonBranded.sort((a, b) => {
            if (a.discountedPrice > b.discountedPrice) {
                return 1;
            } else {
                return -1;
            }
        });

        // generate non-branded - non-branded sale
        for (let i = 0; i < parseInt(remainingNonBranded.length / 2); i++) {
            const nonBrandedProduct = remainingNonBranded[i];
            nonBrandedIds.push(nonBrandedProduct._id);
            saleDiscount -= nonBrandedProduct.product.price;
        }

        this.setState({
            saleDiscount: saleDiscount,
            saleProducts: nonBrandedIds
        });
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
        var summaryData = [];
        summaryData.push([ "Suma", (this.state.price / 100).toFixed(2) ]);
        summaryData.push([ "Kupón", (this.state.discount / 100).toFixed(2) ]);

        if (this.state.saleDiscount !== 0) {
            summaryData.push([ "Zľava 1+1", (this.state.saleDiscount / 100).toFixed(2) ]);
        }

        return(
            <div className="screen order-screen" id="cart">
                <div className="body">
                    <div className="left-panel">
                        <div className="cart-header">
                            <div className="heading active">Košík</div>
                            <div className="divider" />
                            <div className="heading">Osobné údaje</div>
                            <div className="divider" />
                            <div className="heading">Doprava</div>
                            <div className="divider" />
                            <div className="heading">Potvrdenie</div>
                        </div>

                        {this.state.combinedProducts.length === 0 ? (
                            <div className="empty">Váš košík je prázdny</div>
                        ) : this.state.combinedProducts.map((combinedProduct, index) => <CartItem combinedProduct={combinedProduct} withSale={this.isInSaleProducts(combinedProduct._id)} withBorder={index === this.state.combinedProducts.length - 1 ? false : true} />)}

                        {this.state.combinedProducts.length > 0 ? (
                            <div className="coupon-panel">
                                <div className="title">Zľavový kupón</div>

                                <div className="panel">
                                    <input className="field" type="text" value={this.state.coupon} onChange={(event) => this.setState({ coupon: event.target.value })} placeholder="Zľavový kupón" />
                                    <div className="button" onClick={() => this.evaluateCoupon()}>Použiť</div>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <Summary
                        data={summaryData}
                        onClick={() => this.saveOrderData()}
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

export function Summary(props) {
    const data = props.data;
    const onClick = props.onClick;
    const buttonTitle = props.buttonTitle;
    var total = 0;

    for (let i = 0; i < data.length; i++) {
        total += parseFloat(data[i][1]);
    }

    return(
        <div className="summary">
            <div className="title">Súhrn</div>

            <div className="form">
                {data.map((item) => <div className="item">{item[0]}<div className="price">{parseFloat(item[1]).toFixed(2)}€</div></div>)}
                <div className="item" style={{ marginTop: 30 }}>Celková suma<div className="price">{total.toFixed(2)}€</div></div>
                <div className="button" onClick={onClick}>{buttonTitle}</div>
            </div>
        </div>
    )
}

function CartItem(props) {
    const combinedProduct = props.combinedProduct;
    const product = combinedProduct.product;
    const src = API_URL + "/uploads/" + product.image.imagePath;
    const lens = combinedProduct.lens;
    const specs = combinedProduct.lenses;
    const price = combinedProduct.price;

    const productPrice = props.withSale ? 0 : product.price;
    const lensPrice = lens ? lens.price : 0;
    const totalPrice = productPrice + (lensPrice * 2);

    return(
        <div className="product" style={props.withBorder ? { borderBottom: "1px solid rgba(0, 0, 0, 0.1)" } : null}>
            <img className="image" src={src} alt={"Fotka produktu " + product.name} />

            <div className="info">
                <div className="name">{product.name}</div>
                <div className="description">{product.eanCode}</div>
                
                <div className="info-panel">
                    <div className="label">Produkt</div>
                    <div className="value">{product.name}</div>
                    <div className="pricing">{productPrice === 0 ? "ZADARMO" : (productPrice / 100).toFixed(2) + "€"}</div>
                    {lens ? <div className="label">Šošovky</div> : null}
                    {lens ? <div className="value">{lens.name}</div> : null}
                    {lens ? <div className="pricing">{(lensPrice / 100 * 2).toFixed(2)}€</div> : null}
                </div>

                <div style={{ flex: 1 }} />

                <div className="toolbar">
                    <div className="button" onClick={() => {
                        removeFromCart(combinedProduct._id);
                        window.location.reload();
                    }}>Vymazať</div>

                    <div style={{ flex: 1 }} />

                    <div className="price">
                        {totalPrice === 0 ? "ZADARMO" : (totalPrice / 100).toFixed(2) + "€"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Cart);