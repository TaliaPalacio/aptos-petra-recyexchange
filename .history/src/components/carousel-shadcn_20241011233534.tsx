import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Definimos el tipo de setSelectedType como una función que recibe un string
interface CarouselShadcnProps {
  setSelectedType: (type: string) => void;
}

const CarouselShadcn: React.FC<CarouselShadcnProps> = ({ setSelectedType })=>  {
  const items = [
    {type: "Plastic", image: "/plastic.jpeg"},
    {type: "Cardboard", image: "/cardboard.jpeg"},
    {type: "Glass", image: "/glass.jpeg"},
    {type: "Metal", image: "/metal.jpeg"},
  ];
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {items.map((item, index) => (
          <CarouselItem 
          key={index} 
          className="pt-1 md:basis-1/2"
          onClick={() => setSelectedType(item.type)}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6 hover: cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.type}
                    className="h-16 w-16"
                  />
                  <span className="text-3x1 font-semibold">{item.type}</span>
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
