import React from "react";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";

import Api, { API_URL } from "../config/Api";
import SmoothScroll from "../components/SmoothScroll";
import ArticleBox from "../components/ArticleBox";
import Popup from "../components/Popup";

import Heading from "../components/Heading";

//import "../styles/home.css";

import Lottie from "react-lottie";
import brands from "../assets/animation/brands.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: brands,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
  };

class Home extends React.Component {

    state = {
        newsletter: "",

        references: [
            {
                key: 0,
                content: <Reference name="Michal Gamboš" stars={5} text="Ak hľadáte top optiku kde Vám nielen predajú okuliare ale aj poskytnú super servis (oprava rámov - aj titánových) tak vrelo doporučujem Imooptik - to čo iné optiky odmietnu, Imooptik vyrieši!" />,
                onClick: () => this.setState({ currentReference: 0 }, () => this.resetReferencesInterval())
            },
            {
                key: 1,
                content: <Reference name="Peter Molnár" stars={5} text="Skvelé odborné poradenstvo v tejto optike. Veľmi dobre mi pomohli pri výbere rámov aj skiel. Maximálna spokojnosť, určite odporúčam." />,
                onClick: () => this.setState({ currentReference: 1 }, () => this.resetReferencesInterval())
            },
            {
                key: 2,
                content: <Reference name="Lucia Polačková" stars={5} text="Profesionálny, odborný a ústretový personál, široký výber sortimentu a neprekonateľné ceny. Maximálna spokojnosť vo všetkých smeroch. Vrelo odporúčam každému" />,
                onClick: () => this.setState({ currentReference: 2 }, () => this.resetReferencesInterval())
            },
            {
                key: 3,
                content: <Reference name="Alex Lauko" stars={5} text="Vynikajúci prístup pána predajcu a široký výber maximálna spokojnosť. Ceny vynikajúce. Vždy odchádzam spokojný." />,
                onClick: () => this.setState({ currentReference: 3 }, () => this.resetReferencesInterval())
            },
            {
                key: 4,
                content: <Reference name="Petra Mikulová" stars={5} text="Dnes som bola v optike na Obchodnej, veľmi milá predavačka, ktorá sa mi venovala. Popozerala som rámy a pomohla mi vybrať, milý pán mi odmeral oči a za hodinku som mala okuliare. Naozaj nechápem, ale úplne výborné všetko." />,
                onClick: () => this.setState({ currentReference: 4 }, () => this.resetReferencesInterval())
            }
        ],

        currentReference: 0,

        bestsellers: [],

        currentBestseller: 0,

        bestsellersCategory: 1,

        popup: false,
        loading: false,
        message: "",

        allowCarousel: false,
        carousel: null
    }

    constructor() {
        super();

        this.resetReferencesInterval = this.resetReferencesInterval.bind(this);
        this.resetBestsellersInterval = this.resetBestsellersInterval.bind(this);
        this.subscribeToNewsletter = this.subscribeToNewsletter.bind(this);
    }

    async componentDidMount() {
        this.referencesInterval = setInterval(() => this.setState((state) => ({ currentReference: state.currentReference + 1 })), 5000);
        this.bestsellersInterval = setInterval(() => this.setState((state) => ({ currentBestseller: state.currentBestseller + 1 })), 5000);

        this.loadBestsellers();
    }

    componentWillUnmount() {
        clearInterval(this.referencesInterval);
        clearInterval(this.bestsellersInterval);
    }

    resetReferencesInterval() {
        clearInterval(this.referencesInterval);
        this.referencesInterval = setInterval(() => this.setState((state) => ({ currentReference: state.currentReference + 1 })), 5000);
    }

    resetBestsellersInterval() {
        clearInterval(this.bestsellersInterval);
        this.bestsellersInterval = setInterval(() => this.setState((state) => ({ currentBestseller: state.currentBestseller + 1 })), 5000);
    }

    async loadBestsellers() {
        const products = this.props.bestsellers;
        var bestsellers = [];

        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            bestsellers.push({
                key: i + 1,
                content: <Bestseller product={product} />,
                onClick: () => this.setState({ currentBestseller: i }, () => this.resetBestsellersInterval())
            });
        }

