import React from "react";
import { Link } from "next/router";

import { API_URL } from "../config/Api";
import { redirect } from "../config/Config";

//import "../styles/articlebox.css";

export default function ArticleBox(props) {
    const article = props.article;
    const src = API_URL + "/uploads/" + article.image.imagePath;

    return(
        <a
            className="article-box"
            href={"/blog/" + article._id}
        >
            <img className="article-box-image" src={src} alt="Titulná fotka blogového príspevku" />
            
            <p className="article-box-date">{getFormattedDate(article.date)}</p>
            <h3 className="article-box-title">{article.name}</h3>
            <p className="article-box-description">{article.description}</p>

            <div className="button">Čítať viac</div>
        </a>
    )
}

const getFormattedDate = (articleDate) => {
    const date = articleDate.split("T")[0];

    const months = [ "Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December" ];

    const newDate = date.split("-")[2] + ". " + months[parseInt(date.split("-")[1]) - 1] + ", " + date.split("-")[0];

    return newDate;
}