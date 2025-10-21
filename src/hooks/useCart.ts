"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { CartItem } from "@/types";
import {
  getCartItemsFn,
  addToCartFn,
  updateCartItemQuantityFn,
  removeFromCartFn,
} from "@/services";
import { getProductByIdFn, updateProductAvailabilityFn } from "@/services";

export const cartQueryKeys = {
  all: ["cart"] as const,
  lists: () => [...cartQueryKeys.all, "list"] as const,
  count: () => [...cartQueryKeys.all, "count"] as const,
};

export function useCart() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();

  const { data: cart = [] } = useQuery({
    queryKey: cartQueryKeys.lists(),
    queryFn: async () => {
      const response = await getCartItemsFn();
      return response.data;
    },
    staleTime: 0,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (product: Omit<CartItem, "quantity">) => {
      const productResponse = await getProductByIdFn(product.id);
      const productData = productResponse.data;

      if (productData.available <= 0) {
        throw new Error("Produto esgotado");
      }

      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        await updateCartItemQuantityFn(
          existingItem.id,
          existingItem.quantity + 1
        );
      } else {
        await addToCartFn({ ...product, quantity: 1 });
      }

      await updateProductAvailabilityFn(product.id, productData.available - 1);
      return product;
    },
    onSuccess: (product) => {
      toastSuccess(`${product.name} adicionado ao carrinho!`);
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      if (error.message === "Produto esgotado") {
        toastError("Produto esgotado!");
      } else {
        toastError("Erro ao adicionar ao carrinho");
      }
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async ({
      id,
      returnStock,
    }: {
      id: string;
      returnStock: boolean;
    }) => {
      if (returnStock) {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
          const productResponse = await getProductByIdFn(id);
          const productData = productResponse.data;
          await updateProductAvailabilityFn(
            id,
            productData.available + cartItem.quantity
          );
        }
      }
      await removeFromCartFn(id);
    },
    onSuccess: () => {
      toastSuccess("Item removido do carrinho");
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toastError("Erro ao remover item");
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (quantity === 0) {
        await removeFromCartFn(id);
        return;
      }

      const cartItem = cart.find((item) => item.id === id);
      if (!cartItem) return;

      const productResponse = await getProductByIdFn(id);
      const productData = productResponse.data;
      const stockDifference = quantity - cartItem.quantity;

      if (productData.available - stockDifference < 0) {
        throw new Error("Estoque insuficiente");
      }

      await updateCartItemQuantityFn(id, quantity);
      await updateProductAvailabilityFn(
        id,
        productData.available - stockDifference
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      if (error.message === "Estoque insuficiente") {
        toastError("Estoque insuficiente");
      } else {
        toastError("Erro ao atualizar quantidade");
      }
    },
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    isAdding: addToCartMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    total,
    totalItems,
  };
}

export function useCartCount() {
  const { data: cartCount = 0 } = useQuery({
    queryKey: cartQueryKeys.count(),
    queryFn: async () => {
      const response = await getCartItemsFn();
      return response.data;
    },
    select: (data) => data.reduce((sum, item) => sum + item.quantity, 0),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return cartCount;
}

export function useCartItemsCount() {
  const { data: cartItemsCount = 0 } = useQuery({
    queryKey: [...cartQueryKeys.count(), "items"],
    queryFn: async () => {
      const response = await getCartItemsFn();
      return response.data;
    },
    select: (data) => data.length,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return cartItemsCount;
}
