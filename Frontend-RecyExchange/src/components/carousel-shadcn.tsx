import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Definimos el tipo de setSelectedType como una función que recibe un string
interface CarouselShadcnProps {
  setSelectedType: (type: string) => void;
}

const CarouselShadcn: React.FC<CarouselShadcnProps> = ({ setSelectedType }) => {
  const items = [
    { type: "Plastics", image: "/plastic.jpeg" },
    { type: "Cardboard", image: "/cardboard.jpeg" },
    { type: "Glasses", image: "/glass.jpeg" },
    { type: "Metals", image: "/metals.jpeg" },
  ];
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[350px] flex"> {/* Aumentar la altura del contenedor */}
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="pt-1 flex-none w-full" // flex-none y w-full para asegurar que cada tarjeta ocupe el ancho completo
            onClick={() => setSelectedType(item.type)}
          >
            <div className="p-1">
              <Card className="h-[160px]"> {/* Ajustar el alto de la tarjeta */}
                <CardContent className="flex items-center justify-center p-4 hover:cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.type}
                    className="h-24 w-24" // Imagen más grande
                  />
                  <span className="text-2xl font-semibold">{item.type}</span> {/* Tamaño de texto ajustado */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselShadcn;
