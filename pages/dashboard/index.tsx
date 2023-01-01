import { useState, useEffect } from "react";

export type IDashboard = {
  posts: number;
  likes: number;
  followers: number;
  following: number;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error["message"] | null>(null);
  const [data, setData] = useState<IDashboard>({} as IDashboard);

  async function fetchDashboardData() {
    // Try block to catch any errors thrown by the fetch function
    try {
      // Send a request to the specified URL and get the response
      const response = await fetch(`http://localhost:4000/dashboard`);

      // If the response is successful (status code in the range 200-299)
      if (response.ok) {
        // Parse the response body as JSON
        const data: IDashboard | undefined = await response.json();

        if (data) {
          setData(data);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError(response.statusText);
      }
    } catch (error) {
      // If there was an error thrown by the fetch function, set the error message
      if (error instanceof Error) {
        setError(error.message);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchDashboardData();

    return () => {
      setData({} as IDashboard);
    };
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className='p-8'>
      <h1 className='text-center heading'>Dashboard</h1>
      <p className='mt-4 text-xl font-semibold'>Posts: {data.posts}</p>
      <p className='mt-4 text-xl font-semibold'>Likes: {data.likes}</p>
      <p className='mt-4 text-xl font-semibold'>Followers: {data.followers}</p>
      <p className='mt-4 text-xl font-semibold'>Following: {data.following}</p>
    </main>
  );
}
