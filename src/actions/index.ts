import { loginUser, logout, registerUser } from './auth';
import { loadProductsFromCart } from './cart';
import { getProductsByPage, getProductBySlug } from './products';

export const server = {
  loginUser,
  logout,
  registerUser,
  getProductsByPage,
  getProductBySlug,
  loadProductsFromCart,
};
