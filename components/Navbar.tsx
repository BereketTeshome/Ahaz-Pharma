import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { logo } from "@/assests";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <Navbar
      isBordered
      className=" bg-primary nav text-text text-sm shadow-xl w-[99%] rounded-xl mt-2"
      shouldHideOnScroll
    >
      <NavbarBrand>
        <Image alt="ahaz logo" src={logo} width={70} height={70} />
        <p className="font-bold  text-inherit ">AHAZ PHARMA</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link href="/#aboutUs">
            <p className="font-semibold text-sm">About Us</p>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/#product">
            <p className="font-semibold text-sm">Products</p>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/#footer">
            <p className="font-semibold text-sm">Contact</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
