import Head from "next/head";
import Image from "next/image";

const itemValues = [...Array(4).keys()].map((item) => (item + 1).toString());

export default function PetsPage() {
  return (
    <>
      <Head>
        <title>Pets</title>
        <meta name='description' content='This page contains images of pets' />
      </Head>
      <main className='p-4'>
        <h1 className='heading'>Pets</h1>
        <div className='space-y-56'>
          {itemValues.map((item) => {
            return (
              <Image
                src={`/assets/${item}.jpg`}
                alt='Image'
                width={1080}
                height={120}
                key={item}
                style={{ width: "auto", height: "auto" }}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
