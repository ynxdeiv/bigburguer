"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/atomic";

export function TestCredentials() {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPassword, setCopiedPassword] = React.useState(false);

  const email = "colmeia@email.com";
  const password = "123456";

  const copyToClipboard = async (text: string, type: "email" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }
    } catch (error) {
      console.error("Erro ao copiar:", error);
    }
  };

  return (
    <div className="mt-4 p-4 bg-muted rounded-lg">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Credenciais de Teste:
      </h3>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <strong>E-mail:</strong> {email}
          </div>
          <Button
            variant="transparent"
            size="sm"
            onClick={() => copyToClipboard(email, "email")}
            className="h-6 w-6 p-0"
          >
            {copiedEmail ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <strong>Senha:</strong> {password}
          </div>
          <Button
            variant="transparent"
            size="sm"
            onClick={() => copyToClipboard(password, "password")}
            className="h-6 w-6 p-0"
          >
            {copiedPassword ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
