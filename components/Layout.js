import Header from "./Header";
import Footer from "./Footer";

import Menu from "./Menu";

import Offset from "./Offset";
import Transition from "./Transition";

const Layout = ({ children }) => {
    return(
        <div>
            <Header />
            <Menu />

            <Offset />

            <main>
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default Layout;