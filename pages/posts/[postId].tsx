import { GetStaticPropsContext } from "next";
import { IPost } from "../../components/post";
import { useRouter } from "next/router";

export function Post({ post }: { post: IPost }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1 className='text-4xl font-semibold'>Loading...</h1>;
  }

  return (
    <main className='p-8'>
      <h1 className='text-5xl'>{post?.title}</h1>
      <p className='text-xl'>{post?.body}</p>
    </main>
  );
}

export default Post;

export async function getStaticPaths() {
  // Send a request to the specified URL and get the response
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3");

  let data: IPost[] | undefined;
  // If the response is successful (status code in the range 200-299)
  if (response.ok) {
    // Parse the response body as JSON
    data = await response.json();
  } else {
  }

  const paths = data?.map((post) => {
    return {
      params: {
        postId: post.id.toString(),
      },
    };
  });

  return {
    paths,
    //fallback: false,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  // Try block to catch any errors thrown by the fetch function
  try {
    // Send a request to the specified URL and get the response
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.postId}`);

    // If the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Parse the response body as JSON
      const data: IPost = await response.json();

      // Return the data as props
      return {
        props: {
          post: data,
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
          error: error.message,
        },
      };
    }
  }
}
