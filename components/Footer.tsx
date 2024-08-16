"use-client";
import React from "react";
import { siteContentModel } from "@/models/siteContent.model";
import { logo } from "@/assests";
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

interface FooterProps {
  data: siteContentModel;
}

const Footer = ({ data }: FooterProps) => {
  return (
    <footer>
      <div className="content">
        <div className="top flex items-center">
          <div className="logo-details">
            <Image
              src={logo}
              alt="footer_logo"
              width={70}
              height={70}
              className="max-w-36"
            />
          </div>
          <div className="media-icons">
            <a href="#">
              <FaFacebookF className="relative top-[10px] left-2.5" />
            </a>
            <a href="#">
              <FaTelegramPlane className="relative top-[10px] left-2.5" />
            </a>
            <a href="#">
              <FaInstagram className="relative top-[10px] left-2.5" />
            </a>
            <a href={`mailto:${data.email}`} target="_blank">
              <BiLogoGmail className="relative top-[10px] left-2.5" />
            </a>
          </div>
        </div>
        <div className="link-boxes block md:flex items-center">
          <i className="w-full md:w-[26%] text-justify text-white font-light mb-5 md:mb-0">
            <b className="text-4xl">A</b>HAZ Pharma provides top-quality medical
            and cosmetic products at our pharmacy. Discover a vast selection of
            affordable medications and premium skincare items for a flawless
            look. Shop now for the best deals and exceptional customer service!
          </i>
          <ul className="box mb-5 md:mb-0">
            <li className="link_name">Links</li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="/#product">Products</a>
            </li>
            <li>
              <a href="/#aboutUs">About Us</a>
            </li>
          </ul>

          <div className="bg-gradient-to-r from-[#9AB7C1] to-teal-200 text-[#0B566F] rounded-xl shadow-xl md:min-w-[400px] w-[500px] p-4 transform transition-transform md:hover:scale-105">
            <div className="mb-4">
              <h1 className="text-2xl font-extrabold mb-3">Contacts</h1>
              <p className="text-md">
                If you have any questions or need help, feel free to contact our
                team
                <a
                  className=" font-bold mx-1 underline"
                  href={`tel:${data.contact_number1}`}
                >
                  {data.contact_number1}
                </a>
                <a
                  className=" font-bold underline"
                  href={`tel:${data.contact_number2}`}
                >
                  {data.contact_number2}
                </a>
              </p>
            </div>
            <hr className="border-white mb-4 opacity-50" />
            <div className="mb-4">
              <h1 className="text-2xl font-semibold py-2">Working hours</h1>
              <p className="text-md">
                Mon - Sat: 8:30 am - 10:00 pm <br />
                Sunday: 12:00 pm - 10:00 pm
              </p>
            </div>
            <hr className="border-white mb-4 opacity-50" />
            <div className="underline underline-offset-4">
              <a
                href={data.location}
                className="font-light flex items-center gap-2 text-lg"
                target="_blank"
              >
                <FaLocationDot /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-details">
        <div className="bottom_text">
          <span className="copyright_text">
            Copyright © 2024 <a href="#"> AHAZ Pharma.</a>All rights reserved
          </span>
          <span>Takes care of your pain</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
