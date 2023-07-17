import React, { useState, useEffect } from "react";
import { BiError } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ErrorAlert = ({ message, alert }) => {
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setToggle(false);
    }, 5000);
  }, [toggle]);

  return (
    <>
      {toggle ? (
        <div className="flex justify-center">
          <div className="fixed bottom-4 w-fit mx-auto bg-black flex text-white justify-center items-center p-2 gap-4 text-lg uppercase border-2 border-red-600 z-10">
            {!alert ? (
              <AiOutlineCheckCircle className="text-green-400 text-2xl" />
            ) : (
              <BiError className="text-red-400 text-2xl" />
            )}{" "}
            {message}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ErrorAlert;
