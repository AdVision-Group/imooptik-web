import Head from 'next/head';
import Payment from "../../screens/Payment";

export default function PaymentScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Doprava a platba</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Payment />
        </div>
    )
}