        const Carousel = dynamic(() => import("react-spring-3d-carousel"));
        this.setState({ bestsellers: bestsellers, carousel: Carousel, allowCarousel: true });
    }

    async subscribeToNewsletter() {
        this.setState({ popup: true, loading: true });

        const { newsletter } = this.state;

        const call = await Api.subscribeToNewsletter({
            email: newsletter.trim()
        });

        if (call.error) {
            if (call.error === "format") {
                this.setState({
                    loading: false,
                    message: "Zadaný e-mail neexistuje"
                });
            } else {
                this.setState({
                    loading: false,
                    message: "Server neodpovedá, skúste neskôr prosím"
                });
            }
        } else {
            this.setState({
                loading: false,
                message: call.messageSK
            });
        }
    }

    render() {
        const blogs = this.props.blogs;
        const bestsellers = this.state.bestsellers;
        const references = this.state.references;

        return(
            <div className="screen" id="home">
                <div className="landing">
                    <img className="image" src={require("../assets/landing-image-final.jpg")} alt="Žena v slnečných okuliaroch so žltým pozadím" />

                    <div className="content">
                        <h2 className="landing-title">Akcia 1+1 rám zdarma</h2>
                        <p className="text">
                            Využite jedinečnú príležitosť a získajte pri kúpe dvoch rámov ten druhý úplne zadarmo. Akcia trvá do konca marca, nezmeškajte!
                        </p>
                        <a className="button" href="/obchod">Nakupuj</a>

                        <img className="arrow" src={require("../assets/arrow.png")} alt="Šípka dole" onClick={() => SmoothScroll.scroll("#bestsellers")} />
                    </div>
                </div>

                <div className="bestsellers" id="bestsellers">
                    <Heading
                        heading="PONUKA"
                        title="Najpredávanejšie okuliare"
                        withBorder
                    />

                    <div className="carousel">
                        {this.state.allowCarousel && <this.state.carousel slides={bestsellers} offsetRadius={5} goToSlide={this.state.currentBestseller} animationConfig={{ tension: 120, friction: 14 }} />}
                    </div>
                </div>

                <div className="services">
                    <div className="content">
                        <a className="item service-1" href="/sluzby/vysetrenie-zraku" id="services">
                            <img className="background" src={require("../assets/vysetrenie-zraku.jpg")} alt="Vyšetrenie zraku" />
                            <div className="overlay" />
                            <h3 className="title">Vyšetrenie zraku</h3>
                            <p className="text">
                                V našich troch optikách v Bratislave a v Senici Vám vyšetríme zrak a poskytneme odborné poradenstvo.
                            </p>
                            <div className="button">Zisti viac</div>
                        </a>

                        <a className="item service-2" href="/sluzby/aplikacia-kontaktnych-sosoviek">
                            {/*<img className="background" src={require("../assets/aplikacia-sosoviek.jpg")} />*/}
                            <img className="background" src={require("../assets/service-yellow-2.jpg")} alt="Aplikácia kontaktných šošoviek" />
                            <div className="overlay" />
                            <h3 className="title">Aplikácia šošoviek</h3>
                            <p className="text">
                                Vykonávame i aplikáciu kontaktných šošoviek a následný predaj vo všetkých našich optikách.
                            </p>
                            <div className="button">Zisti viac</div>
                        </a>

                        <a className="item service-3" href="/sluzby/servis-okuliarov">
                            <img className="background" src={require("../assets/servis-okuliarov.jpg")} alt="Servis okuliarov" />
                            <div className="overlay" />
                            <h3 className="title">Servis okuliarov</h3>
                            <p className="text">
                                Zabezpečujeme rôzne úpravy a opravy okuliarov. Servis na naše okuliare je zadarmo.
                            </p>
                            <div className="button">Zisti viac</div>
                        </a>

                        <a className="item service-4" href="/obchod?kategoria=1" id="products">
                            {/*<img className="background" src={require("../assets/dioptricke-okuliare.jpg")} />*/}
                            <img className="background" src={require("../assets/service-yellow-1.jpg")} alt="Dioptrické okuliare" />
                            <div className="overlay" />
                            <h3 className="title">Dioptrické okuliare</h3>
                            <p className="text">
                                Ponúkame široký výber značkových i neznačkových okuliarových rámov za priaznivé ceny.
                            </p>
                            <div className="button">Zisti viac</div>
                        </a>

                        <a className="item service-5" href="/obchod?kategoria=2">
                            <img className="background" src={require("../assets/eyeglasses-services.jpg")} alt="Slnečné okuliare" />
                            <div className="overlay" />
                            <h3 className="title">Slnečné okuliare</h3>
                            <p className="text">
                                Slnečné okuliare sú u nás zastúpené všetkými kategóriami. Či už hľadáte slnečné okuliare na šport, šoférovanie alebo s dioptriou. Máme pre Vás pripravený široký výber.
                            </p>
                            <div className="button">Zisti viac</div>
                        </a>

                        <a className="item service-6" href="/obchod?kategoria=4">
                            <img className="background" src={require("../assets/dioptricke-skla.jpg")} alt="Športové okuliare" />
                            <div className="overlay" />
                            <h3 className="title">Športové okuliare</h3>
                            <p className="text">
                                Zastrešujeme širokú ponuku dioptrických skiel od popredných svetových výrobcov – Rodenstock, Essilor, Jai Kudo.
                            </p>
                            <div className="button">Zisti viac</div>
                        </a>
                    </div>
                </div>

                <div className="brands-top-panel">
                    <Heading
                        heading="ZNAČKY"
                        title="Široký výber značiek"
                    />
                </div>

                <div className="brands" id="brands">
                    <a href="/obchod"><img className="image" id="brands-1" src={require("../assets/brands.svg")} alt="Značky" /></a>
                    <Lottie options={defaultOptions}
                        height={400}
                        width={400}
                    />
                </div>

                <div className="whyus">
                    <Heading
                        heading="PREČO MY"
                        title="Prečo si vybrať nás"
                        withBorder
                    />

                    <div className="content">
                        <div className="item">
                            <div className="number">1</div>
                            <ion-icon name="glasses"></ion-icon>
                            <h3 className="item-title">Široký výber okuliarií</h3>
                            <p className="item-text">
                                Ponúkame široký výber okuliarií dostupný na prevádzkach tak ako aj na e-shope.
                            </p>
                        </div>

                        <div className="item">
                            <div className="number">2</div>
                            <ion-icon name="people"></ion-icon>
                            <h3 className="item-title">Kvalitné poradenstvo</h3>
                            <p className="item-text">
                                Náš personál Vám vždy rád poradí a pomôže so všetkým, čo budete potrebovať.
                            </p>
                        </div>

                        <div className="item">
                            <div className="number">3</div>
                            <ion-icon name="cart"></ion-icon>
                            <h3 className="item-title">Pohodlné nakupovanie</h3>
                            <p className="item-text">
                                Nakupujte z nášho nového e-shopu rýchlo a pohodlne. Tovar Vám bude doručený priamo domov.
                            </p>
                        </div>

                        <div className="item">
                            <div className="number">4</div>
                            <ion-icon name="eye"></ion-icon>
                            <h3 className="item-title">Očné vyšetrenia</h3>
                            <p className="item-text">
                                Objednajte sa na vyšetrenie alebo konzultáciu pomocou nášho formulára na webstránke.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="references">
                    <Heading
                        heading="REFERENCIE"
                        title="Čo o nás hovoria naši zákazníci"
                        withBorder
                    />

                    <div className="carousel">
                        {this.state.allowCarousel && <this.state.carousel slides={references} offsetRadius={5} goToSlide={this.state.currentReference} animationConfig={{ tension: 120, friction: 14 }} />}
                    </div>

                    <a className="button" href="https://www.google.com/search?rlz=1C5CHFA_enSK927SK927&sxsrf=ALeKk00w1gIXx89HcMErjeoM3ZHUfI6Y0g:1611140068218&ei=3gsIYKPBErTYxgPZ-LzwDw&q=imooptik&oq=imooptik&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIICAAQxwEQrwEyCAgAEMcBEK8BMggIABDHARCvATIHCAAQChDLATIICAAQxwEQrwEyCAgAEMcBEK8BOgYIIxAnEBM6CAgAELEDEIMBOgsIABCxAxDHARCjAjoCCAA6BQgAELEDOgQIABBDOgsIABCxAxDHARCvAToHCAAQsQMQCjoECAAQCjoKCAAQxwEQrwEQClDPHljdJWDfJmgAcAB4AIABhQGIAYsGkgEDNS4zmAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=2ahUKEwiq4cu7rKruAhVFDOwKHSU4C5MQvS4wAHoECAIQKw&uact=5&tbs=lf:1,lf_ui:10&tbm=lcl&rflfq=1&num=10&rldimm=11019453920574646706&lqi=CghpbW9vcHRpa1oUCghpbW9vcHRpayIIaW1vb3B0aWs&phdesc=Bsb5PBOmfa8&rlst=f#lrd=0x476c8945b3f52397:0x98ecf6f50aa329b2,1,,,&rlfi=hd:;si:11019453920574646706,l,CghpbW9vcHRpa1oUCghpbW9vcHRpayIIaW1vb3B0aWs,y,Bsb5PBOmfa8;mv:[[48.154985599999996,17.135518400000002],[48.1484129,17.1113925]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:10">Prejsť na Google referencie</a>
                </div>

                {blogs.length > 0 ?
                <div className="blog">
                    <Heading
                        heading="BLOG"
                        title="Získajte najnovšie informácie"
                        withBorder
                    />

                    <div className="content">
                        {blogs.map((article, index) => <ArticleBox article={article} index={index} history={this.props.history} location={this.props.location}  />)}
                    </div>
                </div>
                : null}

                <div className="branches" id="branches">
                    <div className="wrapper">
                        <Heading
                            heading="PREVÁDZKY"
                            title="Kde nás nájdete?"
                            withBorder
                        />

                        <div className="content">
                            <a className="branch" href="/prevadzky/bratislava-obchodna">
                                <img className="image" src={require("../assets/bratislava-obchodna/image-title.jpg")} alt="Prevádzka IMOOPTIK Obchodná 57 Bratislava" />
                                <div className="overlay" />
                                <h3 className="title">IMOOPTIK OBCHODNÁ</h3>
                                <p className="text">Obchodná 57, Bratislava 811 06</p>
                                <div className="button">Viac o pobočke</div>
                            </a>

                            <a className="branch" href="/prevadzky/bratislava-mileticova">
                                <img className="image" src={require("../assets/about-1.jpg")} alt="Prevádzka IMOOPTIK Miletičova 38 Bratislava" />
                                <div className="overlay" />
                                <h3 className="title">IMOOPTIK MILETIČOVA</h3>
                                <p className="text">Miletičova 38, Bratislava 821 08</p>
                                <div className="button">Viac o pobočke</div>
                            </a>

                            <a className="branch" href="/prevadzky/bratislava-rolnicka">
                                <img className="image" src={require("../assets/about-1.jpg")} alt="Prevádzka IMOOPTIK Roľnícka 1 Bratislava" />
                                <div className="overlay" />
                                <h3 className="title">IMOOPTIK ROĽNÍCKA</h3>
                                <p className="text">Roľnícka 1, Bratislava 831 07</p>
                                <div className="button">Viac o pobočke</div>
                            </a>

                            <a className="branch" href="/prevadzky/bratislava-vajnorska">
                                <img className="image" src={require("../assets/about-1.jpg")} alt="Prevádzka IMOOPTIK Vajnorská Bratislava" />
                                <div className="overlay" />
                                <h3 className="title">IMOOPTIK VAJNORSKÁ</h3>
                                <p className="text">Vajnorská, Bratislava 831 07</p>
                                <div className="button">Viac o pobočke</div>
                            </a>

                            <a className="branch" href="/prevadzky/senica-namestie-oslobodenia">
                                <img className="image" src={require("../assets/about-1.jpg")} alt="Prevádzka IMOOPTIK Nám. Oslobodenia 17 Senica" />
                                <div className="overlay" />
                                <h3 className="title">IMOOPTIK SENICA</h3>
                                <p className="text">Nám. Oslobodenia 17, Senica</p>
                                <div className="button">Viac o pobočke</div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="newsletter">
                    <img className="background" src={require("../assets/newsletter-image-final.jpg")} alt="Muž so slnečnými okuliarmi a žltým pozadím" />

                    <div className="panel">
                        <Heading
                            heading="NEWSLETTER"
                            title="Nezmeškajte žiadne novinky"
                        />

                        <div className="content">
                            <input className="field" type="text" placeholder="E-mail" value={this.state.newsletter} onChange={(event) => this.setState({ newsletter: event.target.value })} />
                            <div className="button" onClick={() => this.subscribeToNewsletter()}>Odoberať</div>
                        </div>
                    </div>
                </div>

                {this.state.popup ?
                    <Popup
                        loading={this.state.loading}
                        title={this.state.message}
                        close={() => this.setState({ popup: false })}
                    />
                : null}
            </div>
        )
    }
}

