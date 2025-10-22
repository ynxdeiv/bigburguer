
import { CreditCard, Barcode, QrCode, Check } from "lucide-react";
import { Button } from "../../atoms/Button";

export type PaymentMethodType = "pix" | "credit" | "boleto";

export interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
}

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType | null;
  onSelectMethod: (method: PaymentMethodType) => void;
  className?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "pix",
    name: "PIX",
    description: "Pagamento instantâneo",
    icon: QrCode,
    benefits: ["Pagamento instantâneo", "Desconto de 5%", "Sem taxas"],
  },
  {
    id: "credit",
    name: "Cartão de Crédito",
    description: "Parcelado em até 12x",
    icon: CreditCard,
    benefits: ["Parcelado em até 12x", "Pagamento seguro"],
  },
  {
    id: "boleto",
    name: "Boleto Bancário",
    description: "Pagamento em 1 dia útil",
    icon: Barcode,
    benefits: ["Pagamento em 1 dia útil", "Aceito em qualquer banco"],
  },
];

export function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
  className = "",
}: PaymentMethodSelectorProps) {
  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-6">Escolha a forma de pagamento</h2>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onSelectMethod(method.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{method.name}</h3>
                      <p className="text-muted-foreground">
                        {method.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex gap-2 flex-wrap">
                    {method.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
