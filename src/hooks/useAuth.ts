"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { User, LoginFormData } from "@/types";
import {
  loginFn,
  registerFn,
  logoutFn,
  validateTokenFn,
  LoginResponse,
  RegisterResponse,
} from "@/services";

export const authQueryKeys = {
  all: ["auth"] as const,
  user: () => [...authQueryKeys.all, "user"] as const,
  token: () => [...authQueryKeys.all, "token"] as const,
};

export function useAuth() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();

  const { data: user = null, isLoading: isValidatingToken } = useQuery({
    queryKey: authQueryKeys.user(),
    queryFn: async () => {
      const response = await validateTokenFn();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      const response = await loginFn(email, password);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      toastSuccess(data.message);
      queryClient.setQueryData(authQueryKeys.user(), data.user);
    },
    onError: (error: any) => {
      const message = error.message || "Erro ao fazer login";
      toastError(message);
    },
    onSettled: () => {
      loginMutation.reset();
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: Omit<User, "id"> & { password: string }) => {
      const response = await registerFn(userData);
      return response.data;
    },
    onSuccess: (data: RegisterResponse) => {
      toastSuccess(data.message);
      queryClient.setQueryData(authQueryKeys.user(), data.user);
    },
    onError: (error: any) => {
      const message = error.message || "Erro ao criar conta";
      toastError(message);
    },
    onSettled: () => {
      registerMutation.reset();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await logoutFn();
      return response.data;
    },
    onSuccess: (data) => {
      toastSuccess(data.message);
      queryClient.setQueryData(authQueryKeys.user(), null);
    },
    onError: () => {
      toastError("Erro ao fazer logout");
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isValidatingToken,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    clearLoginError: () => loginMutation.reset(),
    clearRegisterError: () => registerMutation.reset(),
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      const response = await loginFn(email, password);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      toastSuccess(data.message);
      queryClient.setQueryData(authQueryKeys.user(), data.user);
    },
    onError: (error: any) => {
      const message = error.message || "Erro ao fazer login";
      toastError(message);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (userData: Omit<User, "id"> & { password: string }) => {
      const response = await registerFn(userData);
      return response.data;
    },
    onSuccess: (data: RegisterResponse) => {
      toastSuccess(data.message);
      queryClient.setQueryData(authQueryKeys.user(), data.user);
    },
    onError: (error: any) => {
      const message = error.message || "Erro ao criar conta";
      toastError(message);
    },
  });
}

export function useAuthStatus() {
  const { data: user, isLoading } = useQuery({
    queryKey: authQueryKeys.user(),
    queryFn: async () => {
      const response = await validateTokenFn();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    isAuthenticated: !!user,
    user,
    isLoading,
  };
}
