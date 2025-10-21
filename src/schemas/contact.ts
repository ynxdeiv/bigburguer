import z from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),

  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),

  message: z
    .string()
    .min(1, "A mensagem é obrigatória")
    .min(10, "A mensagem deve ter pelo menos 10 caracteres")
    .max(500, "A mensagem deve ter no máximo 500 caracteres"),
});

export type ContactFormType = z.infer<typeof contactSchema>;
