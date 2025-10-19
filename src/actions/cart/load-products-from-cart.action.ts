import { defineAction } from 'astro:actions';
import { db, inArray, Product, ProductImage, eq } from 'astro:db';
import type { CartItem } from '@/interfaces/cart-item';
import { getUrlProductImage } from '@/utils/get-url-product-image';

export const loadProductsFromCart = defineAction({
  accept: 'json',
  handler: async (_, { cookies }) => {
    const cart = JSON.parse(cookies.get('cart')?.value ?? '[]') as CartItem[];

    if (cart.length === 0) return [];

    const productIds = cart.map((item) => item.productId);

    const products = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(ProductImage.productId, Product.id))
      .where(inArray(Product.id, productIds));

    return cart.map((item) => {
      const product = products.find((p) => p.Product.id === item.productId);
      if (!product)
        throw new Error(`Product with id ${item.productId} not found`);

      return {
        productId: item.productId,
        image: getUrlProductImage(product.ProductImage.image),
        price: product.Product.price,
        quantity: item.quantity,
        size: item.size,
        slug: product.Product.slug,
        title: product.Product.title,
      };
    });
  },
});
