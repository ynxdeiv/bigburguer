import { OrderData } from "@/types";
import { API_ENDPOINTS } from "@/lib/apiConfig";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const getOrdersFn = async (): Promise<ApiResponse<OrderData[]>> => {
  try {
    const response = await fetch(API_ENDPOINTS.ORDERS);
    if (!response.ok) {
      throw new Error("Erro ao buscar pedidos");
    }
    const data = await response.json();

    return {
      data,
      status: 200,
      message: "Pedidos carregados com sucesso",
    };
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw new Error("Erro interno do servidor");
  }
};

export const createOrderFn = async (
  order: OrderData
): Promise<ApiResponse<OrderData>> => {
  try {
    const orderWithId = {
      id: `ORDER-${Date.now()}`,
      ...order,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(API_ENDPOINTS.ORDERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderWithId),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar pedido");
    }
    const data = await response.json();

    return {
      data,
      status: 201,
      message: "Pedido criado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw new Error("Erro ao criar pedido");
  }
};

export const getOrderByIdFn = async (
  id: string
): Promise<ApiResponse<OrderData>> => {
  try {
    const response = await fetch(API_ENDPOINTS.ORDER_BY_ID(id), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Pedido não encontrado");
    }
    const data = await response.json();

    return {
      data,
      status: 200,
      message: "Pedido carregado com sucesso",
    };
  } catch (error) {
    console.error(`Erro ao buscar pedido ${id}:`, error);
    throw new Error(`Erro ao buscar pedido ${id}`);
  }
};
