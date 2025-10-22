import { useState, useEffect } from "react";
import { CreditCard, QrCode, Barcode, Copy } from "lucide-react";
import { Button } from "../../atoms/Button";
import { FormField } from "../../molecules/FormField";
import { PaymentMethodType } from "../../molecules/PaymentMethodSelector";
import { z } from "zod";
import { generatePixPayment, PixData } from "@/lib/pixGenerator";

const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Número do cartão é obrigatório")
    .refine((val) => val.replace(/\s/g, "").length >= 16, {
      message: "Número do cartão deve ter pelo menos 16 dígitos",
    })
    .refine((val) => /^\d[\d\s]*$/.test(val), {
      message: "Número do cartão deve conter apenas dígitos",
    }),
  cardName: z
    .string()
    .min(1, "Nome no cartão é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .refine((val) => /^[A-Za-z\s]+$/.test(val), {
      message: "Nome deve conter apenas letras",
    }),
  expiry: z
    .string()
    .min(1, "Data de validade é obrigatória")
    .refine((val) => /^\d{2}\/\d{2}$/.test(val), {
      message: "Data deve estar no formato MM/AA",
    })
    .refine(
      (val) => {
        const [month, year] = val.split("/");
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (monthNum < 1 || monthNum > 12) return false;
        if (yearNum < currentYear) return false;
        if (yearNum === currentYear && monthNum < currentMonth) return false;

        return true;
      },
      {
        message: "Data de validade inválida ou expirada",
      }
    ),
  cvv: z
    .string()
    .min(1, "CVV é obrigatório")
    .refine((val) => /^\d{3,4}$/.test(val), {
      message: "CVV deve ter 3 ou 4 dígitos",
    }),
  installments: z.string().min(1, "Número de parcelas é obrigatório"),
});

export interface PaymentFormProps {
  method: PaymentMethodType;
  amount: number;
  onSuccess: () => void;
  onFailure: () => void;
  onStatusChange: (status: "processing" | "paid" | "failed") => void;
  className?: string;
}

