import React from "react";

type Props = {};

function PageNotFound({}: Props) {
  return (
    <div className='p-8'>
      <h1 className='text-7xl text-center font-semibold'>404 - Page Not Found</h1>
      <p className='text-xl text-center mt-2'>Sorry, the page you are looking for could not be found.</p>
    </div>
  );
}

export default PageNotFound;
