import Head from 'next/head';
import Profile from "../../screens/Profile";
import Api from "../../config/Api";

export default function ProfileScreen({ user }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Profil</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Profile user={user} />
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const token = req.cookies.token ? JSON.parse(req.cookies.token) : null;

    var fetchedUser = null;

    if (token) {
        const call = await Api.profile(token);

        if (call.user) {
            const user = call.user;

            var orders = [];
            for (let i = 0; i < user.orders.length; i++) {
                const order = await Api.getOrder(user.orders[i]);

                if (order.order) {
                    var products = [];

                    for (let j = 0; j < order.order.combinedProducts.length - 1; j++) {
                        const productId = order.order.combinedProducts[j].product;

                        const getProduct = await Api.getProduct(productId);
                        
                        if (getProduct.product) {
                            products.push(getProduct.product);
                        }
                    }

                    orders.push({
                        ...order.order,
                        combinedProducts: products
                    })
                }
            }

            var distanceOption = null;

            if (Object.values(user.lenses.diopters)[2] === 1001) {
                distanceOption = "short"
            } else {
                distanceOption = "long";
            }

            fetchedUser = {
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ")[1],
                email: user.email ? user.email : "",
                phone: user.phone ? user.phone : "",
                address: user.address ? user.address : "",
                psc: user.psc ? user.psc : "",
                city: user.city ? user.city : "",
                country: user.country ? user.country : "",
                orders: orders,

                diopters: Object.values(user.lenses.diopters),
                cylinder: Object.values(user.lenses.cylinder),
                cylinderAxes: Object.values(user.lenses.cylinderAxes),
                distance: Object.values(user.lenses.distance),

                distanceOption: distanceOption,
            }
        }
    }
  
    return {
        props: {
            user: fetchedUser
        }
    }
}
