import React from "react";
import { withRouter } from "next/router";

import { services } from "../config/Database";
import { redirect, hideTransition } from "../config/Config";
import Title from "../components/Title";
import Heading from "../components/Heading";

import Gallery from "../components/Gallery";

//import "../styles/service.css";

class Service extends React.Component {

    state = {
        service: {},
    }

    constructor() {
        super();
    }

    render() {
        const service = this.props.service;

        return(
            <div className="screen" id="service">
                <Title
                    title={service.title}
                    image={require("../assets/about-2.jpg")}
                />

                <div className="content">
                    <div className="section section-1">
                        <Heading
                            heading="SLUŽBA"
                            title={service.heading}
                            withBorder
                        />

                        <div className="description">{service.description}</div>
                    </div>

                    <div className="section section-2">
                        <Heading
                            heading="NÁŠ TÍM"
                            title="Náš skúsený tím optometristov"
                            withBorder
                        />

                        <div className="description">{service.teamDescription}</div>

                        <div className="team">
                            {service.team ? service.team.map((person) => {
                                return(
                                    <div className="item">
                                        <div className="image" />
                                        <div className="name">{person.name}</div>
                                        <div className="role">{person.role.toUpperCase()}</div>
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Service);