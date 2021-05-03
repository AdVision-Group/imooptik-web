import Head from 'next/head';
import Soon from "../../screens/Soon";

export default function SoonScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Pripravujeme</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Soon />
        </div>
    )
}
