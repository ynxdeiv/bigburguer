import { User, LoginFormData } from "@/types";

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

class CookieService {
  static readonly TOKEN_KEY = "bigburger_auth_token";
  static readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

  static setCookie(name: string, value: string, days: number = 1): void {
    if (typeof document === "undefined") return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * this.TOKEN_EXPIRY);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  static getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  static deleteCookie(name: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

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
}

export const getUsersFn = async (): Promise<ApiResponse<User[]>> => {
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  const data = await response.json();
  return { data, status: 200, message: "Usuários carregados" };
};

export const loginFn = async (
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> => {
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

  const token = CookieService.generateToken(user.id);

  CookieService.setCookie(CookieService.TOKEN_KEY, token);

  return {
    data: {
      user,
      token,
      message: `Bem-vindo, ${user.name}!`,
    },
    status: 200,
    message: "Login realizado",
  };
};

export const registerFn = async (
  userData: Omit<User, "id"> & { password: string }
): Promise<ApiResponse<RegisterResponse>> => {
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

  const token = CookieService.generateToken(newUser.id);
  CookieService.setCookie(CookieService.TOKEN_KEY, token);

  return {
    data: {
      user: newUser,
      token,
      message: `Conta criada com sucesso! Bem-vindo, ${newUser.name}!`,
    },
    status: 201,
    message: "Registro realizado",
  };
};

export const logoutFn = async (): Promise<ApiResponse<{ message: string }>> => {
  CookieService.deleteCookie(CookieService.TOKEN_KEY);
  return {
    data: { message: "Logout realizado com sucesso!" },
    status: 200,
    message: "Logout realizado",
  };
};

export const validateTokenFn = async (): Promise<ApiResponse<User | null>> => {
  const token = CookieService.getCookie(CookieService.TOKEN_KEY);

  if (!token || !CookieService.validateToken(token)) {
    return {
      data: null,
      status: 401,
      message: "Token inválido",
    };
  }

  const payload = CookieService.getTokenPayload(token);
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
};
