import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import Api from "../config/Api";
import { branches } from "../config/Database";
import Title from "../components/Title";
import Popup from "../components/Popup";
import Heading from "../components/Heading";

import Gallery from "../components/Gallery";
import { hideTransition, showTransition } from "../config/Config";

class Branch extends React.Component {

    state = {
        services: [],

        galleryShowing: false,
        currentPhoto: 0,

        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",

        popup: false,
        loading: true,
        title: "",
        onPopupClose: () => {}
    }

    constructor() {
        super();

        this.sendMessage = this.sendMessage.bind(this);
        this.openGallery = this.openGallery.bind(this);
        this.closeGallery = this.closeGallery.bind(this);
    }

    async sendMessage() {
        this.setState({ popup: true, loading: true });

        const { firstname, lastname, email, phone, message } = this.state;

        if (firstname.trim() === "" || lastname.trim() === "" || email.trim() === "" || phone.trim() === "" || message.trim() === "") {
            this.setState({
                loading: false,
                title: "Všetky polia musia byť vyplnené",
                onPopupClose: () => this.setState({ popup: false })
            });

            return;
        }

        const call = await Api.sendMessage({
            name: firstname.trim() + " " + lastname.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim(),
            premises: this.props.branch.calendar
        });

        if (!call.error) {
            this.setState({
                loading: false,
                title: "Správa bola úspešne odoslaná",
                onPopupClose: () => window.location.reload()
            });
        } else {
            this.setState({
                loading: false,
                title: call.messageSK,
                onPopupClose: () => this.setState({ popup: false })
            });
        }
    }

    openGallery(currentPhoto) {
        this.setState({ galleryShowing: true, currentPhoto: currentPhoto });
    }

    closeGallery() {
        this.setState({ galleryShowing: false });
    }

    componentDidMount() {
        hideTransition();
    }

    render() {
        const branch = JSON.parse(this.props.branch);
        const services = JSON.parse(this.props.services);

        return(
            <div className="screen" id="branch">
                <Title
                    title={branch.label}
                    image={branch.gallery.length > 0 ? branch.gallery[0] : require("../assets/about-2.jpg")}
                />

                <div className="body">
                    <div className="section contact-panel">
                        <div className="item">
                            <ion-icon name="home-outline"></ion-icon>
                            <div className="info">{branch.address}</div>
                            <div className="info">{branch.psc} {branch.city}</div>
                        </div>

                        <div className="item">
                            <ion-icon name="time-outline"></ion-icon>
                            {branch.hours ? branch.hours.map((hours) => <div className="info">{hours}</div>) : null}
                        </div>

                        <div className="item">
                            <ion-icon name="chatbubbles-outline"></ion-icon>
                            <div className="info">{branch.phone}</div>
                            <div className="info">{branch.email}</div>
                        </div>
                    </div>

                    {branch.services && branch.services.length > 0 &&
                    <div className="section">
                        <Heading
                            heading="SLUŽBY"
                            title="Služby na pobočke"
                            withBorder
                        />

                        <div className="icon-panel">
                            {branch.services.map(service =>
                                <div className="item">
                                    <img className="icon" src={service.icon} />
                                    <div className="info">{service.title}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    }

                    {services && services.length > 0 ?
                    <div className="section">
                        <Heading
                            heading="VYŠETRENIA"
                            title="Vyšetrenia, ktoré ponúkame"
                            withBorder
                        />

                        <div className="services-panel">
                            {services.map((service) => (
                                <Link href="/rezervacia-terminu">
                                    <a className="pricing-panel" onClick={() => showTransition()}>
                                        <div className="top-panel">
                                            <h3 className="name">{service.name}</h3>
                                            <p className="price">{service.price}€</p>
                                        </div>

                                        <div className="bottom-panel">
                                            <p className="parameter">
                                                <ion-icon name="time-outline"></ion-icon>
                                                {service.time} minút
                                            </p>
                                            
                                            <p className="text">{service.description}</p>

                                            <div className="button">Rezervácia termínu</div>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                    : null}

                    {branch.employees.length > 0 &&
                    <div className="section">
                        <Heading
                            heading="NÁŠ TÍM"
                            title="Tím, ktorý Vám pomôže"
                            withBorder
                        />

                        <div className="team-panel">
                            {branch.employees ? branch.employees.map((person) => {
                                return(
                                    <div className="item">
                                        <div className="image-panel">
                                            <img className="image-serious" src={person[2]} />
                                            <img className="image-funny" src={person[3]} />
                                        </div>
                                        <div className="name">{person[0]}</div>
                                        <div className="position">{person[1].toUpperCase()}</div>
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>
                    }

                    {branch.gallery.length > 0 &&
                    <div className="section">
                        <Heading
                            heading="GALÉRIA"
                            title="Pozrite si našu pobočku"
                            withBorder
                        />

                        <div className="gallery-panel">
                            {branch.gallery ? branch.gallery.map((image, index) => <img className="image" src={image} onClick={() => this.openGallery(index)} alt="Fotka z galérie priestorov pobočky IMOOPTIK" />) : null}
                        </div>
                    </div>
                    }

                    <div className="section form-panel">
                        <Heading
                            heading="KONTAKT"
                            title="Napíšte nám, radi Vám poradíme"
                            withBorder
                        />

                        <div className="form">
                            <div className="grid">
                                <div className="heading">Meno</div>
                                <div className="heading">Priezvisko</div>
                                <input className="field" type="text" value={this.state.firstname} onChange={(event) => this.setState({ firstname: event.target.value })} />
                                <input className="field" type="text" value={this.state.lastname} onChange={(event) => this.setState({ lastname: event.target.value })} />
                            </div>

                            <div style={{ height: 20 }} />

                            <div className="grid">
                                <div className="heading">E-mail</div>
                                <div className="heading">Telefónne číslo</div>
                                <input className="field" type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                                <input className="field" type="text" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
                            </div>

                            <div style={{ height: 20 }} />

                            <div className="heading">Správa</div>
                            <textarea className="field" type="text" value={this.state.message} onChange={(event) => this.setState({ message: event.target.value })} rows={8}></textarea>

                            <div style={{ height: 30 }} />

                            <div className="button" onClick={() => this.sendMessage()}>Odoslať</div>
                        </div>
                    </div>
                </div>

                <iframe className="map" src={branch.map} allowfullscreen="" loading="lazy"></iframe>

                {this.state.galleryShowing ?
                    <Gallery gallery={this.props.branch.gallery} currentPhoto={this.state.currentPhoto} close={this.closeGallery} />
                : null}

                {this.state.popup ? (
                    <Popup
                        loading={this.state.loading}
                        title={this.state.title}
                        close={this.state.onPopupClose}
                    />
                ) : null}
            </div>
        )
    }
}

export default withRouter(Branch);