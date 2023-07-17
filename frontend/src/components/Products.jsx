import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/slices/productSlice";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loader from "./Loader";
import Product from "./Product";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ErrorAlert from "./ErrorAlert";
import "./css/products.css";
import MetaData from "./MetaData";

const Products = () => {
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const [currPage, setCurrPage] = useState(1);

  const setCurrPageNo = (e) => {
    setCurrPage(e);
  };
  const dispatch = useDispatch();
  const {
    products,
    productsCount,
    loading,
    error,
    productPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);
  let count = filteredProductCount;
  const { keyword } = useParams();
  const categories = [
    "All",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone",
    "Sports",
  ];
  useEffect(() => {
    let object = { keyword, currPage, price, category, ratings };
    dispatch(getProducts(object));
  }, [dispatch, keyword, currPage, price, category, ratings]);

  return (
    <>
      <MetaData title="Products -- GetSome" />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-[100vh]">
          <h1 className="text-2xl border-b-2 border-black pb-2 my-8 font-semibold mx-auto text-center w-[12vmax] sm:w-[15vmax]">
            Products
          </h1>
          <div className="flex w-[75%] mx-auto justify-center gap-4 flex-wrap my-8 ">
            {products && products[0] ? (
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))
            ) : (
              <div className="text-gray-400 h-[90vh]">
                Product with keyword not found.
              </div>
            )}
          </div>
          <div className="w-[10vmax] absolute top-[10vmax] left-[4vmax] sm:static sm:w-[80%] sm:mx-auto">
            <Typography>Price</Typography>
            <Slider
              value={price}
              size="small"
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Category</Typography>
            <ul>
              {categories.map((category) => (
                <li
                  className="text-sm my-2 text-gray-600 hover:text-[#F45050] cursor-pointer "
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <Typography>Ratings above</Typography>
            <Slider
              size="small"
              value={ratings}
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
              valueLabelDisplay="auto"
              onChange={(e, newRating) => setRatings(newRating)}
            />
          </div>
          {productPerPage < count ? (
            <div>
              <Pagination
                activePage={currPage}
                itemsCountPerPage={productPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"1st"}
                lastPageText={"last"}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemsActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {error ? <ErrorAlert message={error} /> : ""}
    </>
  );
};

export default Products;
