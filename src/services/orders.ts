import { OrderData } from "@/types";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const getOrdersFn = async (): Promise<ApiResponse<OrderData[]>> => {
  const response = await fetch("http://localhost:3001/orders");
  if (!response.ok) throw new Error("Erro ao buscar pedidos");
  const data = await response.json();
  return { data, status: 200, message: "Pedidos carregados" };
};

export const createOrderFn = async (
  order: OrderData
): Promise<ApiResponse<OrderData>> => {
  const orderWithId = {
    id: `ORDER-${Date.now()}`,
    ...order,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch("http://localhost:3001/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderWithId),
  });
  if (!response.ok) throw new Error("Erro ao criar pedido");
  const data = await response.json();
  return { data, status: 201, message: "Pedido criado" };
};

export const getOrderByIdFn = async (
  id: string
): Promise<ApiResponse<OrderData>> => {
  const response = await fetch(`http://localhost:3001/orders/${id}`);
  if (!response.ok) throw new Error("Pedido não encontrado");
  const data = await response.json();
  return { data, status: 200, message: "Pedido carregado" };
};
