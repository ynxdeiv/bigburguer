
import { ReactNode } from "react";

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function PageLayout({
  children,
  className = "",
  showHeader = true,
  showFooter = true
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showHeader && (
        <header className="w-full bg-background/95 backdrop-blur-md py-3 border-b border-border shadow-sm fixed top-0 left-0 right-0 z-50">
          {/* Header será implementado separadamente */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">
                BIG BURGUER
              </div>
              {/* Menu será implementado separadamente */}
            </div>
          </div>
        </header>
      )}

      <main className={`flex-1 ${showHeader ? 'pt-20' : ''}`}>
        {children}
      </main>

      {showFooter && (
        <footer className="bg-muted/50 border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-muted-foreground">
              <p>&copy; 2024 Big Burguer. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