export function PaymentForm({
  method,
  amount,
  onSuccess,
  onFailure,
  onStatusChange,
  className = "",
}: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    installments: "1",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);

  const boletoCode = "34191.79001 01043.510047 91020.150008 5 84460000026000";

  useEffect(() => {
    if (method === "pix" && !pixData && typeof window !== "undefined") {
      generatePixData();
    }
  }, [method]);

  const generatePixData = async () => {
    setIsGeneratingPix(true);
    try {
      const discountedAmount = amount * 0.95;
      const newPixData = await generatePixPayment(
        discountedAmount,
        "Big Burguer"
      );
      setPixData(newPixData);
    } catch (error) {
      console.error("Erro ao gerar dados PIX:", error);
    } finally {
      setIsGeneratingPix(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpar erros anteriores
    setValidationErrors({});

    try {
      // Validar dados com Zod
      const validatedData = creditCardSchema.parse(formData);

      setIsProcessing(true);
      onStatusChange("processing");

      setTimeout(() => {
        setIsProcessing(false);
        const isSuccess = Math.random() > 0.2;

        if (isSuccess) {
          onSuccess();
        } else {
          onFailure();
        }
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regeneratePixCode = () => {
    setPixData(null);
    generatePixData();
  };

  const handlePixPayment = () => {
    setIsProcessing(true);
    onStatusChange("processing");
    setTimeout(() => onSuccess(), 2000);
  };

  const handleBoletoPayment = () => {
    setIsProcessing(true);
    onStatusChange("processing");
    setTimeout(() => onSuccess(), 2000);
  };

  if (method === "credit") {
    const validationResult = creditCardSchema.safeParse(formData);
    const isFormValid = validationResult.success;

    return (
      <div
        className={`bg-card rounded-lg border border-border p-6 ${className}`}
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Pagamento com Cartão de Crédito
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Número do Cartão"
            name="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(value: string) => handleInputChange("cardNumber", value)}
            required
            error={validationErrors.cardNumber}
          />

          <FormField
            label="Nome no Cartão"
            name="cardName"
            type="text"
            placeholder="JOÃO M SILVA"
            value={formData.cardName}
            onChange={(value: string) => handleInputChange("cardName", value)}
            required
            error={validationErrors.cardName}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Validade"
              name="expiry"
              type="text"
              placeholder="MM/AA"
              value={formData.expiry}
              onChange={(value: string) => handleInputChange("expiry", value)}
              required
              error={validationErrors.expiry}
            />

            <FormField
              label="CVV"
              name="cvv"
              type="text"
              placeholder="123"
              value={formData.cvv}
              onChange={(value: string) => handleInputChange("cvv", value)}
              required
              error={validationErrors.cvv}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Parcelas</label>
            <select
              name="installments"
              value={formData.installments}
              onChange={(e) =>
                handleInputChange("installments", e.target.value)
              }
              className="w-full p-3 border border-border rounded-lg bg-background"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <option key={num} value={num}>
                  {num}x de R$ {(amount / num).toFixed(2)}{" "}
                  {num > 1 ? "(sem juros)" : ""}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            disabled={isProcessing || !isFormValid}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Processando..." : `Pagar R$ ${amount.toFixed(2)}`}
          </Button>
        </form>
      </div>
    );
  }

  if (method === "pix") {
    const discountedAmount = amount * 0.95;

    // Renderizar apenas no cliente para evitar problemas de hidratação
    if (typeof window === "undefined") {
      return (
        <div
          className={`bg-card rounded-lg border border-border p-6 ${className}`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Pagamento com PIX
          </h2>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto"></div>
            <p className="text-muted-foreground mt-4">Carregando...</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`bg-card rounded-lg border border-border p-6 ${className}`}
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Pagamento com PIX
        </h2>

        <div className="text-center">
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
            <p className="text-green-800 font-semibold">
              Desconto de 5% aplicado!
            </p>
            <p className="text-green-800">
              De: <span className="line-through">R$ {amount.toFixed(2)}</span> →
              Por:{" "}
              <span className="font-bold">
                R$ {discountedAmount.toFixed(2)}
              </span>
            </p>
          </div>

          {isGeneratingPix ? (
            <div className="bg-background dark:bg-card p-6 rounded-lg border-2 border-dashed border-border mb-4 inline-block">
              <div className="w-48 h-48 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Gerando QR Code...
              </p>
            </div>
          ) : pixData ? (
            <>
              <div className="bg-background dark:bg-card p-6 rounded-lg border-2 border-dashed border-border mb-4 inline-block">
                <img
                  src={pixData.qrCodeDataUrl}
                  alt="QR Code PIX"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">
                    Código PIX (copie e cole):
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={regeneratePixCode}
                    className="text-xs"
                  >
                    Gerar Novo
                  </Button>
                </div>
                <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                  <code className="flex-1 text-sm font-mono break-all">
                    {pixData.pixCode}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(pixData.pixCode)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-4 text-sm text-muted-foreground">
                <p>
                  ID da Transação:{" "}
                  <span className="font-mono">{pixData.transactionId}</span>
                </p>
                <p>
                  Valor:{" "}
                  <span className="font-bold">
                    R$ {pixData.amount.toFixed(2)}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div className="bg-background dark:bg-card p-6 rounded-lg border-2 border-dashed border-border mb-4 inline-block">
              <div className="w-48 h-48 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Erro ao gerar QR Code
              </p>
            </div>
          )}

          <Button
            onClick={handlePixPayment}
            disabled={isProcessing || !pixData || isGeneratingPix}
            className="w-full"
            size="lg"
          >
            {isProcessing
              ? "Processando..."
              : `Confirmar Pagamento PIX - R$ ${discountedAmount.toFixed(2)}`}
          </Button>
        </div>
      </div>
    );
  }

  if (method === "boleto") {
    return (
      <div
        className={`bg-card rounded-lg border border-border p-6 ${className}`}
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Barcode className="w-5 h-5" />
          Pagamento com Boleto
        </h2>

        <div className="text-center">
          <div className="bg-background dark:bg-card p-6 rounded-lg border-2 border-border mb-4">
            <div className="text-left space-y-2 font-mono text-sm text-foreground">
              <div className="flex justify-between">
                <span>Banco:</span>
                <span>341 - Itaú</span>
              </div>
              <div className="flex justify-between">
                <span>Vencimento:</span>
                <span>
                  {new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Valor:</span>
                <span className="font-bold">R$ {amount.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2">
                <p className="text-center font-semibold mb-2">
                  Código de Barras:
                </p>
                <div className="flex items-center gap-2 bg-muted p-3 rounded-lg border border-border">
                  <code className="flex-1 text-sm font-mono">{boletoCode}</code>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(boletoCode)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleBoletoPayment}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing
              ? "Processando..."
              : `Confirmar Boleto - R$ ${amount.toFixed(2)}`}
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            O boleto será processado em até 1 dia útil após o pagamento.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
