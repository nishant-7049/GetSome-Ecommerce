import React from "react";
import { useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { RiH1 } from "react-icons/ri";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <div className="flex items-center w-4/5 mx-auto p-[1vmax] bg-[#F45050] mt-[8vmax] mb-[2vmax] sm:text-sm gap-4">
        <p className="w-1/2 text-white font-semibold ">Product</p>
        <p className="w-1/4 text-right text-white font-semibold">Order</p>
        <p className="w-1/4 text-right text-white font-semibold">Sub Total</p>
      </div>

      {cartItems.length === 0 ? (
        <h1 className="text-gray-400 text-xl text-center mb-[4vmax]">
          No Products in Cart
        </h1>
      ) : (
        <>
          <div className="flex  flex-col gap-4 mb-[4vmax] border-b-4 border-[#F45050] w-4/5 mx-auto">
            {cartItems.map((item) => (
              <CartItemCard item={item} key={item.product} />
            ))}
          </div>
          <div className="w-4/5 mx-auto flex flex-col items-end gap-8 mb-[2vmax] sm:items-center">
            <div className="flex justify-end gap-12 items-center sm:justify-between">
              <p className="text-xl  font-bold">Total Price :</p>
              <p className="text-[#F45050] font-semibold text-xl">{`₹ ${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <Link
              to="/shipping"
              className="px-[2vmax] uppercase py-[1vmax] bg-[#F45050] text-white font-semibold hover:bg-white hover:text-[#F45050] hover:border-[#F45050] border-2 sm:w-full"
            >
              Check Out
            </Link>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Cart;
