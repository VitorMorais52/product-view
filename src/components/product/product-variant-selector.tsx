import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../services/local-storage-service";
import type { ProductVariantType } from "../../types/product";

interface VariantSelectorInterface {
  variants: ProductVariantType[];
}

const STORAGE_KEY = "product-variants";

export default function ProductVariantSelector({
  variants,
}: VariantSelectorInterface) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    () => {
      const stored = getFromLocalStorage<{ value: Record<string, string> }>(
        STORAGE_KEY
      );
      return stored?.value ?? {};
    }
  );

  const handleSelect = (name: string, value: string) => {
    setSelectedValues((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  useEffect(() => {
    if (Object.keys(selectedValues).length > 0) {
      setToLocalStorage(STORAGE_KEY, selectedValues, 15);
    }
  }, [selectedValues]);

  const renderColorSelector = (name: string, options: string[]) => (
    <div>
      <h2 className="text-md text-left font-medium capitalize">{name}:</h2>
      <div className="mt-2 flex flex-wrap gap-2 bg-[#f9f9f9] p-3 rounded-md shadow-custom-light">
        {options.map((color) => (
          <button
            key={color}
            onClick={() => handleSelect(name, color)}
            className={clsx(
              "w-8 h-8 rounded-full border-2 cursor-pointer transition",
              selectedValues[name] === color
                ? "ring-2 ring-offset-2 ring-blue-500 border-blue-500"
                : "border-gray-300"
            )}
            style={{ backgroundColor: color }}
            aria-label={`Selecionar cor ${color}`}
          />
        ))}
      </div>
    </div>
  );

  const renderSizeSelector = (name: string, options: string[]) => (
    <div>
      <h2 className="text-md text-left font-medium capitalize">{name}:</h2>
      <div className="mt-2 flex flex-wrap gap-2 bg-[#f9f9f9] p-3 rounded-md shadow-custom-light">
        {options.map((size) => (
          <button
            key={size}
            onClick={() => handleSelect(name, size)}
            className={clsx(
              "px-3 py-1 text-sm font-medium rounded border cursor-pointer",
              selectedValues[name] === size
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDefaultSelector = (name: string, options: string[]) => (
    <div>
      <h2 className="text-md text-left font-medium capitalize">{name}:</h2>
      <select
        className="mt-2 w-full p-2 border border-gray-300 rounded-md bg-white shadow-custom-light"
        value={selectedValues[name] || ""}
        onChange={(e) => handleSelect(name, e.target.value)}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const renderSelectorByType = (variant: ProductVariantType) => {
    const name = variant.name?.trim() || "Selecione";
    const type = variant.type?.trim() || "default";
    const options = variant.options;

    if (!options || options.length === 0) return null;

    switch (type) {
      case "color":
        return renderColorSelector(name, options);
      case "size":
        return renderSizeSelector(name, options);
      default:
        return renderDefaultSelector(name, options);
    }
  };

  return (
    <section
      id="product-variant-selector"
      className="w-full max-w-md mx-auto mt-6 space-y-4"
    >
      {variants.map((variant, i) => (
        <div key={variant.name || `variant-${i}`}>
          {renderSelectorByType(variant)}
        </div>
      ))}
    </section>
  );
}
