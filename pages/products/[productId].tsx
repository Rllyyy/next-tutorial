import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { TProduct } from ".";

function Product({ product, error }: { product: TProduct; error: string }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <h1>{product?.title}</h1>
    </main>
  );
}

export default Product;

export async function getStaticPaths() {
  // Send a request to the specified URL and get the response
  const response = await fetch("http:localhost:4000/products");

  let data: TProduct[] | undefined;
  // If the response is successful (status code in the range 200-299)
  if (response.ok) {
    // Parse the response body as JSON
    data = await response.json();
  } else {
    console.warn(response.statusText);
  }

  type TPaths = {
    params: {
      productId: string;
    };
  }[];

  const paths = data?.reduce((acc, val) => {
    acc.push({ params: { productId: val.id.toString() } });
    return acc;
  }, [] as TPaths);

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
    const response = await fetch(`http:localhost:4000/products/${params?.productId}`);

    // If the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Parse the response body as JSON
      const data: TProduct[] | undefined = await response.json();

      // Return the data as props
      return {
        props: {
          product: data,
        },
        revalidate: 10,
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
