import Head from 'next/head';
import Article from "../../../screens/Article";
import Api from "../../../config/Api";

export default function ArticleScreen({ article, moreArticles }) {
    return (
        <div>
            <Head>
                <title>IMOOPTIK | {article.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Article article={article} moreArticles={moreArticles} />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { id } = query;

    const call = await Api.getBlog(id);
    const getMore = await Api.getBlogs({ limit: 4 });

    var article = null;
    var moreArticles = [];

    if (call.blog) {
        article = call.blog;
    }

    if (getMore.blogs) {
        for (let i = 0; i < getMore.blogs.length; i++) {
            const article = getMore.blogs[i];

            if (article._id !== id) {
                moreArticles.push(article);
            }

            if (moreArticles.length === 3) {
                break;
            }
        }
    }
  
    return {
        props: {
            article: article,
            moreArticles: moreArticles
        }
    }
}
