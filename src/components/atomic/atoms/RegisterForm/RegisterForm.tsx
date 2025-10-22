
import { useState } from "react";
import { Button } from "../Button";
import { FormField } from "../../molecules/FormField";

export interface RegisterFormProps {
  onSubmit: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export function RegisterForm({
  onSubmit,
  isLoading = false,
  error,
  className = "",
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
  }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));


    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: typeof validationErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!formData.email) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    if (!formData.password) {
      errors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      errors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Senhas não coincidem";
    }

    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      errors.phone = "Telefone deve estar no formato (11) 99999-9999";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
      });
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <FormField
        label="Nome completo"
        name="name"
        type="text"
        placeholder="Seu nome completo"
        value={formData.name}
        onChange={(value) => handleInputChange("name", value)}
        error={validationErrors.name}
        required
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="seu@email.com"
        value={formData.email}
        onChange={(value) => handleInputChange("email", value)}
        error={validationErrors.email}
        required
      />

      <FormField
        label="Telefone"
        name="phone"
        type="tel"
        placeholder="(11) 99999-9999"
        value={formData.phone}
        onChange={(value) => handleInputChange("phone", value)}
        error={validationErrors.phone}
      />

      <FormField
        label="Senha"
        name="password"
        type="password"
        placeholder="Mínimo 6 caracteres"
        value={formData.password}
        onChange={(value) => handleInputChange("password", value)}
        error={validationErrors.password}
        required
      />

      <FormField
        label="Confirmar senha"
        name="confirmPassword"
        type="password"
        placeholder="Digite a senha novamente"
        value={formData.confirmPassword}
        onChange={(value) => handleInputChange("confirmPassword", value)}
        error={validationErrors.confirmPassword}
        required
      />

      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
