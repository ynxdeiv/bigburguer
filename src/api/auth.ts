import { User, LoginFormData } from "@/types";
import { API_ENDPOINTS, API_BASE_URL } from "@/lib/apiConfig";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  message: string;
}

class TokenService {
  private static readonly TOKEN_KEY = "bigburger_auth_token";
  private static readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

  static generateToken(userId: string): string {
    const payload = {
      userId,
      iat: Date.now(),
      exp: Date.now() + this.TOKEN_EXPIRY,
    };

    return btoa(JSON.stringify(payload));
  }

  static validateToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  static getTokenPayload(token: string): any {
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  }

  static saveToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  static getStoredToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  static removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}

export const getUsersFn = async (): Promise<ApiResponse<User[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const data = await response.json();

    return {
      data,
      status: 200,
      message: "Usuários carregados com sucesso",
    };
  } catch (error) {
    throw new Error("Erro ao buscar usuários");
  }
};

export const loginFn = async (
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const usersResponse = await getUsersFn();
    const users = usersResponse.data;

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      throw {
        data: {} as LoginResponse,
        status: 401,
        message: "E-mail ou senha incorretos. Tente novamente.",
      };
    }

    const token = TokenService.generateToken(user.id);

    TokenService.saveToken(token);

    return {
      data: {
        user,
        token,
        message: `Bem-vindo, ${user.name}!`,
      },
      status: 200,
      message: "Login realizado com sucesso",
    };
  } catch (error: any) {
    throw new Error("Erro ao fazer login");
  }
};

export const registerFn = async (
  userData: Omit<User, "id"> & { password: string }
): Promise<ApiResponse<RegisterResponse>> => {
  try {
    const usersResponse = await getUsersFn();
    const users = usersResponse.data;

    const existingUser = users.find((u) => u.email === userData.email);

    if (existingUser) {
      throw {
        data: {} as RegisterResponse,
        status: 409,
        message: "E-mail já cadastrado. Use outro e-mail ou faça login.",
      };
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    };

    const token = TokenService.generateToken(newUser.id);

    TokenService.saveToken(token);

    return {
      data: {
        user: newUser,
        token,
        message: `Conta criada com sucesso! Bem-vindo, ${newUser.name}!`,
      },
      status: 201,
      message: "Registro realizado com sucesso",
    };
  } catch (error: any) {
    throw new Error("Erro ao registrar usuário");
  }
};

export const logoutFn = async (): Promise<ApiResponse<{ message: string }>> => {
  try {
    TokenService.removeToken();
    return {
      data: { message: "Logout realizado com sucesso!" },
      status: 200,
      message: "Logout realizado com sucesso",
    };
  } catch (error) {
    throw new Error("Erro ao fazer logout");
  }
};

export const validateTokenFn = async (): Promise<ApiResponse<User | null>> => {
  try {
    const token = TokenService.getStoredToken();

    if (!token || !TokenService.validateToken(token)) {
      return {
        data: null,
        status: 401,
        message: "Token inválido ou expirado",
      };
    }

    const payload = TokenService.getTokenPayload(token);
    if (!payload) {
      return {
        data: null,
        status: 401,
        message: "Token inválido",
      };
    }

    const usersResponse = await getUsersFn();
    const users = usersResponse.data;
    const user = users.find((u) => u.id === payload.userId);

    if (!user) {
      return {
        data: null,
        status: 404,
        message: "Usuário não encontrado",
      };
    }

    return {
      data: user,
      status: 200,
      message: "Token válido",
    };
  } catch (error) {
    throw new Error("Erro na validação do token");
  }
};
