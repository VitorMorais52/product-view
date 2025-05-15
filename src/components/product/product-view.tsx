import ProductDetails from "./product-details";
import ProductGallery from "./product-gallery";
import ProductShipping from "./product-shipping";
import ProductVariantSelector from "./product-variant-selector";

import photo1 from "../../assets/product-photos/photo-1.jpg";
import photo2 from "../../assets/product-photos/photo-2.jpg";
import photo3 from "../../assets/product-photos/photo-3.jpg";

export default function ProductView() {
  return (
    <main
      id="product-view"
      className="flex justify-center items-center max-w-[1280px] w-full mx-auto py-14 gap-14 rounded-lg bg-[#f0f0f0] shadow-custom-light "
    >
      <div
        id="product-view-left-content"
        className="rounded-md overflow-hidden"
      >
        <ProductGallery
          images={[
            { title: "photo1", url: photo1 },
            { title: "photo2", url: photo2 },
            { title: "photo3", url: photo3 },
          ]}
        />
      </div>
      <div
        id="product-view-right-content"
        className="shadow-custom-hard flex flex-col mb-auto"
      >
        <ProductDetails details={{ title: "Product title", price: "109,90" }} />
        <ProductVariantSelector
          variants={[
            { name: "sizes", options: ["P", "M", "G", "GG"] },
            { name: "colors", options: ["#000", "#353535", "#ddd", "#fff"] },
          ]}
        />
        <ProductShipping />
      </div>
    </main>
  );
}
