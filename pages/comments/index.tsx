import { Comment } from "../api/comments";
import React, { useState, useEffect, memo, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import Head from "next/head";

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([] as Comment[]);

  const fetchComments = useCallback(async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    setComments(data);
  }, []);

  const handleCommentDelete = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    const commentId = e.currentTarget.getAttribute("comment-id");

    //Make delete request
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      setComments([...data]);
    } else {
      console.error(response.statusText);
    }
  }, []);

  // Fetch comments on mount and reset on unmount
  useEffect(() => {
    fetchComments();

    return () => {
      setComments([]);
    };
  }, [fetchComments]);

  return (
    <>
      <Head>
        <title>Comments</title>
        <meta name='description' content='This is the content' />
      </Head>
      <main className='p-8'>
        <h1 className='heading'>Comments</h1>
        <button
          onClick={fetchComments}
          className='px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800'
          type='button'
        >
          Load Comments
        </button>
        <div className='mt-4 [counter-reset: section 1] space-y-2'>
          {comments?.map((comment) => {
            return (
              <Comment key={comment.id} text={comment.text} id={comment.id} handleCommentDelete={handleCommentDelete} />
            );
          })}
        </div>
        <AddComment fetchComments={fetchComments} />
      </main>
    </>
  );
}

const Comment = memo(
  ({
    text,
    id,
    handleCommentDelete,
  }: Comment & { handleCommentDelete: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> }) => {
    return (
      <div
        key={id}
        className='flex flex-row before:content-[counter(section)"._"]'
        style={{
          counterIncrement: "section 1",
        }}
      >
        <span className='whitespace-pre'>
          {" "}
          {text} ({id})
        </span>
        <button onClick={handleCommentDelete} comment-id={id}>
          <IoClose className='ml-4 text-2xl text-red-600 hover:text-red-700' />
        </button>
      </div>
    );
  }
);

const AddComment = memo(({ fetchComments }: { fetchComments: () => Promise<void> }) => {
  const [comment, setComment] = useState<Comment["text"]>("");

  // Update comment state
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  // Handle click of button (form submit)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // API call
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setComment("");
        fetchComments();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center mt-3'>
      <input
        type='text'
        placeholder='Your comment'
        value={comment}
        onChange={handleInputChange}
        className='px-4 py-2 mr-2 leading-normal bg-gray-200 rounded-md appearance-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500'
      />
      <button
        type='submit'
        className='px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 active:bg-indigo-800'
      >
        Add
      </button>
    </form>
  );
});
