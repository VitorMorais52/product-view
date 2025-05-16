import type { ProductDetailsType } from "../../types/product";

interface ProductDetailsInterface {
  details: ProductDetailsType;
}

export default function ProductDetails({ details }: ProductDetailsInterface) {
  return (
    <section id="product-details">
      <h1 id="product-details-title" className="text-2xl text-left font-bold">
        {details.title}
      </h1>
      <h2
        id="product-details-price"
        className="text-xl text-left font-semibold"
      >
        R$ {details.price}
      </h2>
    </section>
  );
}
