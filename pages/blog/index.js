import Head from 'next/head';
import Blog from "../../screens/Blog";
import Api from "../../config/Api";

export default function BlogScreen({ blogs }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Blog blogs={blogs} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const call = await Api.getBlogs({ limit: 6 });

    var blogs = [];

    if (call.blogs) {
        blogs = call.blogs;
    }
  
    return {
        props: {
            blogs: blogs
        }
    }
}
