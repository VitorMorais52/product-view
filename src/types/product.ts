export interface ProductInterface {
  id: string;
  title: string;
  price: string;
  images: string[];
  variants: ProductVariantType[];
}

export type ProductVariantType = { name: string; options: string[] };
export type ProductDetailsType = Pick<ProductInterface, "title" | "price">;
export type ProductImage = { title: string; url: string };
