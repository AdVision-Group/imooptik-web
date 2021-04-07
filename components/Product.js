import React from "react";
import { withRouter } from "next/router";

import { API_URL } from "../config/Api";
import { redirect } from "../config/Config";
import Image from "./Image";

//import "../styles/shop.css";

const colors = {
    red: "#D2222D",
    green: "#238823",
    yellow: "#FFBF00"
}

function Product(props) {

    const product = props.product;

    var available = false;

    if (product.available[1] + product.available[2] + product.available[3] + product.available[4] + product.available[5] + product.available[6] > 0) {
        available = true;
    }

    return(
        <a
            className="product-item"
            href={"/obchod/" + product.link}
        >
            {product.image ?
                <img className="image" src={API_URL + "/uploads/" + product.image.imagePath} alt={"Fotka produktu " + product.name} />
            :
                <div className="placeholder" />
            }

            <div className="name">{product.name}</div>
            <div className="available" style={{ color: available ? colors.green : colors.red }}>{available ? "Na sklade" : "Nedostupné"}</div>

            <div style={{ flex: 1 }} />

            <div className="bottom">
                <div className="button">Kúpiť</div>
                <div className="price">{(product.price / 100).toFixed(2)}€</div>
            </div>
        </a>
    )
}

export default withRouter(Product);