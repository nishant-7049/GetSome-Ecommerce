import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountBoxFill } from "react-icons/ri";

const Navbar = () => {
  const [toggle, setToggle] = useState(0);
  return (
    <div
      className={`fixed z-10  top-0 ${
        toggle ? "bg-[#F0F0F0] bg-opacity-90" : ""
      } font-["Roboto"]`}
    >
      <div
        className="fixed  top-8 left-8 text-3xl cursor-pointer font-extrabold p-2 rounded-lg hover:text-[#F45050] "
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? <MdClose /> : <GiHamburgerMenu />}
      </div>
      <div className="">
        {toggle ? (
          <div className="h-[100vh] w-[100vw] mx-auto flex items-center px-40 py-28 justify-between text-3xl font-bold sm:flex-col">
            <Link
              to="/"
              className=" text-[#F45050] text-4xl font-extrabold font-['Nunito']"
              onClick={() => setToggle(!toggle)}
            >
              GetSome.
            </Link>
            <Link
              to="/"
              className="hover:text-[#F45050]"
              onClick={() => setToggle(!toggle)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-[#F45050]"
              onClick={() => setToggle(!toggle)}
            >
              Product
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#F45050]"
              onClick={() => setToggle(!toggle)}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="hover:text-[#F45050]"
              onClick={() => setToggle(!toggle)}
            >
              About
            </Link>
            <div className="flex gap-4 ">
              <Link
                to="/search"
                className="hover:text-[#F45050]"
                onClick={() => setToggle(!toggle)}
              >
                <AiOutlineSearch />
              </Link>
              <Link
                to="/cart"
                className="hover:text-[#F45050]"
                onClick={() => setToggle(!toggle)}
              >
                <AiOutlineShoppingCart />
              </Link>
              <Link
                to="/signup"
                className="hover:text-[#F45050]"
                onClick={() => setToggle(!toggle)}
              >
                <RiAccountBoxFill />
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
