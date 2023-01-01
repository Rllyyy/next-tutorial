import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

type Props = {};

function Doc({}: Props) {
  const router = useRouter();
  const { params = [] } = router.query;

  if (params.length === 2) {
    return (
      <h1>
        Viewing docs for feature {params[0]} and concept {params[1]}
      </h1>
    );
  } else if (params.length === 1) {
    return <h1>Viewing docs for feature {params[0]}</h1>;
  }
  return (
    <main className='px-8 py- 16'>
      <h1 className='text-5xl'>Docs Home Page</h1>
      <Link
        href={`/docs/${randomIntFromInterval(1, 6)}`}
        className='to-blue-600 hover:underline font-semibold mt-4 block text-xl'
      >
        Random Docs page (just feature)
      </Link>
      <Link
        href={`/docs/${randomIntFromInterval(1, 6)}/${randomIntFromInterval(1, 6)}`}
        className='to-blue-600 hover:underline font-semibold mt-4 block text-xl'
      >
        Random Docs page (feature + concept)
      </Link>
    </main>
  );
}

export default Doc;

//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
