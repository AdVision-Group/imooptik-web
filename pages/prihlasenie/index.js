import Head from 'next/head';
import Login from "../../screens/Login";

export default function LoginScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Prihlásenie</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Login />
        </div>
    )
}
