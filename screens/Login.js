import React from "react";
import { withRouter } from "next/router";

import { getStorageItem, setStorageItem, isLogged, logout, redirect, hideTransition } from "../config/Config";

import Api from "../config/Api";
import Popup from "../components/Popup";
import Heading from "../components/Heading";

//import "../styles/login.css";

class Login extends React.Component {

    state = {
       email: "",
       password: "",

       popup: false,
       loading: true,
       title: ""
    }

    constructor() {
        super();

        this.login = this.login.bind(this);
    }

    async login() {
        this.setState({ popup: true, loading: true });

        const { email, password } = this.state;

        const call = await Api.login({
            email: email,
            password: password
        });

        if (call.authToken) {
            setStorageItem("token", call.authToken);

            window.location.href = "/profil";
        } else {
            const message = call.error === "registration-unfinished" ? "Prihlásiť sa môžete až po potvrdení registrácie, ktoré sme Vám zaslali na e-mail" : call.messageSK;

            this.setState({
                loading: false,
                title: message
            });
        }
    }

    componentDidMount() {
        const token = getStorageItem("token");

        if (token) this.props.router.push("/profil");
    }

    render() {
        return(
            <div className="screen" id="login">
                <div className="body">
                    <Heading
                        heading="PRIHLÁSENIE"
                        title="Prihláste sa do svojho účtu"
                        withBorder
                    />

                    <div className="form">
                        <div className="heading">E-mail</div>
                        <input className="field" type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />

                        <div className="heading">Heslo</div>
                        <input className="field" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />

                        <a className="forgot-link" href="/resetovanie-hesla">Zabudli ste Vaše heslo?</a>

                        <div className="button-panel">
                            <div className="button" onClick={() => this.login()}>Prihlásiť sa</div>
                            <div style={{ width: 30 }} />
                            <a className="button" href="/registracia">Registrácia</a>
                        </div>
                    </div>
                </div>

                {this.state.popup ? (
                    <Popup
                        loading={this.state.loading}
                        title={this.state.title}
                        close={() => this.setState({ popup: false })}
                    />
                ) : null}
            </div>
        )
    }
}

export default withRouter(Login);