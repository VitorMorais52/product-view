import products from "../../data/product.json";
import type { ProductInterface } from "../../types/product";

import ProductDetails from "./product-details";
import ProductGallery from "./product-gallery";
import ProductShipping from "./product-shipping";
import ProductVariantSelector from "./product-variant-selector";

export default function ProductView() {
  const product: ProductInterface = products[0];
  const { title, price, images, variants } = product;

  return (
    <main
      id="product-view"
      className="flex flex-col md:flex-row justify-center items-center py-8 w-[90%] max-w-[1280px] md:w-full mx-auto gap-14 rounded-lg bg-[#f0f0f0] shadow-custom-light"
    >
      <div id="product-view-left-content" className="rounded-md">
        <ProductGallery images={images} />
      </div>
      <div id="product-view-right-content" className="flex flex-col md:mb-auto">
        <ProductDetails details={{ title, price }} />
        <ProductVariantSelector variants={variants} />
        <ProductShipping />
      </div>
    </main>
  );
}
