import { CartItem } from "@/types";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const getCartItemsFn = async (): Promise<ApiResponse<CartItem[]>> => {
  const response = await fetch("http://localhost:3001/cart");
  if (!response.ok) throw new Error("Erro ao buscar carrinho");
  const data = await response.json();
  return { data, status: 200, message: "Carrinho carregado" };
};

export const addToCartFn = async (
  item: CartItem
): Promise<ApiResponse<CartItem>> => {
  const response = await fetch("http://localhost:3001/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Erro ao adicionar ao carrinho");
  const data = await response.json();
  return { data, status: 201, message: "Item adicionado" };
};

export const updateCartItemQuantityFn = async (
  id: string,
  quantity: number
): Promise<ApiResponse<CartItem>> => {
  const response = await fetch(`http://localhost:3001/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar carrinho");
  const data = await response.json();
  return { data, status: 200, message: "Carrinho atualizado" };
};

export const removeFromCartFn = async (
  id: string
): Promise<ApiResponse<void>> => {
  const response = await fetch(`http://localhost:3001/cart/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao remover do carrinho");
  return { data: undefined, status: 200, message: "Item removido" };
};
