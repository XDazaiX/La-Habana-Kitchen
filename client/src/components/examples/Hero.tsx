import Hero from "../Hero";

export default function HeroExample() {
  return <Hero onOrderClick={() => console.log("Order clicked")} />;
}
