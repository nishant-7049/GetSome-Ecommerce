import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "./MetaData";
import CheckOutSteps from "./CheckOutSteps";

const ShippingConfirm = () => {
  const { address, city, pincode, phoneNo, country, state } = useSelector(
    (state) => state.cart.shippingInfo
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { name } = useSelector((state) => state.user.user);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge =
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) >= 1000
      ? 250
      : 0;
  const gst =
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) *
    (18 / 100);
  const total = subtotal + shippingCharge + gst;
  localStorage.setItem("orderTotal", total);
  return (
    <>
      <MetaData title="Confirm Orders -- GetSome" />
      <CheckOutSteps activeStep={1} />
      <div className="my-[4vmax] mx-[2vmax] flex justify-between sm:flex-col sm:gap-4">
        <div className="w-2/3 pr-4 sm:w-full">
          <div className="flex flex-col gap-2 border-b-2  pb-4 sm:py-4">
            <h1 className="text-2xl font-bold">Shipping Info.</h1>
            <div className="flex  gap-2">
              <h2 className="font-semibold">Name:</h2>
              <p>{name}</p>
            </div>
            <div className="flex  gap-2">
              <h2 className="font-semibold">Phone:</h2>
              <p>{phoneNo}</p>
            </div>
            <div className="flex  gap-2">
              <h2 className="font-semibold">Address:</h2>
              <p>{`${address}, ${city} ${pincode}, ${state}, ${country}`}</p>
            </div>
          </div>
          <div className="my-[2vmax] sm:border-b-2 pb-4">
            <h1 className="text-2xl font-bold">Items in your Cart</h1>
            <div className="flex flex-col gap-4 my-4">
              {cartItems.map((item) => {
                return (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 sm:gap-2">
                      <img
                        src={item.image}
                        alt="product-image"
                        className="w-[10vmax]"
                      />
                      <p className="text-lg font-semibold sm:text-xs">
                        {item.name}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:text-xs">
                      <p>{`${item.quantity} X ₹${item.price} = `}</p>
                      <p className="font-semibold">{` ₹${
                        item.quantity * item.price
                      }`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-l-2 pl-4 w-1/3 flex flex-col gap-8 items-center sm:w-full sm:border-0 sm:p-0">
          <h1 className="text-2xl font-bold border-b-4 pb-4 border-gray-600 w-2/3 text-center sm:w-full">
            Order Summary
          </h1>
          <div className="flex justify-between w-1/2 items-center sm:w-full">
            <p className="text-lg font-semibold">Subtotal :</p>{" "}
            <p>
              {`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}
            </p>
          </div>
          <div className="flex justify-between w-1/2 items-center sm:w-full">
            <p className="text-lg font-semibold">Shipping Charges :</p>
            <p>
              {cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              ) >= 1000
                ? "+₹250"
                : "+₹0"}
            </p>
          </div>
          <div className="flex justify-between w-1/2 border-b-2 pb-4 items-center sm:w-full">
            <p className="text-lg font-semibold">GST :</p>
            <p>
              {`+₹${
                cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                ) *
                (18 / 100)
              }`}
            </p>
          </div>
          <div className="flex justify-between w-1/2 items-center sm:w-full">
            <p className="font-bold text-lg">Total :</p>
            <p className="font-bold text-[#f45050]">{`₹${total}`}</p>
          </div>
          <Link
            to="/shipping/payment"
            className=" cursor-pointer text-center bg-[#f45050] sm:w-full px-[1.5vmax] py-[1vmax] text-white font-bold w-1/2 hover:bg-white hover:border-[#f45050] hover:border-2 hover:text-[#f45050]"
          >
            Proceed to Payment
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShippingConfirm;
