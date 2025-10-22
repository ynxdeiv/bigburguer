import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../atoms/Button";
import { FormField } from "../../molecules/FormField";
import { ContactFormType } from "@/types";
import { contactSchema } from "@/schemas/contact";

export interface ContactFormProps {
  onSubmit: (data: ContactFormType) => Promise<void>;
  isLoading?: boolean;
}

export function ContactForm({ onSubmit, isLoading = false }: ContactFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const watchedValues = watch();

  const handleFormSubmit = async (data: ContactFormType) => {
    try {
      setServerError(null);
      await onSubmit(data);
      reset();
    } catch (error) {
      setServerError("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full space-y-6"
    >
      {serverError && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          value={watchedValues.name || ""}
          onChange={(value) => setValue("name", value)}
          error={errors.name?.message}
          required
          name={""}
        />

        <FormField
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={watchedValues.email || ""}
          onChange={(value) => setValue("email", value)}
          error={errors.email?.message}
          required
          name={""}
        />
      </div>

      <FormField
        label="Mensagem"
        type="textarea"
        placeholder="Digite sua mensagem aqui..."
        rows={6}
        value={watchedValues.message || ""}
        onChange={(value) => setValue("message", value)}
        error={errors.message?.message}
        required
        name={""}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
        size="default"
      >
        {isLoading ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  );
}
