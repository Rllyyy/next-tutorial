import { motion } from "framer-motion";
import React, { useState, memo, useEffect, HTMLAttributes, useMemo } from "react";

interface IItem {
  id: string;
}

export default function Memo() {
  const [items, setItems] = useState<IItem[]>([] as IItem[]);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    const data = [...items, { id: Date.now().toString() }];
    localStorage.setItem(`example`, JSON.stringify(data, null, "\t"));
    window.dispatchEvent(new Event("storage"));
  };

  const handleRemove = () => {
    const newValues = [...items];
    newValues.pop();
    localStorage.setItem(`example`, JSON.stringify(newValues, null, "\t"));
    window.dispatchEvent(new Event("storage"));
  };

  const onStorageChange = () => {
    const ls = localStorage.getItem("example");
    const parsed: IItem[] = parseJSON(ls);
    setItems(parsed || []);
    setLoading(false);
  };

  useEffect(() => {
    onStorageChange();
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const memoizedChildren = useMemo(() => <Child />, []);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <main className='p-8'>
      <h2 className='heading'>Memo</h2>
      <button
        type='button'
        className='px-4 py-2 mr-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800'
        onClick={handleAdd}
      >
        Add
      </button>
      <button
        type='button'
        className='px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800'
        onClick={handleRemove}
      >
        Remove
      </button>
      <div className='mt-3 space-y-2'>
        {items?.map((item) => {
          return (
            <ItemComponent id={item.id} key={item.id}>
              {memoizedChildren}
            </ItemComponent>
          );
        })}
      </div>
    </main>
  );
}

interface IItemComponent extends React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  id: IItem["id"];
}

const Child = () => {
  return <p>I am a Child Component</p>;
};

const ItemComponent = memo(({ id, children }: IItemComponent) => {
  console.log(`rerendered ${id}`);
  return (
    <motion.article
      className='p-2 rounded bg-zinc-100'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <p className='font-semibold'>{id}</p>
      {children}
    </motion.article>
  );
});

export function parseJSON(value: string | null) {
  if (value === null) {
    return null;
  } else if (value === "undefined") {
    return undefined;
  } else {
    try {
      return JSON.parse(value ?? "");
    } catch (error) {
      console.error(`parsing error on ${value}`);
      return undefined;
    }
  }
}
