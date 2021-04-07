import Head from 'next/head';
import Success from "../../screens/Success";

export default function SuccessOrderScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Ďakujeme za nákup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Success type="order" />
        </div>
    )
}
