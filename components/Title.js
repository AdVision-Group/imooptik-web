import React from "react";

//import "../styles/title.css";

export default function Title(props) {
    const title = props.title;
    const image = props.image;

    return(
        <div className="page-title">
            <img className="image" src={image} alt={"Titulná fotka pre nadpis " + title} />
            <h2 className="title">{title}</h2>
        </div>
    )
}