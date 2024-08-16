"use client";
import React from "react";
import { Carousel, Typography } from "@material-tailwind/react";

const slideData = [
  {
    imgSrc: "/pills.jpg",
    altText: "image 1",
    title: "Mission",
    description:
      "Building Healthier Community through Customer Centric Health Service",
  },
  {
    imgSrc: "/wellness.jpg",
    altText: "image 2",
    title: "Vision",
    description:
      "To Be the Best Company in Health Sector Customers’ Experience",
  },
  {
    imgSrc: "/stock.jpg",
    altText: "image 3",
    title: "Core Values",
    description: "Agility || Honesty || Human Centric Service",
  },
];

const CarouselComponent = () => {
  return (
    <Carousel
      loop
      autoplay
      className="rounded-xl text-text h-[500px] shadow-xl"
    >
      {slideData.map((slide, index) => (
        <div key={index} className="relative h-full w-full">
          <img
            src={slide.imgSrc}
            alt={slide.altText}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-primary/60">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold"
              >
                {slide.title}
              </Typography>
              <Typography variant="lead" className="opacity-80 font-light">
                <i>{slide.description}</i>
              </Typography>
              <div className="flex justify-center gap-2"></div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
