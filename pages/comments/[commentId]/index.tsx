import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { comments } from "../../../data/comments";

export default function CommentPage({ comment, error }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (error) {
    console.warn(error);
    return <p>{error}</p>;
  }

  return (
    <main className='p-8'>
      <h1 className='heading'>Comment</h1>
      <div>
        <span>{comment?.id}.</span>
        <span className='whitespace-pre'> {comment?.text}</span>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const paths = comments.map((comment) => {
    return { params: { commentId: comment.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { params } = ctx;
  const id = params?.commentId;

  if (!id) {
    return {
      props: {
        error: "comment id is undefined",
      },
    };
  } else if (Array.isArray(id)) {
    return {
      props: {
        error: "comment id is array",
      },
    };
  }

  // Not using fetch here because resource exists in project
  const comment = comments.find((comment) => comment.id === parseInt(id));

  return {
    props: {
      comment,
    },
  };
}
