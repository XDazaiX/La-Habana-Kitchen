import ropaViejaImg from "@assets/generated_images/ropa_vieja_cuban_dish.png";
import arrozConPolloImg from "@assets/generated_images/arroz_con_pollo_dish.png";
import lechonAsadoImg from "@assets/generated_images/lechon_asado_pork.png";
import picadilloImg from "@assets/generated_images/cuban_picadillo_dish.png";
import frijolesNegrosImg from "@assets/generated_images/cuban_black_beans.png";
import tostonesImg from "@assets/generated_images/cuban_tostones_plantains.png";
import yucaConMojoImg from "@assets/generated_images/yuca_con_mojo.png";
import flanImg from "@assets/generated_images/cuban_flan_dessert.png";
import tresLechesImg from "@assets/generated_images/tres_leches_cake.png";
import mojitoImg from "@assets/generated_images/cuban_mojito_drink.png";

import type { Product } from "@/components/ProductCard";

// todo: remove mock functionality - replace with API data
export const products: Product[] = [
  // Platos Principales
  {
    id: "ropa-vieja",
    name: "Ropa Vieja",
    description: "Carne de res deshebrada cocinada lentamente en salsa de tomate con pimientos y cebollas. El plato nacional de Cuba.",
    price: 4500,
    image: ropaViejaImg,
    category: "principales",
  },
  {
    id: "arroz-con-pollo",
    name: "Arroz con Pollo",
    description: "Arroz amarillo aromático con pollo tierno, pimientos rojos y guisantes verdes. Un clásico familiar.",
    price: 3900,
    image: arrozConPolloImg,
    category: "principales",
  },
  {
    id: "lechon-asado",
    name: "Lechón Asado",
    description: "Cerdo asado marinado en mojo criollo con ajo y cítricos. Piel crujiente y carne jugosa.",
    price: 5100,
    image: lechonAsadoImg,
    category: "principales",
  },
  {
    id: "picadillo",
    name: "Picadillo Cubano",
    description: "Carne molida sazonada con aceitunas, alcaparras y pasas en salsa de tomate. Servido con arroz blanco.",
    price: 3600,
    image: picadilloImg,
    category: "principales",
  },
  // Acompañantes
  {
    id: "frijoles-negros",
    name: "Frijoles Negros",
    description: "Frijoles negros cremosos cocinados con comino, orégano y un toque de vinagre. Receta de la abuela.",
    price: 1500,
    image: frijolesNegrosImg,
    category: "acompanantes",
  },
  {
    id: "tostones",
    name: "Tostones",
    description: "Plátanos verdes fritos dos veces, crujientes por fuera y suaves por dentro. Con salsa de mojo.",
    price: 1800,
    image: tostonesImg,
    category: "acompanantes",
  },
  {
    id: "yuca-con-mojo",
    name: "Yuca con Mojo",
    description: "Yuca hervida bañada en salsa mojo de ajo y limón con cebolla caramelizada.",
    price: 2100,
    image: yucaConMojoImg,
    category: "acompanantes",
  },
  // Postres
  {
    id: "flan-cubano",
    name: "Flan Cubano",
    description: "Flan de vainilla cremoso con caramelo dorado. Postre tradicional cubano.",
    price: 1800,
    image: flanImg,
    category: "postres",
  },
  {
    id: "tres-leches",
    name: "Tres Leches",
    description: "Bizcocho esponjoso empapado en tres tipos de leche, cubierto con crema batida y canela.",
    price: 2100,
    image: tresLechesImg,
    category: "postres",
  },
  // Bebidas
  {
    id: "mojito",
    name: "Mojito Cubano",
    description: "Refrescante cóctel con ron, menta fresca, lima, azúcar y agua con gas. El trago más famoso de Cuba.",
    price: 2700,
    image: mojitoImg,
    category: "bebidas",
  },
];

export const categoryLabels: Record<string, string> = {
  principales: "Platos Principales",
  acompanantes: "Acompañantes",
  postres: "Postres",
  bebidas: "Bebidas",
};
