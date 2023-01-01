import React, { useState } from "react";
import { User } from "../components/user";

type Props = {
  users: User[];
};

// Generated by https://quicktype.io

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

function StaticGeneration({ users }: Props) {
  return (
    <main className='p-8'>
      <h1 className='heading'>List of Users</h1>
      <div className='grid grid-cols-1 gap-2 mt-4 md:grid-cols-3'>
        {users?.map((user) => {
          return <User user={user} key={user.id} />;
        })}
      </div>
    </main>
  );
}

export default StaticGeneration;

export async function getStaticProps() {
  try {
    //You should probably use react query instead
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (res.ok) {
      const resJSON = await res.json();
      return {
        props: {
          users: resJSON,
        },
      };
    } else {
      console.warn("Error");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.warn(error);
    }
  }
}