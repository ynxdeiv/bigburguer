"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { OrderData, Order } from "@/types";
import { getOrdersFn, createOrderFn, getOrderByIdFn } from "@/services";

export const orderQueryKeys = {
  all: ["orders"] as const,
  lists: () => [...orderQueryKeys.all, "list"] as const,
  details: () => [...orderQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...orderQueryKeys.details(), id] as const,
};

export function useOrders() {
  return useQuery({
    queryKey: orderQueryKeys.lists(),
    queryFn: async () => {
      const response = await getOrdersFn();
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderQueryKeys.detail(id),
    queryFn: async () => {
      const response = await getOrderByIdFn(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (orderData: OrderData): Promise<Order> => {
      const response = await createOrderFn(orderData);
      return response.data as Order;
    },
    onSuccess: (order) => {
      toastSuccess(`Pedido ${order.id} criado com sucesso!`);
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
    },
    onError: (error: any) => {
      const message = error.message || "Erro ao criar pedido";
      toastError(message);
    },
  });
}
