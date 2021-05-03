import Router, { withRouter, useRouter } from "next/router";
import { useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";

import Menu from "./Menu";

import Offset from "./Offset";
import Transition from "./Transition";
import { showTransition } from "../config/Config";

const Layout = ({ children }) => {

    const router = useRouter();

    useEffect(() => {
        Router.events.on("routeChangeStart", (data) => {
            if (data !== router.pathname) {
                var transition = document.getElementById("transition");

                transition.style.display = "flex";
                transition.style.transition = "none";
                transition.style.opacity = "1";
            }
        });
    }, []);

    return(
        <div>
            <Header />
            <Menu />

            <Offset />

            <Transition />

            <main>
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default Layout;