import ProductView from "../components/product/product-view";

export default function ProductViewPage() {
  return (
    <div
      id="product-view-page"
      className="flex flex-col justify-center items-center w-full h-full py-8 m-auto rounded-lg"
    >
      <ProductView />
    </div>
  );
}
