"use client";
import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
// import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Link from "next/link";
import Loading from "@/components/Loading";

const fetchData = async (): Promise<any[]> => {
  const querySnapshot = await getDocs(collection(db, "laboratory_reagents"));

  const data: any[] = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

const Reagents = () => {
  const [medsData, setMedsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetch = async () => {
        setLoading(true);
        const data = await fetchData();
        setMedsData(data);
        setLoading(false);
      };
      fetch();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="rounded-lg text-text">
      <h1 className="text-3xl py-4 text-[#ffffff] font-light">
        Laboratory Reagents
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {medsData.map((med) => (
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
                <Link
                  href={"products/laboratory_reagents/" + med.id}
                  className="w-full"
                >
                  Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reagents;
