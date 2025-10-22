const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
  CART: `${API_BASE_URL}/cart`,
  CART_ITEM: (id: string) => `${API_BASE_URL}/cart/${id}`,
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
  CONTACTS: `${API_BASE_URL}/contacts`,
  USERS: `${API_BASE_URL}/users`,
} as const;

export { API_BASE_URL };
