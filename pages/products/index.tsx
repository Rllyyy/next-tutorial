import Link from "next/link";

export type TProduct = {
  id: string;
  title: string;
  price: number;
  description: string;
};

interface Props {
  products: TProduct[] | undefined;
  error: string;
}

function ProductList({ products, error }: Props) {
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main className='p-8'>
      <h1 className='text-5xl font-semibold'>Products</h1>
      <div className='grid gap-2 mt-4 gird-cols-1 md:grid-cols-3'>
        {products?.map((product) => {
          return (
            <div
              key={product.id}
              className='p-3 border rounded-xl bg-slate-50 border-1 border-slate-400 drop-shadow-sm'
            >
              <h2 className='text-xl font-semibold'>{product.title}</h2>
              <p>{product.description}</p>
              <p>{product.price}€</p>
              <Link href={`/products/${product.id}`}>View</Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default ProductList;

export async function getStaticProps() {
  // Try block to catch any errors thrown by the fetch function
  try {
    // Send a request to the specified URL and get the response
    const response = await fetch("http:localhost:4000/products");

    // If the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Parse the response body as JSON
      const data: TProduct[] | undefined = await response.json();

      // Return the data as props
      return {
        props: {
          products: data,
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
