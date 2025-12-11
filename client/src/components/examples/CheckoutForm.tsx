import CheckoutForm from "../CheckoutForm";
import ropaViejaImg from "@assets/generated_images/ropa_vieja_cuban_dish.png";

export default function CheckoutFormExample() {
  return (
    <CheckoutForm
      isOpen={true}
      onClose={() => console.log("Close")}
      onBack={() => console.log("Back")}
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
      ]}
      onConfirm={(details) => console.log("Order confirmed:", details)}
    />
  );
}
