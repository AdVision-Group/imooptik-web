import React from "react";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

import { services } from "../config/Database";
import { redirect, hideTransition, showTransition } from "../config/Config";
import Title from "../components/Title";
import Heading from "../components/Heading";

import Gallery from "../components/Gallery";

//import "../styles/service.css";

class Service extends React.Component {

    state = {
        processPhotos: [],
        currentProcessPhoto: 0,

        equipmentPhotos: [],
        currentEquipmentPhoto: 0,

        allowCarousel: false,
        carousel: null,

        option: 0
    }

    constructor() {
        super();

        this.initProcessSlides = this.initProcessSlides.bind(this);

        this.resetProcessInterval = this.resetProcessInterval.bind(this);
        this.resetEquipmentInterval = this.resetEquipmentInterval.bind(this);
    }

    componentDidMount() {
        const { service } = this.props;

        if (service.carouselPhotos) {
            var processPhotos = [];

            for (let i = 0; i < service.carouselPhotos.length; i++) {
                processPhotos.push({
                    key: i + 1,
                    content: <img className="slide" src={service.carouselPhotos[i]} />,
                    onClick: () => this.setState({ currentProcessPhoto: i }, () => this.resetProcessInterval())
                });
            }

            const Carousel = dynamic(() => import("react-spring-3d-carousel"));
            this.setState({ processPhotos: processPhotos, carousel: Carousel, allowProcessCarousel: true });

            this.processInterval = setInterval(() => this.setState((state) => ({ currentProcessPhoto: state.currentProcessPhoto + 1 })), 5000);
        }

        this.initProcessSlides(this.state.option);

        if (service.equipment) {
            var equipmentPhotos = [];

            for (let i = 0; i < service.equipment.photos.length; i++) {
                equipmentPhotos.push({
                    key: i + 1,
                    content: <img className="slide" src={service.equipment.photos[i]} />,
                    onClick: () => this.setState({ currentEquipmentPhoto: i }, () => this.resetEquipmentInterval())
                });
            }

            const Carousel = dynamic(() => import("react-spring-3d-carousel"));
            this.setState({ equipmentPhotos: equipmentPhotos, carousel: Carousel, allowEquipmentCarousel: true });

            this.equipmentInterval = setInterval(() => this.setState((state) => ({ currentEquipmentPhoto: state.currentEquipmentPhoto + 1 })), 5000);
        }

        hideTransition();
    }

