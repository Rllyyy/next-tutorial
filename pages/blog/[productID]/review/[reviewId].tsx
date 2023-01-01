import { useRouter } from "next/router";

type Props = {};

function Review({}: Props) {
  const router = useRouter();

  const { productID, reviewId } = router.query;

  return (
    <div>
      This is the {reviewId} review for product {productID}{" "}
    </div>
  );
}

export default Review;
