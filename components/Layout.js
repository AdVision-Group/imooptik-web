import Router, { withRouter, useRouter } from "next/router";
import { useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";

import Menu from "./Menu";

import Offset from "./Offset";
import Transition from "./Transition";
import { showTransition } from "../config/Config";

const Layout = ({ children }) => {
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