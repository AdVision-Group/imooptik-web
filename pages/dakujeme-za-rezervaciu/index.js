import Head from 'next/head';
import Success from "../../screens/Success";

export default function SuccessReservationScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Ďakujeme za rezerváciu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Success type="reservation" />
        </div>
    )
}
