import Head from 'next/head';
import Confirm from "../../screens/Confirm";
import Api from "../../config/Api";

export default function ConfirmScreen({ user }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Potvrdenie objednávky</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Confirm user={user} />
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const token = req.cookies.token ? JSON.parse(req.cookies.token) : null;
    const order = req.cookies.order ? JSON.parse(req.cookies.order) : null;

    var user = null;

    if (token) {
        const call = await Api.profile(token);

        if (call.user) {
            user = call.user;
        }
    } else {
        const call = await Api.getTempUser(order.userId);

        if (call.user) {
            user = call.user;
        }
    }
  
    return {
        props: {
            user: user
        }
    }
}
