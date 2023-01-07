import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

export default function ProfilePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  if (!session) {
    return <h1> Not authorized</h1>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name='description' content='This is the profile page' />
      </Head>
      <main className='min-h-screen p-4'>
        <h1 className='heading'>Profile</h1>
        <div className='p-4 bg-gray-200 rounded shadow-lg grid grid-cols-[1fr_max-content] mt-4'>
          <div>
            <p className='text-xl font-semibold'>{session.user?.name}</p>
            <p>{session.user?.email}</p>
          </div>
          {session.user?.image && <img src={session.user?.image} className='rounded-full w-14' />}
        </div>
      </main>
    </>
  );
}
