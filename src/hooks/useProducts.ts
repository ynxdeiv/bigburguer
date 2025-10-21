"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { Product } from "@/types";
import {
  getProductsFn,
  getProductByIdFn,
  updateProductAvailabilityFn,
} from "@/services";

export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productQueryKeys.lists(),
    queryFn: async () => {
      const response = await getProductsFn();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productQueryKeys.detail(id),
    queryFn: async () => {
      const response = await getProductByIdFn(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProductAvailability() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      available,
    }: {
      id: string;
      available: number;
    }) => {
      const response = await updateProductAvailabilityFn(id, available);
      return response.data;
    },
    onSuccess: () => {
      toastSuccess("Produto atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
    onError: (error: any) => {
      const message = error.message || "Erro ao atualizar produto";
      toastError(message);
    },
  });
}
