import ProductCard from "../ProductCard";
import ropaViejaImg from "@assets/generated_images/ropa_vieja_cuban_dish.png";

export default function ProductCardExample() {
  return (
    <div className="max-w-sm">
      <ProductCard
        product={{
          id: "1",
          name: "Ropa Vieja",
          description: "Carne de res deshebrada en salsa de tomate con pimientos y cebollas",
          price: 14.99,
          image: ropaViejaImg,
          category: "principales",
        }}
        quantity={2}
        onAdd={() => console.log("Added")}
        onRemove={() => console.log("Removed")}
      />
    </div>
  );
}
