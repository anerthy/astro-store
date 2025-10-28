import { ImageUpload } from '@/utils/image-upload';
import { defineAction } from 'astro:actions';
import { db, eq, Product, ProductImage } from 'astro:db';
import { z } from 'astro:schema';
import { getSession } from 'auth-astro/server';
import { v4 as uuid } from 'uuid';

const MAX_IMAGE_SIZE = 5_000_000; // 5MB
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];

export const upsertProduct = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string().optional(),
    description: z.string(),
    gender: z.string(),
    price: z.number(),
    sizes: z.string(),
    slug: z.string(),
    stock: z.number(),
    tags: z.string(),
    title: z.string(),
    type: z.string(),
    imageFiles: z
      .array(
        z
          .instanceof(File)
          .refine(
            (file) => file.size <= MAX_IMAGE_SIZE,
            'Maximum file size is 5MB'
          )
          .refine((file) => {
            return (
              ALLOWED_IMAGE_TYPES.includes(file.type),
              `Only ${ALLOWED_IMAGE_TYPES.join(', ')} files are allowed`
            );
          })
      )
      .optional(),
  }),
  handler: async (form, { request }) => {
    const session = await getSession(request);
    const user = session?.user;

    if (!user) {
      throw new Error('Unauthorized');
    }

    const { id = uuid(), imageFiles, ...rest } = form;

    rest.slug = rest.slug.toLowerCase().replaceAll(' ', '_').trim();

    const product = {
      id: id,
      user: user.id,
      ...rest,
    };

    const queries: any = [];

    if (!form.id) {
      queries.push(db.insert(Product).values(product));
    } else {
      queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
    }

    // Handle image uploads
    const secureUrls: string[] = [];
    if (form.imageFiles && form.imageFiles.length > 0) {
      const urls = await Promise.all(
        form.imageFiles.map((file) => ImageUpload.upload(file))
      );

      secureUrls.push(...urls);
    }

    secureUrls.forEach((url) => {
      const imageObject = {
        id: uuid(),
        image: url,
        productId: product.id,
      };

      queries.push(db.insert(ProductImage).values(imageObject));
    });

    await db.batch(queries);

    return product;
  },
});
