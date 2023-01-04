import { User } from "pages/static-generation";

export function User({ user }: { user: User }) {
  return (
    <div className='p-3 border rounded border-1 border-zinc-300 drop-shadow-md bg-zinc-50'>
      <h2 className='text-xl font-semibold'>{user.name}</h2>
      <a href={user.website} className='link'>
        {user.website}
      </a>
      <div className='text-sm'>
        <span>{user.address.zipcode.split("-")[0]}</span>
        <span> {user.address.city}</span>
      </div>
    </div>
  );
}
