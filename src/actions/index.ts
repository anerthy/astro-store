import { loginUser, logout, registerUser } from './auth';
import { getProductsByPage, getProductBySlug } from './products';

export const server = {
  loginUser,
  logout,
  registerUser,
  getProductsByPage,
  getProductBySlug,
};
