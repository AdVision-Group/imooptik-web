import Head from 'next/head';
import RegisterConfirm from "../../../screens/RegisterConfirm";
import Api from "../../../config/Api";

export default function RegisterConfirmScreen({ success }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Potvrdenie registrácie</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <RegisterConfirm success={success} />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { secret } = query;

    var success = false;

    const call = await Api.confirmRegister(secret);

    if (call.error) {
        success = false;
    } else {
        success = true;
    }
  
    return {
        props: {
            success: success
        }
    }
}
