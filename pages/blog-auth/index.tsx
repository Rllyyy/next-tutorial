import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function BlogAuth({ blogData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Blog with auth</title>
        <meta name='description' content='This is the blog with auth page' />
      </Head>
      <main className='min-h-screen p-4'>
        <h1 className='heading'>Auth</h1>
        <p>{blogData}</p>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=http://localhost:3000/blog-auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      //Kinda useless ternary
      blogData: session ? "List of 100 personalizedblogs" : "List of free blogs",
    },
  };
}
