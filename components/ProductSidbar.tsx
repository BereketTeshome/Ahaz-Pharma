"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { MdMedication } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { GiMedicalThermometer } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { changeFilter } from "@/store/reducers/productReducers";
import { RootState } from "@/store/store";

export function ProductSidebar() {
  const filterState = useSelector((state: RootState) => state.products.filter);
  const [filter, setFilter] = useState<string>(filterState || "medicines");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(changeFilter(filter));
  }, [filter, dispatch]);

  useEffect(() => {
    if (!filterState) {
      setFilter("medicines");
    }
  }, [filterState]);

  return (
    <Card className="md:h-[calc(100vh-2rem)] h-[calc(80vh-2rem)] ml-2 w-[90px] transition duration-300 ease-in-out md:w-full max-w-[20rem] text-text p-1 md:p-4 shadow-xl shadow-blue-gray-900/5 bg-primary">
      <div className="mb-1 p-2">
        <p className="font-light md:font-bold text-md md:text-2xl text-center md:text-start mb-2">
          Filter <span className="">Products</span>
        </p>
        <hr />
      </div>
      <List className="text-text">
        <ListItem
          onClick={() => setFilter("medicines")}
          className={`p-1 mt-4 md:p-3 w-min md:w-full left-3.5 md:left-0 ${
            filter === "medicines" || !filter ? "bg-secondary" : ""
          }`}
        >
          <ListItemPrefix className="relative left-2 md:left-0">
            <MdMedication />
          </ListItemPrefix>
          <Typography className="mr-auto font-bold hidden md:block ">
            Medicines
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => setFilter("medical supplies")}
          className={`p-1 mt-4 md:p-3 w-min md:w-full left-3.5 md:left-0 ${
            filter === "medical supplies" ? "bg-secondary" : ""
          }`}
        >
          <ListItemPrefix className="relative left-2 md:left-0">
            <RiMentalHealthFill />
          </ListItemPrefix>
          <Typography className="mr-auto font-bold hidden md:block">
            Medical Supplies
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => setFilter("lab reagents")}
          className={`p-1 mt-4 md:p-3 w-min md:w-full left-3.5 md:left-0 ${
            filter === "lab reagents" ? "bg-secondary" : ""
          }`}
        >
          <ListItemPrefix className="relative left-2 md:left-0">
            <GiMedicalThermometer />
          </ListItemPrefix>
          <Typography className="mr-auto font-bold hidden md:block">
            Lab Reagents
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
}
