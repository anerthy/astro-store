export const getUrlProductImage = (url: string) => {
  return url.startsWith('http')
    ? url
    : `${import.meta.env.PUBLIC_URL}/images/products/${url}`;
};
