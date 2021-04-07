import React from "react";

import { API_URL } from "../config/Api";

//import "../styles/panel.css";

export default class Panel extends React.Component {

    constructor() {
        super();
    }

    render() {
        const product = this.props.product || {};
        const src = API_URL + "/uploads/" + product.image.imagePath || {};
        const lens = this.props.lens || {};
        const specs = this.props.specs || {};

        return(
            <div className="panel-screen">
                <div className="panel">
                    <div className="title">Potvrdenie<ion-icon name="close-outline" onClick={this.props.onClose}></ion-icon></div>

                    <div className="item">
                        <div className="name">{product.name}</div>
                        <div className="code">{product.eanCode}</div>
                        <div style={{ flex: 1 }} />
                        <div className="price">{(product.price / 100).toFixed(2)}€</div>
                    </div>

                    <div className="item">
                        <div className="name">{lens.name}</div>
                        <div className="code">{lens.description}</div>
                        <div style={{ flex: 1 }} />
                        <div className="price">{(lens.price / 100).toFixed(2)}€</div>
                    </div>

                    <div className="button">Pridať do košíka</div>
                </div>
            </div>
        )
    }
}