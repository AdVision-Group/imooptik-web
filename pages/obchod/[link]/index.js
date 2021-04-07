import Head from 'next/head';
import Product from "../../../screens/Product";
import Api from "../../../config/Api";

export default function ProductScreen({ product }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | {product.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Product product={product} />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { link } = query;

    const call = await Api.getProducts({
        filters: {
            link: link
        }
    });

    var product = null;

    if (call.products && call.products.length > 0) {
        product = call.products[0];
    }
  
    return {
        props: {
            product: product
        }
    }
}
