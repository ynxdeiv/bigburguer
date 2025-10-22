import { ContactFormData } from "@/types";
import { API_ENDPOINTS } from "@/lib/apiConfig";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const getContactsFn = async (): Promise<
  ApiResponse<ContactFormData[]>
> => {
  try {
    const response = await fetch(API_ENDPOINTS.CONTACTS);
    if (!response.ok) {
      throw new Error("Erro ao buscar contatos");
    }
    const data = await response.json();

    return {
      data,
      status: 200,
      message: "Contatos carregados com sucesso",
    };
  } catch (error) {
    throw {
      data: [],
      status: 500,
      message: "Erro interno do servidor",
    };
  }
};

export const createContactFn = async (
  contact: ContactFormData
): Promise<ApiResponse<ContactFormData>> => {
  try {
    const contactWithId = {
      id: Math.random().toString(36).substr(2, 4),
      ...contact,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(API_ENDPOINTS.CONTACTS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactWithId),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar contato");
    }
    const data = await response.json();

    return {
      data,
      status: 201,
      message: "Contato criado com sucesso",
    };
  } catch (error) {
    throw {
      data: {} as ContactFormData,
      status: 500,
      message: "Erro ao criar contato",
    };
  }
};
