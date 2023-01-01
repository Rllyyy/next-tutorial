import Link from "next/link";

type Props = {};

function Blog({}: Props) {
  return (
    <main className='px-8 py-8'>
      <h1 className='text-zinc-800 text-7xl font-semibold text-center py-8'>Blog</h1>
      <Link href='/blog/first' className='text-blue-700 font-semibold text-xl block hover:underline '>
        First Block Post
      </Link>
      <Link href='/' className='text-blue-700 font-semibold text-xl block hover:underline '>
        Home
      </Link>
    </main>
  );
}

export default Blog;
