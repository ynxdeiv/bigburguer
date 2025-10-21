import { ContactFormData } from "@/types";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const getContactsFn = async (): Promise<
  ApiResponse<ContactFormData[]>
> => {
  const response = await fetch("http://localhost:3001/contacts");
  if (!response.ok) throw new Error("Erro ao buscar contatos");
  const data = await response.json();
  return { data, status: 200, message: "Contatos carregados" };
};

export const createContactFn = async (
  contact: ContactFormData
): Promise<ApiResponse<ContactFormData>> => {
  const contactWithId = {
    id: Math.random().toString(36).substr(2, 4),
    ...contact,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch("http://localhost:3001/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactWithId),
  });
  if (!response.ok) throw new Error("Erro ao criar contato");
  const data = await response.json();
  return { data, status: 201, message: "Contato criado" };
};
