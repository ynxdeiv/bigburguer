"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { ContactFormData } from "@/types";
import { getContactsFn, createContactFn } from "@/services";

export const contactQueryKeys = {
  all: ["contacts"] as const,
  lists: () => [...contactQueryKeys.all, "list"] as const,
};

export function useContacts() {
  return useQuery({
    queryKey: contactQueryKeys.lists(),
    queryFn: async () => {
      const response = await getContactsFn();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useContact() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const response = await createContactFn(formData);
      return response.data;
    },
    onSuccess: () => {
      toastSuccess("Mensagem enviada com sucesso!");
      queryClient.invalidateQueries({ queryKey: contactQueryKeys.all });
    },
    onError: (error: any) => {
      const message =
        error.message || "Erro ao enviar mensagem. Tente novamente.";
      toastError(message);
    },
  });

  return {
    submitContact: contactMutation.mutate,
    isSubmitting: contactMutation.isPending,
  };
}
