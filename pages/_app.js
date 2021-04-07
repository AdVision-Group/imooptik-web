import "../styles/about.css";
import "../styles/animation.css";
import "../styles/app.css";
import "../styles/article.css";
import "../styles/articlebox.css";
import "../styles/banner.css";
import "../styles/blog.css";
import "../styles/branch.css";
import "../styles/calendar.css";
import "../styles/cardform.css";
import "../styles/contact.css";
import "../styles/dropdown.css";
import "../styles/footer.css";
import "../styles/gallery.css";
import "../styles/header.css";
import "../styles/heading.css";
import "../styles/home.css";
import "../styles/image.css";
import "../styles/loading.css";
import "../styles/login.css";
import "../styles/menu.css";
import "../styles/notfound.css";
import "../styles/order.css";
import "../styles/panel.css";
import "../styles/popup.css";
import "../styles/product.css";
import "../styles/profile.css";
import "../styles/register.css";
import "../styles/registerconfirm.css";
import "../styles/reservation.css";
import "../styles/service.css";
import "../styles/shop.css";
import "../styles/soon.css";
import "../styles/success.css";
import "../styles/terms.css";
import "../styles/title.css";
import "../styles/transition.css";

import { useEffect } from "react";
import { getStorageItem, setStorageItem } from "../config/Config";
import Cookies from "js-cookie";

import Layout from "../components/Layout";
import Head from "next/head";

function App({ Component, pageProps }) {

  if (!getStorageItem("cart")) setStorageItem("cart", []);

  return(
    <Layout>
      <Head>
          <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
      </Head>

      <Component {...pageProps} />
    </Layout>
  )
}

export default App;
