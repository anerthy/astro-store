// import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs';
import type Credentials from '@auth/core/providers/credentials';

export default defineConfig({
  providers: [
    // GitHub({
    //   clientId: import.meta.env.GITHUB_ID,
    //   clientSecret: import.meta.env.GITHUB_SECRET,
    // }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password'},
      },
      authorize: async (credentials) => {
        
        const { email, password } = credentials;
        
        const [user] = await db
          .select()
          .from(User)
          .where(eq(User.email, email as string));

        if (!user) throw new Error('No user found');

        if (!bcrypt.compareSync(password as string, user.password)) {
          throw new Error('Invalid password');
        }

        const { password: _, ...rest } = user;
        console.log({ rest });
        
        return rest;
    },
    }),
  ],
});