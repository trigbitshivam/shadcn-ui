import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <div className="flex flex-col items-center md:translate-y-[-380px] translate-y-0 sm:ml-0 md:ml-32 lg:ml-60 px-4">
      <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <CarouselContent className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div className="p-1">
                <Card className="w-44 h-80 sm:w-52 sm:h-88 md:w-56 md:h-95">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 text-lg sm:text-xl md:text-2xl">
          ⟵
        </CarouselPrevious>

        <CarouselNext className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 text-lg sm:text-xl md:text-2xl">
          ⟶
        </CarouselNext>
      </Carousel>
    </div>
  );
}
