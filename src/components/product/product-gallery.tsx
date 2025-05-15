import { useState } from "react";
import clsx from "clsx";
import type { ProductImage } from "../../types/product";

interface ProductGalleryInterface {
  images: ProductImage[];
}
export default function ProductGallery({ images }: ProductGalleryInterface) {
  const [current, setCurrent] = useState(0);

  const goToImage = (index: number) => setCurrent(index);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="product-gallery" className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden  min-w-[280px] max-w-[448px] w-[35vw] rounded-md bg-[#f9f9f9]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Product photo ${index + 1}`}
              className="min-w-full aspect-square object-contain"
            />
          ))}
        </div>

        <button
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
        >
          ›
        </button>
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            aria-label={`View image ${index + 1}`}
            className={clsx(
              "w-14 h-14 p-[1px] rounded border focus:outline-none",
              current === index
                ? "border-blue-500"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
