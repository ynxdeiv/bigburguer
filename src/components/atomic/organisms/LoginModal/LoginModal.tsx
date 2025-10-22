import { X } from "lucide-react";
import { Button } from "../../atoms/Button";
import { LoginForm } from "../../atoms/LoginForm";
import { TestCredentials } from "../../atoms/TestCredentials";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isLoading = false,
  error,
}: LoginModalProps) {
  if (!isOpen) return null;

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      await onLogin(credentials);
      onClose();
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background rounded-lg shadow-xl p-6 mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Entrar</h2>
          <Button
            variant="transparent"
            size="icon"
            onClick={onClose}
            aria-label="Fechar modal de login"
            className="flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

        <TestCredentials />

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <button
              onClick={() => {
                ("Abrir modal de cadastro");
              }}
              className="text-primary hover:underline"
            >
              Cadastre-se aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
