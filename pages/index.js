import Head from 'next/head';
import Home from "../screens/Home";
import Api from "../config/Api";

export default function HomeScreen({ bestsellers, blogs }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Domov</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Home bestsellers={bestsellers} blogs={blogs} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const getBestsellers = await Api.getDistinctProducts({
        sortBy: {
            soldAmount: 1
        },
        limit: 5
    });

    const getBlogs = await Api.getBlogs({
        sortBy: {
            date: 1
        },
        limit: 3
    });

    var bestsellers = [];
    var blogs = [];

    if (getBestsellers.products) {
        bestsellers = getBestsellers.products;
    }

    if (getBlogs.blogs) {
        blogs = getBlogs.blogs;
    }
  
    return {
        props: {
            bestsellers: bestsellers,
            blogs: blogs
        }
    }
}
