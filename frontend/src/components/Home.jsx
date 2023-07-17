import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/slices/productSlice";
import Product from "./Product";
import MetaData from "./MetaData";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";

const Home = () => {
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const object = {
    keyword: "",
    page: 1,
    price: [0, 25000],
    category: "",
    ratings: 0,
  };
  useEffect(() => {
    dispatch(getProducts(object));
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="GetSome" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gradient-to-r from-[#FFF7D4] to-[#FFD95A] h-[100vh] text-center flex items-center justify-center flex-col">
            <p className="mb-20">Welcome to GetSome.</p>
            <h1 className="text-3xl mb-12 font-bold text-[#F45050] uppercase">
              Discover Endless Possibilities with GetSome
            </h1>
            <a href="#container">
              <button className="flex items-center gap-2 border-2 border-solid py-2 px-4 ease-in-out  border-black rounded-md  hover:bg-[#F45050] hover:border-[#F45050] hover:text-[#fff]">
                Scroll <CgMouse />
              </button>
            </a>
            <div className="absolute bottom-0 bg-gradient-to-br from-transparent from-50%  to-white to-50% h-[25%] w-full"></div>
          </div>
          <div>
            <h2 className="text-center text-2xl border-b-2 border-black w-[20%] pb-2 mt-20 mx-auto sm:text-basef sm:w-[40%]">
              Featured Products
            </h2>
            <div
              className="py-16 mx-auto w-[75%] flex flex-wrap gap-4 justify-center lg:w-[80%]"
              id="container"
            >
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </div>
        </>
      )}
      {error ? <ErrorAlert message={error} /> : ""}
    </>
  );
};

export default Home;
