import React from "react";
import { withRouter } from "next/router";

import Title from "../components/Title";

class About extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div className="screen" id="about">
                <Title
                    title="Niečo o nás"
                    image={require("../assets/about-2.jpg")}
                />

                <div className="body">
                    <div className="content">
                        <div className="panel">
                            <p>
                                Naša očná optika bola založená v roku 2011. Náš hlavný cieľ je pristupovať ku každému zákazníkovi vždy individuálne. Za osem rokov existencie sme sa rozšírili na aktuálnych päť predajných miest – tri krát v Bratislave, v Senici a v Trnave. Na týchto miestach Vás budú vždy obsluhovať ľudia ktorí sú odborníkmi a majú potrebné vzdelanie, prax v obore očnej optiky.
                            </p>

                            <div style={{ width: 100 }} />

                            <img className="image" src={require("../assets/about-1.jpg")} alt="Fotka z priestorov IMOOPTIK" />
                        </div>

                        <div className="panel">
                            <img className="image" src={require("../assets/about-2.jpg")} alt="Fotka z priestorov IMOOPTIK" />

                            <div style={{ width: 100 }} />

                            <p>
                                Na každej našej optike Vám poskytneme vyšetrenie zraku, široký výber produktov, služieb a poradenstvo. Na troch našich prevádzkach ponúkame i hodinový servis. Ja sám, ako majiteľ pôsobím na Obchodnej ulici v Bratislave, kde Vás rád privítam. S našim tímom sme pripravení splniť Vám všetky Vaše priania a požiadavky.
                            </p>
                        </div>

                        <p className="paragraph">
                            Ak máte akékoľvek otázky ohľadne našej optiky, nášho tímu, okuliarov alebo sa chcete objednať na kontrolu, neváhajte nás kontaktovať telefonicky, e-mailom alebo pomocou nášho kontaktného formulára.
                        </p>

                        <p className="signature">Peter Imrich - IMOOPTIK</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(About);