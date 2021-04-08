import Head from 'next/head';
import About from "../../screens/About";

export default function AboutScreen() {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | O nás</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <About />
        </div>
    )
}
