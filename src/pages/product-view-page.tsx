import Header from "../components/common/header";
import Footer from "../components/common/footer";
import ProductView from "../components/product/product-view";

export default function ProductViewPage() {
  return (
    <div
      id="product-view-page"
      className="flex flex-col w-full h-full m-auto rounded-lg overflow-hidden"
    >
      <Header />
      <ProductView />
      <Footer />
    </div>
  );
}
