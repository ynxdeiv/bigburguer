"use client";

export interface MapsProps {
  className?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  height?: number;
}

export function Maps({
  className = "",
  latitude = -23.5505,
  longitude = -46.6333,
  zoom = 15,
  height = 300,
}: MapsProps) {
  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      <iframe
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.045997466356!2d-46.633303685673004!3d-23.55052016459321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a2b2ed7f3a1%3A0xab35da2f5ca62674!2sBig%20Burguer%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1734798727571!5m2!1spt-BR!2sbr"
        className="rounded-lg shadow-lg"
        title="Big Burguer - São Paulo"
      />

      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
    </div>
  );
}
