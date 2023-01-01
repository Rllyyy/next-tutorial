import Link from "next/link";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
[];

export function PostPreview({ post }: { post: IPost }) {
  return (
    <Link href={`/posts/${post?.id}`} className='block link'>
      {post?.title}
    </Link>
  );
}
