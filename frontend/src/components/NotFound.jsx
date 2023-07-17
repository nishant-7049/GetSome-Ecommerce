import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[100vh]">
      <BiErrorCircle className="text-[#f45050] text-[7vmax] sm:text-[12vmax] " />
      <p className="text-3xl text-center font-bold sm:text-2xl">
        Page Not Found
      </p>
      <Link
        to="/"
        className="px-[1.5vmax] py-[0.8vmax] bg-black text-white font-semibold border-2 border-black hover:text-black hover:bg-white"
      >
        Home
      </Link>
    </div>
  );
};

export default NotFound;
