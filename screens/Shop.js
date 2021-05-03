import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import Product from "../components/Product";
import Loading from "../components/Loading";

import { redirect, hideTransition, showTransition } from "../config/Config";
import { categories, collections, pricing, frameStyles, brands } from "../config/Database";

import Api from "../config/Api";

//import "../styles/shop.css";

class Shop extends React.Component {

    state = {
        loading: false,

        products: [],

        search: "",
        limit: 9,
        skip: 0,

        category: 1,
        sex: "",
        price: 0,

        brand: "",

        frameStyle: "",

        filterHidden: false,
    }

    constructor() {
        super();

        this.handkeKeyPress = this.handkeKeyPress.bind(this);
        this.openFilter = this.openFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);

        this.getCategoryName = this.getCategoryName.bind(this);
        this.getCollectionName = this.getCollectionName.bind(this);
        this.getPriceName = this.getPriceName.bind(this);
        this.getBrandName = this.getBrandName.bind(this);
        this.getFrameStyleName = this.getFrameStyleName.bind(this);
    }

    componentDidMount() {
        showTransition();
        this.props.router.push("/pripravujeme");

        if (this.state.products.length === 0) {
            this.setState({ products: this.props.products });
        }

        if (this.props.router.query.vyhladavanie) {
            this.setState({ search: this.props.router.query.vyhladavanie });
        }

        var searchField = document.getElementById("search-field");
        searchField.addEventListener("keypress", this.handkeKeyPress);

        hideTransition();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.query !== this.props.router.query) {
            this.setState((state) => ({
                loading: false,
                products: state.products.concat(this.props.products)
            }));
        }
    }

    componentWillUnmount() {
        var searchField = document.getElementById("search-field");
        searchField.removeEventListener("keypress", this.handkeKeyPress);
    }
    
    handkeKeyPress(event) {
        if (event.key === "Enter") {
            this.setState({ loading: true, products: [] });
            this.props.router.query.vyhladavanie = this.state.search.trim();
            this.props.router.push(this.props.router, undefined, { scroll: false });
        }
    }

    openFilter() {
        var filter = document.getElementById("shop-filter");

        filter.style.left = "0px";
        filter.style.top = "0px";
    }

    closeFilter() {
        var filter = document.getElementById("shop-filter");

        filter.style.left = "110vw";
        filter.style.top = "0px";
    }

    getCategoryName(category) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].category === parseInt(category))  {
                return categories[i].title;
            }
        }
    }

    getCollectionName(collection) {
        for (let i = 0; i < collections.length; i++) {
            if (collections[i].sex === collection)  {
                return collections[i].title;
            }
        }
    }

    getPriceName(price) {
        for (let i = 0; i < pricing.length; i++) {
            if (pricing[i].price === parseInt(price))  {
                return pricing[i].title;
            }
        }
    }

    getBrandName(brand) {
        for (let i = 0; i < brands.length; i++) {
            if (brands[i].name === brand)  {
                return brands[i].name;
            }
        }
    }

    getFrameStyleName(frameStyle) {
        for (let i = 0; i < frameStyles.length; i++) {
            if (frameStyles[i].frameStyle === frameStyle)  {
                return frameStyles[i].title;
            }
        }
    }

    render() {
        const { kategoria, kolekcia, cena, znacka, ram, vyhladavanie, skip } = this.props.router.query;
        const products = this.state.products;

        return(
            <div className="screen" id="shop">
                <div className="body">
                    <div className="filter" id="shop-filter">
                        <div className="wrapper">
                            <div className="section">
                                <div className="heading">Kategória</div>

                                {categories.map(item => (
                                    <div
                                        className="item"
                                        onClick={() => {
                                            this.setState({ loading: true, products: [] });

                                            var query = this.props.router.query;

                                            if (item.category === -1) {
                                                delete query.kategoria;
                                            } else {
                                                query.kategoria = item.category;
                                            }

                                            delete query.skip;

                                            this.props.router.push({
                                                pathname: "/obchod",
                                                query: query
                                            }, undefined, { scroll: false });
                                        }}
                                    >
                                        {item.icon !== null ? <img className="icon" src={item.icon} alt="Ikona okuliarov" /> : null}
                                        {item.title}

                                        <div style={{ flex: 1 }} />

                                        <ion-icon
                                            name={parseInt(kategoria) === item.category || (!kategoria && item.category === -1) ? "checkmark-outline" : "add-outline"}
                                            style={parseInt(kategoria) === item.category || (!kategoria && item.category === -1) ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null}
                                        ></ion-icon>
                                    </div>
                                ))}
                            </div>

                            <div className="section">
                                <div className="heading">Kolekcia</div>

                                {collections.map(item => (
                                    <div
                                        className="item"
                                        onClick={() => {
                                            this.setState({ loading: true, products: [] });

                                            var query = this.props.router.query;

                                            if (item.sex === "") {
                                                delete query.kolekcia;
                                            } else {
                                                query.kolekcia = item.sex;
                                            }

                                            delete query.skip;

                                            this.props.router.push({
                                                pathname: "/obchod",
                                                query: query
                                            }, undefined, { scroll: false });
                                        }}
                                    >
                                        {item.title}

                                        <div style={{ flex: 1 }} />

                                        <ion-icon
                                            name={kolekcia === item.sex || (!kolekcia && item.sex === "") ? "checkmark-outline" : "add-outline"}
                                            style={kolekcia === item.sex || (!kolekcia && item.sex === "") ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null}
                                        ></ion-icon>
                                    </div>
                                ))}
                            </div>

                            <div className="section">
                                <div className="heading">Cena</div>

                                {pricing.map(item => (
                                    <div
                                        className="item"
                                        onClick={() => {
                                            this.setState({ loading: true, products: [] });

                                            var query = this.props.router.query;

                                            if (item.price === 0) {
                                                delete query.cena;
                                            } else {
                                                query.cena = item.price;
                                            }

                                            delete query.skip;

                                            this.props.router.push({
                                                pathname: "/obchod",
                                                query: query
                                            }, undefined, { scroll: false });
                                        }}
                                    >
                                        {item.title}

                                        <div style={{ flex: 1 }} />

                                        <ion-icon
                                            name={parseInt(cena) === item.price || (!cena && item.price === 0) ? "checkmark-outline" : "add-outline"}
                                            style={parseInt(cena) === item.price || (!cena && item.price === 0) ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null}
                                        ></ion-icon>
                                    </div>
                                ))}
                            </div>

                            <div className="section">
                                <div className="heading">Značky</div>

                                <div className="brands-panel">
                                    {brands.map(item => (
                                        <div
                                            className="item"
                                            onClick={() => {
                                                this.setState({ loading: true, products: [] });

                                                var query = this.props.router.query;

                                                if (item.name === "Všetky") {
                                                    delete query.znacka;
                                                } else {
                                                    query.znacka = item.name;
                                                }

                                                delete query.skip;

                                                this.props.router.push({
                                                    pathname: "/obchod",
                                                    query: query
                                                }, undefined, { scroll: false });
                                            }}
                                        >
                                            {item.name}

                                            <div style={{ flex: 1 }} />

                                            <ion-icon name="add-outline"
                                                name={znacka === item.name || (!znacka && item.name === "Všetky") ? "checkmark-outline" : "add-outline"}
                                                style={znacka === item.name || (!znacka && item.name === "Všetky") ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null}
                                            ></ion-icon>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="section">
                                <div className="heading">Tvar rámu</div>

                                {frameStyles.map(item => (
                                    <div
                                        className="item"
                                        onClick={() => {
                                            this.setState({ loading: true, products: [] });

                                            var query = this.props.router.query;

                                            if (item.frameStyle === "") {
                                                delete query.ram;
                                            } else {
                                                query.ram = item.frameStyle;
                                            }

                                            delete query.skip;

                                            this.props.router.push({
                                                pathname: "/obchod",
                                                query: query
                                            }, undefined, { scroll: false });
                                        }}
                                    >
                                        {item.icon !== null ? <img className="icon" src={item.iconBlack} alt="Ikona tvaru rámu" /> : null}
                                        {item.title}

                                        <div style={{ flex: 1 }} />

                                        <ion-icon
                                            name={ram === item.frameStyle || (!ram && item.frameStyle === "") ? "checkmark-outline" : "add-outline"}
                                            style={ram === item.frameStyle || (!ram && item.frameStyle === "") ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null}
                                        ></ion-icon>
                                    </div>
                                ))}
                            </div>

                            <div className="button search-button" onClick={() => this.closeFilter()}>Hľadať</div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="top-panel">
                            <div className="title">{kategoria ? this.getCategoryName(kategoria) : "Všetky"}</div>

                            <div className="search-panel">
                                <input className="field" id="search-field" type="text" value={this.state.search} onChange={(event) => this.setState({search: event.target.value})} placeholder="Vyhľadaj" />
                                <div className="button" onClick={() => {
                                    this.setState({ loading: true, products: [] });
                                    this.props.router.query.vyhladavanie = this.state.search.trim();
                                    this.props.router.push(this.props.router, undefined, { scroll: false });
                                }}>Hľadaj</div>
                            </div>

                            <div className="filters-panel" onClick={() => this.openFilter()}>
                                <div className="text">Filtrovať</div>
                                <ion-icon name="filter-outline"></ion-icon>
                            </div>

                            <div className="tag-panel">
                                {kategoria ? 
                                    <div className="tag">{this.getCategoryName(kategoria)}<ion-icon name="close-outline" onClick={() => {
                                        this.setState({ loading: true, products: [] });

                                        var query = this.props.router.query;
                                        delete query.kategoria;
                                        delete query.skip;

                                        this.props.router.push({
                                            pathname: "/obchod",
                                            query: query
                                        }, undefined, { scroll: false });
                                    }}></ion-icon></div>
                                : null}

                                {kolekcia ?
                                    <div className="tag">{this.getCollectionName(kolekcia)}<ion-icon name="close-outline" onClick={() => {
                                        this.setState({ loading: true, products: [] });

                                        var query = this.props.router.query;
                                        delete query.kolekcia;
                                        delete query.skip;

                                        this.props.router.push({
                                            pathname: "/obchod",
                                            query: query
                                        }, undefined, { scroll: false });
                                    }}></ion-icon></div>
                                : null}

                                {cena ?
                                    <div className="tag">{this.getPriceName(cena)}<ion-icon name="close-outline" onClick={() => {
                                        this.setState({ loading: true, products: [] });

                                        var query = this.props.router.query;
                                        delete query.cena;
                                        delete query.skip;

                                        this.props.router.push({
                                            pathname: "/obchod",
                                            query: query
                                        }, undefined, { scroll: false });
                                    }}></ion-icon></div>
                                : null}

                                {znacka ?
                                    <div className="tag">{this.getBrandName(znacka)}<ion-icon name="close-outline" onClick={() => {
                                        this.setState({ loading: true, products: [] });

                                        var query = this.props.router.query;
                                        delete query.znacka;
                                        delete query.skip;

                                        this.props.router.push({
                                            pathname: "/obchod",
                                            query: query
                                        }, undefined, { scroll: false });
                                    }}></ion-icon></div>
                                : null}

                                {ram ?
                                    <div className="tag">{this.getFrameStyleName(ram)}<ion-icon name="close-outline" onClick={() => {
                                        this.setState({ loading: true, products: [] });

                                        var query = this.props.router.query;
                                        delete query.ram;
                                        delete query.skip;

                                        this.props.router.push({
                                            pathname: "/obchod",
                                            query: query
                                        }, undefined, { scroll: false });
                                    }}></ion-icon></div>
                                : null}

                                {vyhladavanie ? <div className="tag">{this.state.search}<ion-icon name="close-outline" onClick={() => {
                                    this.setState({ loading: true, products: [] });

                                    var query = this.props.router.query;
                                    delete query.vyhladavanie;
                                    delete query.skip;

                                    this.props.router.push({
                                        pathname: "/obchod",
                                        query: query
                                    }, undefined, { scroll: false });
                                }}></ion-icon></div> : null}
                            </div>
                        </div>

                        {this.state.loading ? <Loading /> : (
                            products.length === 0 ? <div className="message">Nenašli sa žiadne produkty</div> : (
                                <div className="data">
                                    {products.map((product) => <Product product={product} />)}
                                </div>
                            )
                        )}

                        {((skip && products.length == parseInt(skip) + 9) || (!skip && products.length === 9)) && !this.state.loading ?
                            <div className="button" onClick={() => {
                                this.props.router.query.skip = skip ? parseInt(skip) + 9 : 9;
                                this.props.router.push(this.props.router, undefined, { scroll: false });
                            }}>Zobraziť viac</div>
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Shop);