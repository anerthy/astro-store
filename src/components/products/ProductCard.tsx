import type { ProductWithImages } from '@/interfaces/ProductWithImages';
import { useState } from 'react';

interface Props {
  product: ProductWithImages;
}

export const ProductCard = ({ product }: Props) => {
  const images = product.images.split(',').map((img) => {
    return img.startsWith('http')
      ? img
      : `${import.meta.env.PUBLIC_URL}/images/products/${img}`;
  });

  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <a href={`/products/${product.slug}`} className="block max-w-sm">
      <img
        src={currentImage}
        alt={product.title}
        className="h-[350px] object-contain"
        onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
        onMouseLeave={() => setCurrentImage(images[0])}
      />
      <h4 className="text-lg font-semibold">{product.title}</h4>
      <p className="text-gray-600">${product.price}</p>
    </a>
  );
};
