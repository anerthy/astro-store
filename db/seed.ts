import { db, Role, User, Product, ProductImage } from 'astro:db';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Administrator' },
    { id: 'user', name: 'User' },
  ];

  const JohnDoe = {
    id: '76fe1628-f7b9-4eca-8da1-8468aa806fff',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: bcrypt.hashSync('123456'),
    createdAt: new Date(),
    role: 'admin',
  };

  const JaneDoe = {
    id: 'b76e0bd6-0646-4c58-8d41-7903795d3d94',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    password: bcrypt.hashSync('123456'),
    createdAt: new Date(),
    role: 'user',
  };

  await db.insert(Role).values(roles);
  await db.insert(User).values([JohnDoe, JaneDoe]);

  const queries: any = [];

  seedProducts.forEach((p) => {
    const product = {
      id: uuid(),
      description: p.description,
      gender: p.gender,
      price: p.price,
      sizes: p.sizes.join(','),
      slug: p.slug,
      stock: p.stock,
      tags: p.tags.join(','),
      title: p.title,
      type: p.type,
      user: JohnDoe.id,
    };

    queries.push(db.insert(Product).values(product));

    p.images.forEach((img) => {
      const image = {
        id: uuid(),
        productId: product.id,
        image: img,
      };

      queries.push(db.insert(ProductImage).values(image));
    });
  });

  await db.batch(queries);
}
