"use client";
import React, { useEffect } from "react";
import CarouselComponent from "./Carousel";
import { GetServerSideProps } from "next";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import AOS from "aos";
import "aos/dist/aos.css";
import { siteContentModel } from "@/models/siteContent.model";
interface AboutProps {
  data: siteContentModel;
}
const About = ({ data }: AboutProps) => {
  useEffect(() => {
    AOS.init({ duration: 2200 });
  }, [data]);
  return (
    <div className=" px-2 rounded-lg">
      <CarouselComponent />
      <div
        id="aboutUs"
        className="p-2 mt-10 bg-primary items-center md:gap-9 md:flex bg-[#6292A2] md:justify-evenly  w-full rounded-lg min-h-[70vh]"
      >
        <div
          className="md:max-w-[40%] flex justify-center animation"
          data-aos="fade-right"
        >
          <img
            src="/about.png"
            alt="about_image"
            className="animate-custom-zoom mb-7 md:mb-0 max-w-[500px] w-[90%]"
          />
        </div>
        <div
          className="md:max-w-[59%] text-[#f1efef] animation"
          data-aos="fade-left"
        >
          <h1 className="text-3xl font-bold mb-6">ABOUT US</h1>
          <p className="text-justify md:pr-4 font-medium">
            {data.description ||
              "At AHAZ Pharma, we are dedicated to advancing healthcare by providing           high-quality medicines, medical supplies, and laboratory reagents. Our           mission is to ensure that healthcare providers have access to the           essential products they need to deliver the best possible care to           their patients. With a commitment to excellence and a focus on           innovation, AHAZ Pharma strives to support the medical community           through reliable service and cutting-edge solutions. Our experienced           team works tirelessly to meet the evolving needs of the healthcare           industry, ensuring that we remain a trusted partner for hospitals,           clinics, and research institutions worldwide."}
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default About;
