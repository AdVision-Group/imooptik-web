import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import { redirect, showTransition } from "../config/Config";
import { categories, collections, pricing, frameStyles, brands } from "../config/Database";
import Loading from "../components/Loading";

//import "../styles/dropdown.css";

class Dropdown extends React.Component {

    state = {
        brands: []
    }

    constructor() {
        super();

        this.getBrands = this.getBrands.bind(this);
    }

    getBrands() {
        var newBrands = [];

        const target = [ "Ray-Ban", "Guess", "Tommy Hilfiger", "Dolce & Gabbana", "Emporio Armani", "Tom Ford", "Persol" ];

        for (let i = 0; i < brands.length; i++) {
            for (let j = 0; j < target.length; j++) {
                if (brands[i].name === target[j]) {
                    newBrands.push({
                        name: brands[i].name,
                        image: brands[i].image,
                        index: i
                    });
                    break;
                }
            }
        }

        this.setState({ brands: newBrands });
    }

    componentDidMount() {
        this.getBrands();
    }

    render() {
        return(
            <div id="dropdown">
                <div className="content">
                    <div className="section">
                        <div className="heading">Pohlavie</div>

                        <div className="list">
                            {collections.slice(1, collections.length).map((sex, index) => 
                                <Link href={"/obchod?kategoria=" + this.props.category + "&kolekcia=" + sex.sex} key={index}>
                                    <a
                                        className="item"
                                        onClick={() => showTransition()}
                                    >
                                        {sex.title}
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="section">
                        <div className="heading">Značka</div>

                        <div className="list">
                            {this.state.brands.map((brand, index) => 
                                <Link href={"/obchod?kategoria=" + this.props.category + "&znacka=" + brand.name} key={index}>
                                    <a
                                        className="item"
                                        onClick={() => showTransition()}
                                    >
                                        {brand.name}
                                    </a>
                                </Link>
                            )}                       
                        </div>
                    </div>

                    <div className="section">
                        <div className="heading">Tvar rámu</div>

                        <div className="list">
                            {frameStyles.slice(1, frameStyles.length).map((item, index) =>
                                <Link href={"/obchod?kategoria=" + this.props.category + "&ram=" + item.frameStyle} key={index}>
                                    <a
                                        className="item"
                                        onClick={() => showTransition()}
                                    >
                                        {item.icon !== null ? <img className="icon" src={item.icon} alt="Ikona pre tvar rámu okuliarov" /> : null}
                                        {item.title}
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="section">
                        <div className="heading">Cena</div>

                        <div className="list">
                            {pricing.slice(1, pricing.length).map((price, index) =>
                                <Link href={"/obchod?kategoria=" + this.props.category + "&cena=" + price.price} key={index}>
                                    <a
                                        className="item"
                                        onClick={() => showTransition()}
                                    >
                                        {price.title}
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Dropdown);