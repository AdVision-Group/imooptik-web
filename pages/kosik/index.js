import Head from 'next/head';
import Cart from "../../screens/Cart";
import Api from "../../config/Api";
import { getStorageItem } from "../../config/Config";

export default function CartScreen({ combinedProducts, price }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Košík</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cart combinedProducts={combinedProducts} price={price} />
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const cart = JSON.parse(req.cookies.cart);
    var combinedProducts = [];
    var price = 0;

    var updatedCart = [];

    var needLenses = false;

    for (let i = 0; i < cart.length; i++) {
        const id = cart[i];
        console.log(id);

        const call = await Api.getCombinedProduct(id);

        if (call.combinedProduct) {
            const combinedProduct = call.combinedProduct;

            const getImage = await Api.getImage(combinedProduct.product.image);

            if (getImage.image) {
                combinedProducts.push({
                    ...combinedProduct,
                    product: {
                        ...combinedProduct.product,
                        image: getImage.image
                    }
                });

                price += combinedProduct.price;
            }

            updatedCart.push(id);

            if (call.combinedProduct.lens) {
                needLenses = true;
            }
        }

        //if (!needLenses) removeStorageItem("lenses");

        res.setHeader("cart", updatedCart);
    }
  
    return {
        props: {
            combinedProducts: combinedProducts,
            price: price
        }
    }
  }
