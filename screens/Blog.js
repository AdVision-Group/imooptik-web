import React from "react";
import { withRouter } from "next/router";

import Heading from "../components/Heading";
import { redirect, hideTransition } from "../config/Config";
import Loading from "../components/Loading";
import Title from "../components/Title";
import Api from "../config/Api";
import { API_URL } from "../config/Api";
import ArticleBox from "../components/ArticleBox";

//import "../styles/blog.css";

class Blog extends React.Component {

    state = {
        count: 6,
    }
    
    constructor() {
        super();
    }

    render() {
        const blogs = this.props.blogs;
        const count = this.state.count;

        return(
            <div className="screen" id="blog">
                <div className="body">
                    <Heading
                        heading="BLOG"
                        title="Získajte najnovšie informácie"
                        withBorder
                    />

                    {blogs.length === 0 ?
                        <div className="message">Nenašli sa žiadne príspevky</div>
                    :
                        <div className="content">
                            {blogs.slice(0, count).map((article, index) => <ArticleBox article={article} index={index} />)}
                        </div>
                    }

                    {blogs.length >= count ? <div className="button more-button" onClick={() => this.setState((state) => ({ count: state.count + 6 }))}>Viac príspevkov</div> : null}
                </div>
            </div>
        )
    }
}

export default withRouter(Blog);