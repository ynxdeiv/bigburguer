import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres"),
});

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  message: z
    .string()
    .min(10, "A mensagem deve ter no mínimo 10 caracteres")
    .max(500, "A mensagem deve ter no máximo 500 caracteres"),
});

export const paymentFormSchema = z.object({
  method: z.enum(["pix", "credit", "boleto"]),
  cardNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(val),
      "Número do cartão deve ter 16 dígitos"
    ),
  expiryDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val),
      "Data de expiração deve estar no formato MM/AA"
    ),
  cvv: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{3,4}$/.test(val),
      "CVV deve ter 3 ou 4 dígitos"
    ),
  cardName: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      "Nome no cartão deve ter no mínimo 3 caracteres"
    ),
  pixKey: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 5,
      "Chave PIX deve ter no mínimo 5 caracteres"
    ),
});

export const cartItemSchema = z.object({
  id: z.string().min(1, "ID do produto é obrigatório"),
  name: z.string().min(1, "Nome do produto é obrigatório"),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
  image: z.string().url("URL da imagem inválida"),
  quantity: z
    .number()
    .int("Quantidade deve ser um número inteiro")
    .min(1, "Quantidade deve ser pelo menos 1"),
});

export const orderSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Pedido deve ter pelo menos um item"),
  total: z.number().min(0.01, "Total deve ser maior que zero"),
  paymentMethod: z.enum(["pix", "credit", "boleto"]),
  status: z.enum(["pending", "processing", "paid", "failed", "expired"]),
  userId: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type PaymentFormInput = z.infer<typeof paymentFormSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
