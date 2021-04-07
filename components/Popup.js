import React from "react";

import Loading from "./Loading";

//import "../styles/popup.css";

export default function Popup(props) {
    const loading = props.loading;
    const title = props.title;
    const close = props.close;

    const secondButtonClose = props.secondButtonClose

    return(
        <div className="popup">
            {loading ? <div className="panel"><Loading /></div> : (
                <div className="panel">
                    <div className="popup-title">{title}</div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div className="button" onClick={close}>{secondButtonClose ? "Vybrať šošovky" : "Zavrieť"}</div>
                        {secondButtonClose ? <div style={{ width: 20 }} /> : null}
                        {secondButtonClose ? <div className="button" onClick={secondButtonClose}>Chcem iba rám</div> : null}
                    </div>
                </div>
            )}
        </div>
    )
}