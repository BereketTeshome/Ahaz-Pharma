"use client";
import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Link from "next/link";
import Loading from "@/components/Loading";
import Paginate from "./Pagination";

interface MedData {
  id: string;
  name: string;
  image: string;
  // Add any other fields from your Firestore document here
}

const fetchData = async (): Promise<MedData[]> => {
  const querySnapshot = await getDocs(collection(db, "medical_supplies"));
  const data: MedData[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as MedData);
  });
  return data;
};

const Supplies: React.FC = () => {
  const [medsData, setMedsData] = useState<MedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Initially set to true
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage] = useState<number>(9);

  useEffect(() => {
    const fetchMedsData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data
        const data = await fetchData();
        setMedsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading state to false after data fetching completes
      }
    };

    fetchMedsData();
  }, []); // Fetch data only once on component mount

  // Calculate current posts based on pagination
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = medsData.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />; // Render loading indicator while data is being fetched
  }

  return (
    <div className="rounded-lg text-text">
      <h1 className="text-3xl py-4 text-[#ffffff] font-light">
        Medical Supplies
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {currentPosts.map((med) => (
          <div
            key={med.id}
            className="bg-white text-[#0B566F] p-4 w-60 rounded-lg flex flex-col shadow-xl items-center justify-center hover:scale-105 transition-all cursor-pointer"
          >
            <img src={med.image} alt={med.name} className="h-40 w-40" />
            <div className="flex flex-col gap-1 mt-2">
              <h2 className="font-bold w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                {med.name.length > 24 ? `${med.name.slice(0, 20)}..` : med.name}
              </h2>
              <Button
                color="primary"
                className="text-text font-bold"
                endContent={<InformationCircleIcon className="h-6" />}
              >
                <Link href={`/products/medical_supplies/${med.id}`} passHref>
                  Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-8">
        <Paginate
          total={medsData.length}
          postPerPage={postPerPage}
          setCurrentPage={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Supplies;
