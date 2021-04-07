import Head from 'next/head';
import Service from "../../../screens/Service";
import Api from "../../../config/Api";
import { services } from "../../../config/Database";

export default function ServiceScreen({ service }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | {service.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Service service={service} />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { link } = query;

    var service = null;

    for (let i = 0; i < services.length; i++) {
        if (services[i].link === link) {
            service = services[i];
        }
    }

    return {
        props: {
            service: service
        }
    }
}