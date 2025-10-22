import { Button } from "../../atoms/Button";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  onOrderClick?: () => void;
  onMenuClick?: () => void;
  showButtons?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  onOrderClick,
  onMenuClick,
  showButtons = true,
}: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleOrderClick = () => {
    if (onOrderClick) {
      onOrderClick();
    } else {
      scrollToSection("cardapio");
    }
  };

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      scrollToSection("cardapio");
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center bg-background dark:bg-background pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left relative z-10">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground dark:text-white leading-tight animate-fade-in-up">
                {title}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold text-brand-orange dark:text-orange-400 animate-fade-in-up animation-delay-200">
                {subtitle}
              </h2>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-400">
              {description}
            </p>
          </div>

          <div className="relative z-10 order-first lg:order-last">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-xl mx-auto rounded-2xl animate-fade-in-right hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {showButtons && (
          <div className="flex flex-row gap-3 justify-center mt-6 lg:hidden animate-fade-in-up animation-delay-600">
            <Button
              size="sm"
              onClick={handleOrderClick}
              className="flex-1 max-w-[140px] hover:scale-105 transition-transform duration-300"
            >
              Peça Agora
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMenuClick}
              className="flex-1 max-w-[140px] hover:scale-105 transition-transform duration-300"
            >
              Ver Cardápio
            </Button>
          </div>
        )}

        {showButtons && (
          <div className="hidden lg:block space-y-8 text-center lg:text-left relative z-10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                onClick={handleOrderClick}
                className="min-w-[160px] hover:scale-105 transition-transform duration-300"
              >
                Peça Agora
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleMenuClick}
                className="min-w-[160px] hover:scale-105 transition-transform duration-300"
              >
                Ver Cardápio
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
