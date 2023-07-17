import React from "react";

const Loader = () => {
  return (
    <div className="bg-white w-full h-[100vh] flex justify-center items-center">
      <div className="w-[10rem] h-[10rem] rounded-full border-b-4  border-l-4  border-[#FFD95A] animate-spin" />
    </div>
  );
};

export default Loader;
