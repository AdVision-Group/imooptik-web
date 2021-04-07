import React from "react";

//import "../styles/popup.css";

export default function SalePopup(props) {
    const goToEshop = props.goToEshop;
    const continueToCart = props.continueToCart;

    return(
        <div className="popup">
            <div className="panel">
                <div className="popup-title">Využitie našu akciu - kúpte si ku tomuto produktu jeden neznačkový rám a dostanete ho úplne zdarma</div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="button" onClick={goToEshop}>E-shop</div>
                    <div className="button" onClick={continueToCart}>Nechcem akciu</div>
                </div>
            </div>
        </div>
    )
}