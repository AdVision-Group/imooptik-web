import Head from 'next/head';
import { useRouter } from "next/router";
import Product from "../../../screens/Product";
import Api from "../../../config/Api";

export default function ProductScreen({ product, values }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | {product.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Product product={product} values={values} />
        </div>
    )
}


export async function getServerSideProps({ query, req }) {
    const { link } = query;
    const token = req.cookies.token ? JSON.parse(req.cookies.token) : null;
    console.log(token);

    const call = await Api.getProducts({
        filters: {
            link: link
        }
    });

    var product = null;

    if (call.products && call.products.length > 0) {
        product = call.products[0];
    }

    var values = null;

    if (token) {
        const getUser = await Api.profile(token);

        if (getUser.user) {
            const user = getUser.user;

            var distanceOption = "short";

            if (Object.values(user.lenses.diopters)[2] === 1001) {
                distanceOption = "short"
            } else {
                distanceOption = "long";
            }

            values = {
                diopters: Object.values(user.lenses.diopters),
                cylinder: Object.values(user.lenses.cylinder),
                cylinderAxes: Object.values(user.lenses.cylinderAxes),
                distance: Object.values(user.lenses.distance),

                distanceOption: distanceOption,
            }
        } else {
            values = {
                diopters: [ "1001", "1001", "1001", "1001" ],
                cylinder: [ "1001", "1001", "1001", "1001" ],
                cylinderAxes: [ "1001", "1001", "1001", "1001" ],
                distance: [ "1001", "1001", "1001", "1001" ],
                distanceOption: "short"
            }
        }
    }
  
    return {
        props: {
            product: product,
            values: values
        }
    }
}
