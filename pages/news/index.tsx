import Link from "next/link";

export type TArticle = {
  id: number;
  title: string;
  category: "sports" | "politics";
  description: string;
};

interface Props {
  articles: TArticle[];
  error: Error["message"];
}

export default function NewsArticles({ articles, error }: Props) {
  // Check if there is an error
  if (error) {
    // If there is an error, return an h1 element with the error message
    return <h1>{error}</h1>;
  }
  // If there is no error, return a main element with a heading and list of articles
  return (
    <main className='p-8'>
      <h1 className='heading'>News</h1>
      {/* Map through the articles array and render a p element for each article with the title */}
      {articles?.map((article) => {
        return <p key={article.id}>{article.title}</p>;
      })}
      <h2 className='underline'>Categories:</h2>
      {/* Render links for navigating to sports and politics news pages */}
      <Link href='/news/sports' className='block link'>
        Sports
      </Link>
      <Link href='/news/politics' className='block link'>
        Politics
      </Link>
    </main>
  );
}

export async function getServerSideProps() {
  // Try block to catch any errors thrown by the fetch function
  try {
    // Send a request to the specified URL and get the response
    const response = await fetch("http:localhost:4000/news");

    // If the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Parse the response body as JSON
      const data: TArticle[] | undefined = await response.json();

      // Return the data as props
      return {
        props: {
          articles: data,
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
