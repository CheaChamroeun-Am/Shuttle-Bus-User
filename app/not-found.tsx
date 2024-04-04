"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  
  const router = useRouter();

  const backHome = () => {
    history.back();
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <Image src="/notFound.png" alt="Not Found" width={500} height={500} />
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-primary">Page not found</p>
        <button onClick={backHome} className="bg-primary text-white  w-[250px] h-[50px] rounded-lg mt-5">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
