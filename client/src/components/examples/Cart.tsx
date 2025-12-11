import Cart from "../Cart";
import ropaViejaImg from "@assets/generated_images/ropa_vieja_cuban_dish.png";
import arrozImg from "@assets/generated_images/arroz_con_pollo_dish.png";

export default function CartExample() {
  return (
    <Cart
      isOpen={true}
      onClose={() => console.log("Close cart")}
      items={[
        {
          product: {
            id: "1",
            name: "Ropa Vieja",
            description: "Carne deshebrada",
            price: 14.99,
            image: ropaViejaImg,
            category: "principales",
          },
          quantity: 2,
        },
        {
          product: {
            id: "2",
            name: "Arroz con Pollo",
            description: "Arroz amarillo",
            price: 12.99,
            image: arrozImg,
            category: "principales",
          },
          quantity: 1,
        },
      ]}
      onUpdateQuantity={(id, delta) => console.log("Update:", id, delta)}
      onCheckout={() => console.log("Checkout")}
    />
  );
}
