import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const Product = ({ product }) => {
  const options = {
    size: "medium",
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };
  return (
    <Link
      to={`/product/${product._id}/#productDetails`}
      className="flex flex-col justify-center gap-2 hover:shadow-xl sm:gap-2 sm:shadow-xl w-1/4 lg:w-1/3  sm:w-full"
    >
      <img
        className=" w-full "
        src={product.images[0].url}
        alt={product.name}
      />
      <p className="text-lg px-4 sm:text-base sm:px-2 line-clamp-1 ">
        {product.name}
      </p>
      <div className="flex items-center gap-2 px-4 sm:flex-col sm:gap-0 sm:px-2 sm:items-start">
        <Rating {...options} />{" "}
        <span className=" text-xs sm:text-xs">
          ({product.noOfReview} reviews)
        </span>
      </div>
      <span className="text-lg text-[#F45050] px-4 sm:px-2">
        ₹{product.price}
      </span>
    </Link>
  );
};

export default Product;
