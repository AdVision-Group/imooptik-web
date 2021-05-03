import React from "react";
import { withRouter } from "next/router";

import { getStorageItem, setStorageItem, isLogged, hideTransition, showTransition } from "../config/Config";

import Api from "../config/Api";
import Popup from "../components/Popup";
import Heading from "../components/Heading";

//import "../styles/login.css";

class Forgot extends React.Component {

    state = {
       email: "",

       popup: false,
       loading: true,
       title: "",
       onClose: () => this.setState({ popup: false })
    }

    constructor() {
        super();

        this.sendEmail = this.sendEmail.bind(this);
    }

    async sendEmail() {
        this.setState({ popup: true, loading: true });

        const { email } = this.state;

        const call = await Api.forgotPassword({
            email: email
        });

        if (call.message === "A password reset link has been sent to the email provided") {
            this.setState({
                loading: false,
                title: "Na mail Vám bol zaslaný link na resetovanie hesla",
                onClose: () => {
                    showTransition();
                    this.props.router.push("/");
                }
            });
        } else {
            this.setState({
                loading: false,
                title: "Zadaný mail nie je zaregistrovaný do IMOOPTIK",
                onClose: () => this.setState({ popup: false })
            });
        }
    }

    componentDidMount() {
        const token = getStorageItem("token");

        if (token) {
            showTransition();
            this.props.router.push("/profil");
        }
    }

    render() {
        showTransition();
        this.props.router.push("/pripravujeme");

        return(
            <div className="screen" id="login">
                <div className="body">
                    <Heading
                        heading="ZABUDNUTÉ HESLO"
                        title="Resetovanie hesla Vášho účtu"
                        withBorder
                    />

                    <div className="form">
                        <div className="heading">E-mail</div>
                        <input className="field" type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />

                        <br />
                        <br />
                    
                        <div className="button" onClick={() => this.sendEmail()}>Resetovať heslo</div>
                    </div>
                </div>

                {this.state.popup ? (
                    <Popup
                        loading={this.state.loading}
                        title={this.state.title}
                        close={this.state.onClose}
                    />
                ) : null}
            </div>
        )
    }
}

export default withRouter(Forgot);