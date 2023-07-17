import React from "react";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="border-2 shadow-lg sm:min-w-[80vw]  flex min-h-[50vh] min-w-[30vw] flex-col flex-none justify-center items-center py-[4vmax] ">
      <img src="/user.png" alt="user" className="w-[5vmax] mx-auto" />
      <p className="font-semibold text-center">{review.name}</p>
      <Rating {...options} classNames="mx-auto w-fit" />
      <div className="flex px-4">
        <p className="text-center text-gray-600 w-[28vw] sm:w-[65vw] h-[6rem] mx-auto overflow-y-auto break-words">
          {review.comment}{" "}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
