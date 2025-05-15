import { useState } from "react";
import type { ProductVariantType } from "../../types/product";

import clsx from "clsx";

interface VariantSelectorInterface {
  variants: ProductVariantType[];
}

export default function ProductVariantSelector({
  variants,
}: VariantSelectorInterface) {
  const [sizes, colors] = variants;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <section
      id="product-variant-selector"
      className="w-full max-w-md mx-auto mt-6 space-y-4"
    >
      {colors.options.length > 0 && (
        <div>
          <h2 className="text-md text-left font-medium">Cor:</h2>
          <div className="flex gap-2 flex-wrap mt-2 bg-[#f9f9f9] p-3 rounded-md shadow-custom-light ">
            {colors.options.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={clsx(
                  "w-8 h-8 rounded-full border-2 cursor-pointer",
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-blue-500 border-blue-500"
                    : "border-gray-300",
                  "transition"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Selecionar cor ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      {sizes.options.length > 0 && (
        <div>
          <h2 className="text-md text-left font-medium">Tamanho:</h2>
          <div className="flex gap-2 flex-wrap mt-2  bg-[#f9f9f9] p-3 rounded-md shadow-custom-light ">
            {sizes.options.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={clsx(
                  "px-3 py-1 border rounded text-sm font-medium  cursor-pointer",
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
