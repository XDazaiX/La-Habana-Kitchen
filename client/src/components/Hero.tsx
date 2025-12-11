import { Button } from "@/components/ui/button";
import heroImg from "@assets/generated_images/ropa_vieja_cuban_dish.png";

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  return (
    <section className="relative h-[28rem] md:h-[32rem] overflow-hidden">
      <img
        src={heroImg}
        alt="Auténtica comida cubana"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight">
          Auténtica Comida Cubana a Domicilio
        </h2>
        <p className="text-white/90 text-lg md:text-xl mt-4 max-w-xl">
          Disfruta del sabor tradicional de Cuba en la comodidad de tu hogar. Platos preparados con recetas familiares.
        </p>
        <Button 
          size="lg" 
          className="mt-6 w-fit"
          onClick={onOrderClick}
          data-testid="button-order-now"
        >
          Ordenar Ahora
        </Button>
      </div>
    </section>
  );
}
