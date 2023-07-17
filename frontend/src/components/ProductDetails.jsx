import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  resetReviewed,
  getProductDetails,
} from "../store/slices/productDetailsSlice";
import { addItemToCart } from "../store/slices/cartSlice";
import { useParams } from "react-router-dom";
import { Pagination } from "swiper";
import Loader from "./Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/pagination";
import ErrorAlert from "./ErrorAlert";
import MetaData from "./MetaData";
import { MdClose } from "react-icons/md";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error, reviewed } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    size: "large",
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };

  const [noOfOrder, setNoOfOrder] = useState(1);

  const incrementOrder = () => {
    if (product.stock > noOfOrder) {
      const order = noOfOrder + 1;
      setNoOfOrder(order);
    }
  };
  const decrementOrder = () => {
    if (noOfOrder > 1) {
      const order = noOfOrder - 1;
      setNoOfOrder(order);
    }
  };

  const { cartItems } = useSelector((state) => state.cart);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const addToCart = () => {
    const object = {
      id,
      quantity: noOfOrder,
    };
    dispatch(addItemToCart(object));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setIsCartUpdated(true);
  };

  const [toggleRev, setToggleRev] = useState("close");
  const [revRating, setRevRating] = useState();
  const [revComment, setRevComment] = useState();

  const dispatch = useDispatch();

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const rev = {
      rating: revRating,
      comment: revComment,
      productId: id,
    };
    dispatch(createReview(rev));
    setToggleRev("close");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(resetReviewed());
  }, [dispatch, id, reviewed]);

  return (
    <>
      <MetaData title={`${product.name} -- GetSome`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="flex w-full p-[6vmax] sm:flex-col"
            id="productDetails"
          >
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={0}
              slidesPerView={1}
              className="w-1/2 sm:w-full"
            >
              {product.images.map((image) => (
                <SwiperSlide key={image._id}>
                  <img
                    src={image.url}
                    alt={image.public_id}
                    className="w-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="w-1/2 flex flex-col justify-evenly p-[2vmax] sm:w-full sm:h-[60vh] sm:items-center">
              <div className="sm:text-center">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-xs">{`ProductID: ${product._id}`}</p>
              </div>
              <div className="flex gap-2 items-center border-t-2 border-b-2">
                <Rating {...options} />
                <span className="text-sm">{`(${product.noOfReview} Reviews)`}</span>
              </div>
              <div>
                <h1 className="text-2xl text-[#F45050] font-bold">{`₹${product.price}`}</h1>
                <div className="flex gap-4 sm:text-center">
                  <div>
                    <button
                      onClick={decrementOrder}
                      className="px-3 py-2 rounded-l-md text-white font-bold bg-gray-400 sm:px-2"
                    >
                      <AiOutlineMinus />
                    </button>
                    <input
                      type="number"
                      value={noOfOrder}
                      readOnly
                      className="w-12 px-3 py-2 sm:w-8"
                    />
                    <button
                      onClick={incrementOrder}
                      className="px-3 py-2 rounded-r-md text-white font-bold bg-gray-400 sm:px-2"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <button
                    className="px-4 py-2 rounded-md text-white font-semibold bg-[#F45050] sm:px-2"
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      product.stock < 1 ? "text-red-800" : "text-green-800"
                    }
                  >
                    {product.stock < 1 ? "Out of Stock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="text-md border-t-2 border-b-2 font-semibold sm:text-center">
                Description:{" "}
                <p className="text-sm font-normal">{` "${product.description}"`}</p>
              </div>
              <button
                onClick={() => {
                  setToggleRev("open");
                }}
                className=" w-fit px-4 py-2 rounded-md text-white font-semibold bg-[#F45050] "
              >
                Submit Review
              </button>
            </div>
            {toggleRev == "open" ? (
              <div className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center z-10  bg-opacity-60 bg-black bg-blend-normal">
                <form
                  className="relative w-1/3 h-[40vh] bg-white z-10 flex flex-col justify-between items-center py-8"
                  onSubmit={reviewSubmitHandler}
                >
                  <MdClose
                    className="absolute right-8 top-8 font-bold hover:text-[#F45050] text-2xl cursor-pointer"
                    onClick={() => {
                      setToggleRev("close");
                    }}
                  />
                  <h1 className="text-gray-400">Submit Review</h1>
                  <Rating
                    precision={0.5}
                    onChange={(e) => {
                      setRevRating(e.target.value);
                    }}
                  />
                  <textarea
                    className="border-2 w-4/5 h-20 mx-auto "
                    onChange={(e) => {
                      setRevComment(e.target.value);
                    }}
                  ></textarea>
                  <input
                    type="submit"
                    className="cursor-pointer w-fit px-4 py-2 rounded-md text-white font-semibold bg-[#F45050]"
                    value="Post Review"
                  />
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-8">
            <h1 className="text-2xl uppercase border-b-2 border-black w-fit mx-auto font-semibold mb-8">
              Reviews
            </h1>
            {product.reviews && product.reviews[0] ? (
              <div className=" overflow-auto grid grid-flow-col gap-4 px-[5vmax] pb-8 ">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No Reviwes yet.</p>
            )}
            {error ? <ErrorAlert message={error} alert={true} /> : ""}
            {isCartUpdated ? (
              <ErrorAlert message={"Item added to cart"} alert={false} />
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