    initProcessSlides(option) {
        const { service } = this.props;

        if (service.withOptions) {
            var processPhotos = [];

            for (let i = 0; i < service.withOptions[option].processPhotos.length; i++) {
                processPhotos.push({
                    key: i + 1,
                    content: <img className="slide" src={service.withOptions[option].processPhotos[i]} />,
                    onClick: () => this.setState({ currentProcessPhoto: i }, () => this.resetProcessInterval())
                });
            }

            const Carousel = dynamic(() => import("react-spring-3d-carousel"));
            this.setState({ processPhotos: processPhotos, carousel: Carousel, allowProcessCarousel: true });

            clearInterval(this.processInterval);
            this.processInterval = setInterval(() => this.setState((state) => ({ currentProcessPhoto: state.currentProcessPhoto + 1 })), 5000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.processInterval);
        clearInterval(this.equipmentInterval);
    }

    resetProcessInterval() {
        clearInterval(this.processInterval);
        this.processInterval = setInterval(() => this.setState((state) => ({ currentProcessPhoto: state.currentProcessPhoto + 1 })), 5000);
    }

    resetEquipmentInterval() {
        clearInterval(this.equipmentInterval);
        this.equipmentInterval = setInterval(() => this.setState((state) => ({ currentProcessPhoto: state.currentProcessPhoto + 1 })), 5000);
    }

    render() {
        const service = this.props.service;
        const { allowProcessCarousel, processPhotos, currentProcessPhoto, allowEquipmentCarousel, equipmentPhotos, currentEquipmentPhoto } = this.state;

        if (service.link === "servis-okuliarov" || service.link === "expresne-vyhotovenie-okuliarov") {
            showTransition();
            this.props.router.push("/pripravujeme");
        }

        return(
            <div className="screen" id="service">
                <Title
                    title=""
                    image={service.photo}
                />

                <div className="content">
                    <div className="section description-section">
                        <Heading
                            heading="SLUŽBA"
                            title={service.heading}
                            withBorder
                        />

                        <div className="description">{service.description}</div>

                        <Link href="/rezervacia-terminu">
                            <a className="button" onClick={() => showTransition()} style={{ marginTop: 50 }}>Rezervácia termínu</a>
                        </Link>
                    </div>

                    {service.preparation &&
                    <div className="section preparation-section">
                        <Heading
                            heading="PRÍPRAVA"
                            title="Príprava pred vyšetrením"
                            withBorder
                        />

                        <div className="preparation-panel">
                            {service.preparation.map(item => 
                                <div className="item">
                                    <img className="icon" src={item.icon} />
                                    <div className="text">{item.text}</div>
                                </div>    
                            )}
                        </div>
                    </div>
                    }

                    {service.process &&
                    <div className="section process-section">
                        <Heading
                            heading="PRIEBEH"
                            title="Priebeh vyšetrenia zraku"
                            withBorder
                        />

                        <div className="process-panel">
                            {service.process.map((item, index) => 
                                <div className="item">
                                    <div className="number">{index + 1}</div>

                                    <div className="info-panel">
                                        <div className="title">{item.title}</div>
                                        <div className="text">{item.text}</div>
                                    </div>
                                </div>    
                            )}
                        </div>

                        {allowProcessCarousel &&
                        <div className="carousel">
                            <this.state.carousel slides={processPhotos} offsetRadius={5} goToSlide={currentProcessPhoto} animationConfig={{ tension: 120, friction: 14 }} />
                        </div>
                        }
                    </div>
                    }

                    {service.withOptions && 
                        <div className="options">
                            {service.withOptions.map((option, index) =>
                                <div
                                    className="item"
                                    onClick={() => this.setState({ option: index }, () => this.initProcessSlides(index))}
                                    style={this.state.option === index ? { color: "white", backgroundColor: "rgb(235, 172, 1)" } : null}
                                >
                                    {option.title}
                                </div>
                            )}
                        </div>
                    }

                    {service.withOptions &&
                    <div className="section preparation-section">
                        <Heading
                            heading="PRÍPRAVA"
                            title="Príprava pred vyšetrením"
                            withBorder
                        />

                        <div className="preparation-panel">
                            {service.withOptions[this.state.option].preparation.map(item => 
                                <div className="item">
                                    <img className="icon" src={item.icon} />
                                    <div className="text">{item.text}</div>
                                </div>    
                            )}
                        </div>
                    </div>
                    }

                    {service.withOptions &&
                    <div className="section process-section">
                        <Heading
                            heading="PRIEBEH"
                            title={service.withOptions[this.state.option].processHeading}
                            withBorder
                        />

                        <div className="info">
                            <div className="item">
                                <ion-icon name="time-outline"></ion-icon>
                                {service.withOptions[this.state.option].processTime}
                            </div>

                            <div className="item">
                                <ion-icon name="wallet-outline"></ion-icon>
                                {service.withOptions[this.state.option].processPrice}
                            </div>
                        </div>

                        <div className="process-panel">
                            {service.withOptions[this.state.option].process.map((item, index) => 
                                <div className="item">
                                    <div className="number">{index + 1}</div>

                                    <div className="info-panel">
                                        <div className="title">{item.title}</div>
                                        <div className="text">{item.text}</div>
                                    </div>
                                </div>    
                            )}
                        </div>

                        <div style={{ height: 150 }} />

                        <Heading
                            heading="ZÁVER"
                            title="Záver vyšetrenia"
                            withBorder
                        />

                        <div className="description">{service.withOptions[this.state.option].ending}</div>

                        {allowProcessCarousel &&
                        <div className="carousel">
                            <this.state.carousel slides={processPhotos} offsetRadius={5} goToSlide={currentProcessPhoto} animationConfig={{ tension: 120, friction: 14 }} />
                        </div>
                        }
                    </div>
                    }

                    <div className="section team-section">
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

                                        <div className="row">
                                            <ion-icon name="storefront-outline"></ion-icon>
                                            <div className="info">{person.branch}</div>
                                        </div>
                                        <div style={{ height: 10 }} />
                                        <div className="row">
                                            <ion-icon name="time-outline"></ion-icon>
                                            <div className="info">{person.days}</div>
                                        </div>

                                        <div className="icon-panel">
                                            {person.icons && person.icons.map(icon => <img className="icon" src={icon} />)}
                                        </div>
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>

                    {service.video &&
                    <div className="section video-section">
                        <Heading
                            heading="PREČO"
                            title="Prečo absolvovať vyšetrenie zraku?"
                            withBorder
                        />

                        <div className="description">{service.description}</div>

                        {service && service.video &&
                            <iframe className="video" src={service.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        }
                    </div>
                    }

                    {service.equipment &&
                    <div className="section equipment-section">
                        <img className="logo" src={service.equipment.logo} />

                        <Heading
                            heading={service.equipment.heading}
                            title={service.equipment.title}
                            withBorder
                        />

                        <div className="description">{service.equipment.description }</div>

                        {allowEquipmentCarousel &&
                        <div className="carousel">
                            <this.state.carousel slides={equipmentPhotos} offsetRadius={5} goToSlide={currentEquipmentPhoto} animationConfig={{ tension: 120, friction: 14 }} />
                        </div>
                        }
                    </div>
                    }

                    {service.collaboration &&
                    <div className="section collaboration-section">
                        <Heading
                            heading="Spolupráca"
                            title="Spolupracujeme"
                            withBorder
                        />

                        <div className="brands">
                            {service.collaboration.map(brand => <img className="image" src={brand} />)}
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Service);