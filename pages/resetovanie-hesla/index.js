import Head from 'next/head';
import Forgot from "../../screens/Forgot";

export default function ForgotScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Resetovanie hesla</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Forgot />
        </div>
    )
}
