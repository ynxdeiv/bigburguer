import { Product } from "@/types";
import { API_ENDPOINTS } from "@/lib/apiConfig";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const getProductsFn = async (): Promise<ApiResponse<Product[]>> => {
  const response = await fetch(API_ENDPOINTS.PRODUCTS);
  if (!response.ok) throw new Error("Erro ao buscar produtos");
  const data = await response.json();
  return { data, status: 200, message: "Produtos carregados" };
};

export const getProductByIdFn = async (
  id: string
): Promise<ApiResponse<Product>> => {
  const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id));
  if (!response.ok) throw new Error("Produto não encontrado");
  const data = await response.json();
  return { data, status: 200, message: "Produto carregado" };
};

export const updateProductAvailabilityFn = async (
  id: string,
  available: number
): Promise<ApiResponse<Product>> => {
  const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ available }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar produto");
  const data = await response.json();
  return { data, status: 200, message: "Produto atualizado" };
};
