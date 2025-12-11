import ProductGrid from "../ProductGrid";
import ropaViejaImg from "@assets/generated_images/ropa_vieja_cuban_dish.png";
import arrozImg from "@assets/generated_images/arroz_con_pollo_dish.png";
import lechonImg from "@assets/generated_images/lechon_asado_pork.png";

export default function ProductGridExample() {
  return (
    <div className="p-4">
      <ProductGrid
        title="Platos Principales"
        products={[
          { id: "1", name: "Ropa Vieja", description: "Carne de res deshebrada en salsa", price: 14.99, image: ropaViejaImg, category: "principales" },
          { id: "2", name: "Arroz con Pollo", description: "Arroz amarillo con pollo", price: 12.99, image: arrozImg, category: "principales" },
          { id: "3", name: "Lechón Asado", description: "Cerdo asado con mojo", price: 16.99, image: lechonImg, category: "principales" },
        ]}
        quantities={{ "1": 2, "2": 0, "3": 1 }}
        onAdd={(id) => console.log("Add:", id)}
        onRemove={(id) => console.log("Remove:", id)}
      />
    </div>
  );
}
