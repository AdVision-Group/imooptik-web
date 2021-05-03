import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import Heading from "../components/Heading";
import Api from "../config/Api";
import { API_URL } from "../config/Api";
import { hideTransition } from "../config/Config";
import ArticleBox from "../components/ArticleBox";

//import "../styles/article.css";

class Article extends React.Component {

    constructor() {
        super();

        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date) {
        const year = parseInt(date.split("T")[0].split("-")[0]);
        const month = parseInt(date.split("T")[0].split("-")[1]);
        const day = parseInt(date.split("T")[0].split("-")[2]);

        const months = [ "január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december" ];

        const formatted = day + ". " + months[month - 1] + ", " + year;

        return formatted.toUpperCase();
    }


    render() {
        const article = this.props.article;
        const moreArticles = this.props.moreArticles;

        if (!article) return null;

        showTransition();
        this.props.router.push("/pripravujeme");

        return(
            <div className="screen" id="article">
                <div className="body">
                    <div className="content">
                        <h2 className="article-title">{article.name}</h2>
                        <p className="article-date">od Peter Imrich | {this.formatDate(article.date)} | 8 minút čítania</p>

                        <img className="article-image" src={API_URL + "/uploads/" + article.image.imagePath} alt={"Titulná fotka pre blogový príspevok " + article.name} />

                        <div className="article-text" dangerouslySetInnerHTML={{ __html: article.html }} />

                        <Heading
                            heading="BLOG"
                            title="Čítajte ďalšie blogové príspevky"
                            withBorder
                        />

                        <div className="similar">
                            {moreArticles.map((article, index) => <ArticleBox article={article} index={index} history={this.props.history} location={this.props.location}  />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Article);