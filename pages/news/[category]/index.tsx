import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { TArticle } from "..";

interface Params {
  articles: TArticle[];
  category: TArticle["category"];
  error: Error["message"];
}

export default function ArticleListByCategory({
  articles,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className='p-8'>
      <h1 className='text-center capitalize heading'>{category}</h1>
      <div className='grid grid-cols-1 gap-3 mt-8 md:grid-cols-2'>
        {articles?.map((article) => {
          return (
            <div key={article.id} className='p-2 bg-gray-100 border border-2 border-indigo-700 rounded'>
              <h2 className='text-xl font-semibold'>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  interface IParams extends ParsedUrlQuery {
    category: string;
  }

  const { params, req, res, query } = context;
  const { category } = params as IParams;

  //console.log(query);
  //console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", ["name=Max"]);

  // Try block to catch any errors thrown by the fetch function
  try {
    // Send a request to the specified URL and get the response
    const response = await fetch(`http:localhost:4000/news?category=${category}`);

    // If the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Parse the response body as JSON
      const data: TArticle[] | undefined = await response.json();

      // Return the data as props
      return {
        props: {
          articles: data,
          category,
        },
      };
    } else {
      // If the response is not successful, return an error message as props
      return {
        props: {
          error: response.statusText,
        },
      };
    }
  } catch (error) {
    // If there was an error thrown by the fetch function, return the error message as props

    if (error instanceof Error) {
      return {
        props: {
          error: `${error.message}\n Please try to restart the json server with yarn serve-json`,
        },
      };
    }
  }
}
