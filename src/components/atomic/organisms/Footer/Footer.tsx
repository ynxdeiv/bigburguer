
"use client";

import { Hamburger, MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

export interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer
      className={`bg-muted/50 border-t border-border py-8 md:py-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-orange rounded-full">
                <Hamburger className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display">
                BIG B<span className="text-brand-orange">U</span>RGUER
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Os melhores hambúrgueres artesanais da cidade, feitos com
              ingredientes frescos e muito sabor.
            </p>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span className="text-muted-foreground text-sm">
                  Rua das Flores, 123
                  <br />
                  Centro, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span className="text-muted-foreground text-sm">
                  (11) 99999-9999
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-orange" />
                <span className="text-muted-foreground text-sm">
                  contato@bigburguer.com
                </span>
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">
              Horário de Funcionamento
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-orange" />
                <div className="text-muted-foreground text-sm">
                  <div>Seg - Qui: 18h às 23h</div>
                  <div>Sex - Sáb: 18h às 00h</div>
                  <div>Dom: 18h às 22h</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de separação e copyright */}
        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              &copy; 2024 Big Burguer. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-brand-orange transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-brand-orange transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
