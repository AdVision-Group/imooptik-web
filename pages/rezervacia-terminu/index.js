import Head from 'next/head';
import Reservation from "../../screens/Reservation";

export default function ReservationScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Rezervácia termínu online</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Reservation />
        </div>
    )
}
