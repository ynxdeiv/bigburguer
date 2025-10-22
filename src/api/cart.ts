import { CartItem } from "@/types";
import { API_ENDPOINTS } from "@/lib/apiConfig";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const getCartItemsFn = async (): Promise<ApiResponse<CartItem[]>> => {
  try {
    const response = await fetch(API_ENDPOINTS.CART);
    if (!response.ok) {
      throw new Error("Erro ao buscar carrinho");
    }
    const data = await response.json();

    return {
      data,
      status: 200,
      message: "Carrinho carregado com sucesso",
    };
  } catch (error) {
    throw {
      data: [],
      status: 500,
      message: "Erro interno do servidor",
    };
  }
};

export const addToCartFn = async (
  item: CartItem
): Promise<ApiResponse<CartItem>> => {
  try {
    const response = await fetch(API_ENDPOINTS.CART, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar ao carrinho");
    }
    const data = await response.json();

    return {
      data,
      status: 201,
      message: "Item adicionado ao carrinho",
    };
  } catch (error) {
    throw {
      data: {} as CartItem,
      status: 500,
      message: "Erro ao adicionar ao carrinho",
    };
  }
};

export const updateCartItemQuantityFn = async (
  id: string,
  quantity: number
): Promise<ApiResponse<CartItem>> => {
  try {
    const response = await fetch(API_ENDPOINTS.CART_ITEM(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar carrinho");
    }
    const data = await response.json();

    return {
      data,
      status: 200,
      message: "Carrinho atualizado com sucesso",
    };
  } catch (error) {
    throw {
      data: {} as CartItem,
      status: 500,
      message: "Erro ao atualizar carrinho",
    };
  }
};

export const removeFromCartFn = async (
  id: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await fetch(API_ENDPOINTS.CART_ITEM(id), {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao remover do carrinho");
    }

    return {
      data: undefined,
      status: 200,
      message: "Item removido do carrinho",
    };
  } catch (error) {
    throw {
      data: undefined,
      status: 500,
      message: "Erro ao remover do carrinho",
    };
  }
};
