
import { useState } from "react";
import { Button } from "../Button";
import { FormField } from "../../molecules/FormField";

export interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  className = "",
}: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));


    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: typeof validationErrors = {};

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

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit({ email: formData.email, password: formData.password });
    } catch (error) {
      console.error("Erro no login:", error);
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
        label="Senha"
        name="password"
        type="password"
        placeholder="Sua senha"
        value={formData.password}
        onChange={(value) => handleInputChange("password", value)}
        error={validationErrors.password}
        required
      />

      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
