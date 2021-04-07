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
        blogs: [],
        count: 6,

        loading: false
    }
    
    constructor() {
        super();

        this.loadData = this.loadData.bind(this);
    }

    async loadData() {
        this.setState({ blogs: this.props.blogs });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const blogs = this.state.blogs || this.props.blogs;

        return(
            <div className="screen" id="blog">
                <div className="body">
                    <Heading
                        heading="BLOG"
                        title="Získajte najnovšie informácie"
                        withBorder
                    />

                    {this.state.loading ? <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 100, marginBottom: 100 }}><Loading /></div> : (
                        this.state.blogs.length === 0 ?
                            <div className="message">Nenašli sa žiadne príspevky</div>
                        :
                            <div className="content">
                                {blogs.map((article, index) => <ArticleBox article={article} index={index} history={this.props.history} location={this.props.location} />)}
                            </div>
                    )}

                    {!this.state.loading && blogs.length >= this.state.count ? <div className="button more-button" onClick={() => this.setState((state) => ({ count: state.count + 6 }))}>Viac príspevkov</div> : null}
                </div>
            </div>
        )
    }
}

export default withRouter(Blog);