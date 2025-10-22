import QRCode from "qrcode";

export interface PixData {
  pixCode: string;
  qrCodeDataUrl: string;
  amount: number;
  merchantName: string;
  transactionId: string;
}

export function generatePixCode(
  amount: number,
  merchantName: string = "Big Burguer"
): string {
  const transactionId = `PIX${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const pixCode = `00020126580014br.gov.bcb.pix0136${transactionId}520400005303986540${amount.toFixed(2)}5802BR5913${merchantName}6009Sao Paulo62070503***6304`;

  return pixCode;
}

export async function generatePixQRCode(pixCode: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(pixCode, {
      width: 200,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    });

    return qrCodeDataUrl;
  } catch (error) {
    console.error("Erro ao gerar QR code:", error);
    throw new Error("Falha ao gerar QR code");
  }
}

export async function generatePixPayment(
  amount: number,
  merchantName?: string
): Promise<PixData> {
  const pixCode = generatePixCode(amount, merchantName);
  const qrCodeDataUrl = await generatePixQRCode(pixCode);
  const transactionId = `PIX${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return {
    pixCode,
    qrCodeDataUrl,
    amount,
    merchantName: merchantName || "Big Burguer",
    transactionId,
  };
}
