import useSWR from "swr";
import { IDashboard } from "..";

// Async function to fetch data from the specified URL
async function fetcher(): Promise<IDashboard | undefined> {
  try {
    // Send a request to the specified URL and get the response
    const response = await fetch(`http://localhost:4000/dashboard`);

    // If the response is successful (status code in the range 200-299)
    if (response.ok) {
      // Parse the response body as JSON and return the data
      const data = await response.json();
      return data;
    } else {
      // If the response is not successful, throw an error with the status text
      throw new Error(response.statusText);
    }
  } catch (error) {
    // If there was an error thrown by the fetch function, log it to the console and throw a new error with the message
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default function DashboardSWR() {
  // Call the useSWR hook with the fetcher function and the URL of the endpoint to fetch data from
  // Type the data returned from the endpoint as IDashboard | undefined, and the error as Error
  const { data, error } = useSWR<IDashboard | undefined, Error>("dashboard", fetcher);

  // If there was an error, render the error message
  if (error) return <div>{error.message}</div>;

  // If the data is still being fetched, render a loading message
  if (!data) return <div>Loading...</div>;

  // If the data was successfully retrieved, render it in the component
  return (
    <main className='p-8'>
      <h1 className='text-center heading'>Dashboard using SWR</h1>
      <p className='mt-4 text-xl font-semibold'>Posts: {data.posts}</p>
      <p className='text-xl font-semibold'>Likes: {data.likes}</p>
      <p className='text-xl font-semibold'>Followers: {data.followers}</p>
      <p className='text-xl font-semibold'>Following: {data.following}</p>
    </main>
  );
}
