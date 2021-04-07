import Head from 'next/head';
import Terms from "../../screens/Terms";

export default function TermsScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Obchodné podmienky</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Terms />
        </div>
    )
}
