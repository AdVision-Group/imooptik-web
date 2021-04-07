import Head from 'next/head';
import Home from "../screens/Home";
import Api from "../config/Api";

export default function HomeScreen({ bestsellers }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Domov</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Home bestsellers={bestsellers} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const call = await Api.getDistinctProducts({
        sortBy: {
            soldAmount: 1
        },
        limit: 5
    });

    var bestsellers = [];

    if (call.products) {
        bestsellers = call.products;
    }
  
    return {
        props: {
            bestsellers: bestsellers
        }
    }
}
