import Head from 'next/head';
import Api from  "../../config/Api";
import Checkout from "../../screens/Checkout";

export default function CheckoutScreen({ user }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Osobné údaje</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Checkout user={user} />
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const token = req.cookies.token ? JSON.parse(req.cookies.token) : null;

    var fetchedUser = null;
    var company = null;

    if (token) {
        const call = await Api.profile(token);

        if (call.user) {
            const user = call.user;

            fetchedUser = {
                firstname: user.name.split(" ")[0],
                lastname: user.name.split(" ")[1],
                email: user.email,
                phone: user.phone,
                address: user.address,
                psc: user.psc,
                city: user.city,
                country: user.country,
                company: null
            }

            if (user.company) {
                company = {
                    companyName: user.company.name,
                    companyIco: user.company.ico,
                    companyDic: user.company.dic,
                    companyIcdph: user.company.icdph,
                    companyAddress: user.company.address,
                    companyPsc: user.company.psc,
                    companyCity: user.company.city,
                    companyCountry: user.company.country
                }
            }

            fetchedUser["company"] = company;
        }            
    }
  
    return {
        props: {
            user: fetchedUser
        }
    }
}