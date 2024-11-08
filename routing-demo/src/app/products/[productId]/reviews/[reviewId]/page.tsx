export default async function ProductDetail({
  params,
}: {
  params: Promise<{ productId: string; reviewId: string }>;
}) {
  const { productId, reviewId } = await params;
  return (
    <h1>
      Review {reviewId} for product {productId}
    </h1>
  );
}
