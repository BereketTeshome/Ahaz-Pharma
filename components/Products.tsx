"use client";
import React, { useEffect } from "react";
import { ProductSidebar } from "./ProductSidbar";
import ProductCards from "./ProductCards";
import "@splidejs/react-splide/css";
import AOS from "aos";
import "aos/dist/aos.css";

const Products = () => {
  useEffect(() => {
    AOS.init({ duration: 2200 });
  }, []);
  return (
    <div
      id="product"
      className="flex bg-primary/40 px-2 py-4 w-full shadow-xl gap-2"
    >
      <div data-aos="fade-right">
        <ProductSidebar />
      </div>
      <div className="w-[80%] sm:w-full text-center" data-aos="fade-left">
        <ProductCards />
      </div>
    </div>
  );
};

export default Products;