function Reference(props) {
    const name = props.name;
    const starCount = props.stars;
    const text = props.text;

    const stars = [];

    for (let i = 0; i < starCount; i++) {
        stars.push(1);
    }

    return(
        <div className="item">
            <div className="name">{name}</div>
            <div className="score">
                {stars.map(() => <ion-icon name="star"></ion-icon>)}
            </div>
            <p className="text">{text}</p>
        </div>
    )
}

const colors = {
    red: "#D2222D",
    green: "#238823",
    yellow: "#FFBF00"
}

function Bestseller(props) {
    const product = props.product;

    var available = false;

    if (product.available[1] + product.available[2] + product.available[3] + product.available[4] + product.available[5] + product.available[6] > 0) {
        available = true;
    }

    return(
        <div className="item">
            {product.image ?
                <img className="image" src={API_URL + "/uploads/" + product.image.imagePath} alt={"Fotka produktu " + product.name} />
            :
                <div className="placeholder" />
            }
            <div className="name">{product.name}</div>
            <div className="available" style={{ color: available ? colors.green : colors.red }}>{available ? "Na sklade" : "Nedostupné"}</div>
            
            <div className="bottom">
                <a className="button" href={"/obchod/" + product.link}>Kúpiť</a>
                <div className="price">{(product.price / 100).toFixed(2)}€</div>
            </div>
        </div>
    )
}

export default withRouter(Home);