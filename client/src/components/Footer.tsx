import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif font-bold text-xl text-primary mb-4">
              La Habana Kitchen
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Desde 1995, compartimos el auténtico sabor de Cuba con recetas transmitidas 
              de generación en generación. Cada plato es preparado con amor y los mejores ingredientes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span data-testid="text-phone">+53 56649997</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+53 59609237</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+53 56382361</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span data-testid="text-hours">Lun - Dom: 11:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Zona de Entrega</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Entregamos a cualquier parte de La Habana.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            © {new Date().getFullYear()} La Habana Kitchen. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
