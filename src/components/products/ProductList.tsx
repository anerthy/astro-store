import type { ProductWithImages } from '@/interfaces/ProductWithImages';
import { ProductCard } from './ProductCard';

interface Props {
  products: ProductWithImages[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
