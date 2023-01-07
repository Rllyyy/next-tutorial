import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className='sticky top-0 flex flex-row w-full p-3 bg-slate-900 text-slate-50'>
      <span className='font-semibold'>Navbar</span>
      <ul
        className={`flex flex-row ml-auto gap-x-4 md:gap-x-6 transition-opacity ease-in ${
          !session && status === "loading" ? "opacity-0" : "opacity-100"
        } `}
      >
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/profile'>Profile</Link>
        </li>
        <li>
          <Link href='/blog-auth'>Blog</Link>
        </li>
        {status === "unauthenticated" && !session && (
          <li>
            <Link
              href='/api/auth/signin'
              onClick={(e) => {
                e.preventDefault();
                signIn("github");
              }}
            >
              Sign In
            </Link>
          </li>
        )}
        {status === "authenticated" && session && (
          <li>
            <Link
              href='/api/auth/signout'
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
