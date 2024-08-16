"use client";
import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Button, Pagination, Input } from "@nextui-org/react";
import Loading from "@/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLabReagents,
  fetchMedicalSupplies,
  fetchMedicines,
} from "@/store/thunks/productThunk";
import { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { Drawer, Typography } from "@material-tailwind/react";
import Image from "next/image";

const ProductCards = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage] = useState<number>(8);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const medicines = useSelector((state: RootState) => state.products.medicines);
  const medicalSupplies = useSelector(
    (state: RootState) => state.products.medicalSupplies
  );
  const filter = useSelector((state: RootState) => state.products.filter);
  const labReagents = useSelector(
    (state: RootState) => state.products.labReagents
  );
  const [z30ClassAdded, setZ30ClassAdded] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);

  const [detailedProduct, setDetailedProduct] = React.useState<any>();

  const openDrawer = (product: any, index: number) => {
    const prod = {
      ...product,
      index: index,
    };
    setDetailedProduct(prod);
    setImageLoading(true);
    setOpen(true);
  };
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    if (open) {
      setZ30ClassAdded(true);
    } else {
      const timeoutId = setTimeout(() => {
        setZ30ClassAdded(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsData = [];
        if (filter === "lab reagents" && labReagents.length === 0) {
          const res: any = await dispatch(fetchLabReagents());
          if (res.payload.length) {
            productsData = res.payload;
          } else {
            toast.error("Something went wrong");
          }
        } else if (
          filter === "medical supplies" &&
          medicalSupplies.length === 0
        ) {
          const res: any = await dispatch(fetchMedicalSupplies());
          if (res.payload.length) {
            productsData = res.payload;
          } else {
            toast.error("Something went wrong");
          }
        } else if (
          (filter === "medicines" || !filter) &&
          medicines.length === 0
        ) {
          const res: any = await dispatch(fetchMedicines());
          if (res.payload.length) {
            productsData = res.payload;
          } else {
            toast.error("Something went wrong");
          }
        } else {
          productsData =
            filter === "lab reagents"
              ? labReagents
              : filter === "medical supplies"
              ? medicalSupplies
              : medicines;
        }
        setProducts(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPost =
    filteredProducts.length > 0
      ? filteredProducts.slice(firstPostIndex, lastPostIndex)
      : [];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />;
  }

  const transformFilter = (filter: string | undefined) => {
    if (filter === "lab reagents") {
      return "laboratory_reagents";
    } else if (filter === "medical supplies") {
      return "medical_supplies";
    } else {
      return "medicines";
    }
  };

  return (
    <div className="rounded-lg text-text  px-0 md:px-2 relative p-con">
      <h1 className="text-2xl font-light md:text-3xl py-4 text-[#ffffff] capitalize md:font-semibold">
        {filter || "Medicines"}
      </h1>

      <div className="flex flex-grow pr-10 md:pr:0 justify-end mb-4">
        <Input
          size="md"
          color="primary"
          isClearable
          onClear={() => setSearchQuery("")}
          className="w-[40%] max-w-[220px] min-w-24 "
          placeholder={`Search ${filter ? filter : "medicines"}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {currentPost.map((med, index) => (
          <div
            key={med.id}
            className="bg-white opacity-[0.9] text-[#0B566F] p-2 md:p-4 w-[198px] md:w-60 rounded-lg flex flex-col shadow-xl items-center justify-center md:hover:scale-105 hover:opacity-[1] transition-all cursor-pointer"
          >
            <img
              src={med.image}
              alt={med.name}
              className="w-20 h-20 sm:h-40 sm:w-40"
            />
            <div className="flex flex-col gap-1 mt-2">
              <h2 className="font-bold w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                {med.name.length > 24 ? `${med.name.slice(0, 20)}..` : med.name}
              </h2>
              <Button
                onClick={() => openDrawer(med, index)}
                color="primary"
                className="text-text font-bold scale-85 sm:scale-90"
                endContent={<InformationCircleIcon className="h-6" />}
              >
                Details
              </Button>
            </div>
          </div>
        ))}
        {filteredProducts.length > 8 && (
          <div className="w-full flex justify-center scrollbar-hide relative right-16">
            <Pagination
              total={Math.ceil(filteredProducts.length / postPerPage)}
              initialPage={1}
              page={currentPage}
              onChange={(page) => handlePageChange(page)}
              color="primary"
            />
          </div>
        )}
      </div>

      <div className={` ${z30ClassAdded ? "z-30" : "hidden"} `}>
        <Drawer
          placement="right"
          open={open}
          onClose={closeDrawer}
          className="p-4 bg-inherit flex pt-24 flex-col items-center gap-3 backdrop-blur-lg w-full h-full fixed"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="white" className="mb-10">
              {detailedProduct?.name}
              <hr />
            </Typography>
            <Button
              isIconOnly
              onClick={closeDrawer}
              className="underline text-xl bg-transparent absolute top-4 right-4 justify-center items-center bg-primary"
              radius="full"
              size="md"
            >
              <MdClose color="#fff" />
            </Button>
          </div>
          <div className="flex flex-col items-center no-scrollbar gap-5 mb-3 overflow-y-auto">
            {imageLoading && (
              <div className="h-[1px]">
                <Loading />
              </div>
            )}
            <Image
              src={detailedProduct?.image}
              alt={detailedProduct?.name}
              className={
                "min-w-[220px] h-[200px] block shadow-customSidebarShadow rounded-md"
              }
              width={220}
              height={200}
              onLoad={() => setImageLoading(false)}
            />
            <div className="flex gap-5 items-center">
              <i className="text-white">
                Quantity: {detailedProduct?.quantity}
              </i>
              <i className="text-white">Unit: {detailedProduct?.unit}</i>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default ProductCards;
