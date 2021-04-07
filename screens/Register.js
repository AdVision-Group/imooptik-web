import React from "react";
import { withRouter } from "next/router";

import { getStorageItem, setStorageItem, isLogged, logout, redirect, hideTransition } from "../config/Config";

import Api from "../config/Api";
import Popup from "../components/Popup";
import Heading from "../components/Heading";

//import "../styles/register.css";

class Register extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",

        popup: false,
        loading: true,
        title: "",
        popupClose: () => this.setState({ popup: false })
    }

    constructor() {
        super();

        this.register = this.register.bind(this);
    }

    async register() {
        this.setState({ popup: true, loading: true });

        const { firstName, lastName, email, password, repeatPassword } = this.state;

        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "" || repeatPassword.trim() === "") {
            this.setState({
                loading: false,
                title: "Všetky polia musia byť vyplnené",
                popupClose: () => this.setState({ popup: false })
            });

            return;
        }

        if (password.trim() !== repeatPassword.trim()) {
            this.setState({
                loading: false,
                title: "Heslá sa nezhodujú",
                popupClose: () => this.setState({ popup: false })
            });

            return;
        }

        const call = await Api.register({
            name: firstName.trim() + " " + lastName.trim(),
            email: email.trim(),
            password: password
        });

        if (call.error) {
            this.setState({
                loading: false,
                title: call.messageSK,
                popupClose: () => this.setState({ popup: false })
            });
        } else {
            this.setState({
                loading: false,
                title: "Na e-mail sme Vám zaslali potvrdenie registrácie, po ktorej sa budete môcť prihlásiť do Vášho účtu",
                popupClose: () => {
                    window.location.href = "/";
                }
            });
        }
    }

    render() {
        if (isLogged()) {
            return <Redirect to="/profil" />
        }

        return(
            <div className="screen" id="register">
                <div className="body">
                    <Heading
                        heading="REGISTRÁCIA"
                        title="Vytvorte si účet"
                        withBorder
                    />

                    <div className="form">
                        <div className="heading">Meno</div>
                        <input className="field" type="text" value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />

                        <div className="heading">Priezvisko</div>
                        <input className="field" type="text" value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />

                        <div className="heading">E-mail</div>
                        <input className="field" type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />

                        <div className="heading">Heslo</div>
                        <input className="field" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />

                        <div className="heading">Potvrdiť heslo</div>
                        <input className="field" type="password" value={this.state.repeatPassword} onChange={(event) => this.setState({ repeatPassword: event.target.value })} />

                        <div className="button" onClick={() => this.register()}>Zaregistrovať sa</div>
                    </div>
                </div>

                {this.state.popup ? (
                    <Popup
                        loading={this.state.loading}
                        title={this.state.title}
                        close={() => this.state.popupClose()}
                    />
                ) : null}
            </div>
        )
    }
}

export default withRouter(Register);