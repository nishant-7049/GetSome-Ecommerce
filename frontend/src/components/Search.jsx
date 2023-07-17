import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "./MetaData";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <MetaData title="Search -- GetSome" />
      <form
        onSubmit={searchSubmitHandler}
        className="fixed w-full h-full flex items-center justify-center top-0 left-0 bg-[#F0F0F0]"
      >
        <input
          className="py-[1vmax] px-[2vmax] border-2 w-1/2"
          type="text"
          placeholder="Search a Product... "
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <input
          className="py-[1vmax] px-[2vmax] border-2 bg-[#F45050] text-white w-[10%] uppercase font-bold cursor-pointer"
          type="submit"
          value="Search"
        />
      </form>
    </>
  );
};

export default Search;
