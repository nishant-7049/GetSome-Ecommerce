import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineReviews } from "react-icons/md";
import { BsArrowDownUp } from "react-icons/bs";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const [toggleProduct, setToggleProduct] = useState(false);
  return (
    <div className="flex flex-col py-[5vmax] px-[5vmax] gap-8 bg-white h-[100vh] border-r-2 sm:border-none sm:p-[10vmax]">
      <Link to="/" className="text-3xl font-bold text-[#F45050] text-center">
        GetSome.
      </Link>
      <Link
        to="/admin/dashboard"
        className="flex gap-2 items-center font-semibold text-gray-500"
      >
        <MdOutlineDashboard />
        Dashboard
      </Link>
      <Link
        className=" font-semibold text-gray-500"
        onClick={() => {
          setToggleProduct(!toggleProduct);
        }}
      >
        <div className="flex items-center gap-2">
          <BsArrowDownUp />
          Product
        </div>
        {toggleProduct && (
          <div className="flex flex-col gap-2 ml-8 mt-4">
            <Link to="/admin/products">All</Link>
            <Link to="/admin/product/new">Create</Link>
          </div>
        )}
      </Link>
      <Link
        to="/admin/orders"
        className="flex gap-2 items-center font-semibold text-gray-500"
      >
        <AiOutlineOrderedList />
        Orders
      </Link>
      <Link
        to="/admin/users"
        className="flex gap-2 items-center font-semibold text-gray-500"
      >
        <FiUsers />
        Users
      </Link>
      <Link
        to="/admin/review"
        className="flex gap-2 items-center font-semibold text-gray-500"
      >
        <MdOutlineReviews />
        Reviews
      </Link>
    </div>
  );
};

export default Sidebar;
