import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[100vh]">
      <BsFillCheckCircleFill className="text-[#f45050] text-[7vmax] sm:text-[12vmax] " />
      <p className="text-3xl text-center font-bold sm:text-2xl">
        Your Order has been placed Successfully.
      </p>
      <Link
        to="/orders"
        className="px-[1.5vmax] py-[0.8vmax] bg-black text-white font-semibold border-2 border-black hover:text-black hover:bg-white"
      >
        View Orders
      </Link>
    </div>
  );
};

export default Success;
