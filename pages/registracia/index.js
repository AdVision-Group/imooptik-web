import Head from 'next/head';
import Register from "../../screens/Register";

export default function RegisterScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Registrácia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Register />
        </div>
    )
}
