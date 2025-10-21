export type PaymentMethodType = "pix" | "credit" | "boleto";
export type PaymentStatus =
  | "initial"
  | "processing"
  | "paid"
  | "failed"
  | "expired";
