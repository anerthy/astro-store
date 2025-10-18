/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />

type Role = 'user' | 'admin';

interface User {
  name: string;
  email: string;
  role: Role;
  // avatar: string;
  // emailVerified: boolean;
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: User | null;
  }
}

interface ImportMetaEnv {
  readonly AUTH_TRUST_HOST: 'true' | 'false';
  readonly AUTH_SECRET: string;
  readonly PUBLIC_URL: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_SITE_DESCRIPTION: string;
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
