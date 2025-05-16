export interface ProductInterface {
  id: number;
  title: string;
  price: string;
  images: ProductImage[];
  variants: ProductVariantType[];
}

export type ProductVariantType = {
  name?: string;
  type?: string;
  options: string[];
};
export type ProductDetailsType = Pick<ProductInterface, "title" | "price">;
export type ProductImage = { title: string; url: string };
