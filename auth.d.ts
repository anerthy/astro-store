import type { DefaultUser, DefaultSession } from "@auth/core/types";

export type Role = 'user' | 'admin';

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    role: Role;
  };

  interface Session extends DefaultSession {
    user: User;
  }

}
