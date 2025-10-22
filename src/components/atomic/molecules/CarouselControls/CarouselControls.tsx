
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../atoms/Button";

export interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
  className?: string;
}

export function CarouselControls({
  onPrevious,
  onNext,
  disabled = false,
  className = "",
}: CarouselControlsProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={disabled}
        className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full transition-colors shadow-lg hover:shadow-xl"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={disabled}
        className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full transition-colors shadow-lg hover:shadow-xl"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
