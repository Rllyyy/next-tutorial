import { useRouter } from "next/router";

type Props = {};

function Custom({}: Props) {
  const router = useRouter();
  const id = router.query.productID;
  return <h1>Custom Blog post: {id}</h1>;
}

export default Custom;
