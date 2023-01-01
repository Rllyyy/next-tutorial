import Link from "next/link";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next/types";

/* 
 This component uses client side filtering.
 You could also do this filtering on the api with:
 
 ```js
 import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next/types";

 getServerSideProps(context: GetServerSidePropsContext){
  const { query } = context;
  const { category } = query;

  const response = await fetch(`http:localhost:4000/events${category ? `?category=${category}` : ""}`);
 }
 ```

 But with whit method the server has to respond on every navigation.
 It would also be possible to then fetch the data on the client and do the filtering there
*/

export interface Event {
  id: number;
  title: string;
  description: string;
  category: "food" | "sports" | "art" | "technology";
  date: string;
}

export default function Events({ events, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;

    router.push(
      {
        pathname: "/events",
        query: value ? `category=${e.target.value}` : undefined,
      },
      undefined,
      { shallow: true }
    );
  }

  if (error) return <div>{error}</div>;
  if (!events) return <div>Loading...</div>;

  return (
    <main className='p-8'>
      <div className='flex flex-row flex-wrap items-center justify-between gap-4'>
        <h1 className='inline-flex text-5xl'>Events</h1>
        <div className=''>
          <label htmlFor='filter' className='mr-1'>
            Filter by Type:
          </label>
          <select
            name='event-filter'
            id='filter'
            onChange={handleChange}
            value={router.query.category || ""}
            className='px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded-md shadow-sm border-1 focus:outline-none focus:shadow-outline-blue-500'
          >
            <option value=''>All</option>
            <option value='sports'>Sports</option>
            <option value='food'>Food</option>
            <option value='art'>Art</option>
            <option value='technology'>Technology</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-3'>
        {/* Display all events if there is no filter and if there is a filter, only display those */}
        {events
          .filter((item) => Object.keys(router.query).length === 0 || item.category === router.query.category)
          .map((event) => {
            return (
              <article
                key={event.id}
                className='p-2 bg-gray-100 border border-gray-300 rounded-lg border-1'
                id={event.id.toString()}
              >
                <h2 className='text-xl font-semibold '>{event.title}</h2>
                <p>{event.date}</p>
                <Link
                  className='inline-block px-3 py-[5px] mt-2 font-semibold leading-none text-gray-100 bg-blue-700 rounded-full'
                  href={{ pathname: "/events", query: { category: event.category } }}
                  shallow
                >
                  {event.category}
                </Link>
              </article>
            );
          })}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  // Try block to catch any errors thrown by the fetch function
  try {
    // Send a request to the specified URL and get the response
    const response = await fetch("http:localhost:4000/events");
    console.log("server fetched");

    // If the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Parse the response body as JSON
      const data: Event[] = await response.json();

      // Return the data as props
      return {
        props: {
          events: data,
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
