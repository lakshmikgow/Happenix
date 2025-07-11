// import React from 'react'
import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="relative bottom-0 w-full">
      <div className="mt-12 bottom-0 w-full bg-blue-800 h-10 flex bg-fixed items-center text-white gap-3">
        <FaCopyright className=" ml-24  h-5 " />
        Happenix
      </div>
    </div>
  );
}
