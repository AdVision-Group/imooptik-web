import Head from 'next/head';
import Shop from "../../screens/Shop";
import Api from "../../config/Api";

export default function ShopScreen({ products }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Obchod</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Shop products={products} />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { kategoria, kolekcia, cena, znacka, ram, skip, vyhladavanie } = query;

    var data = {
        filters: {},
        sortBy: {},
        limit: 9,
        skip: 0
    }

    if (kategoria && parseInt(kategoria) !== -1) data["filters"]["type"] = parseInt(kategoria);
    if (kolekcia && kolekcia !== "") data["filters"]["specs.sex"] = kolekcia;
    if (cena && parseInt(cena) !== 0) data["sortBy"]["price"] = parseInt(cena);
    if (ram && ram !== "") data["filters"]["specs.frameStyle"] = ram;
    if (znacka && znacka !== "Všetky") data["filters"]["brand"] = znacka;

    if (skip) data["skip"] = parseInt(skip);

    if (vyhladavanie && vyhladavanie !== "") {
        delete data["sortBy"];
        delete data["limit"];
        delete data["skip"];

        data["query"] = vyhladavanie;
    }

    console.log(data);

    const call = await Api.getDistinctProducts(data);

    var products = [];

    if (call.products) {
        products = call.products;
    }
  
    return {
        props: {
            products: products
        }
    }
}
