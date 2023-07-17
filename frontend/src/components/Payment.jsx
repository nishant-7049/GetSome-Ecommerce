import React, { useEffect, useState } from "react";
import CheckOutSteps from "./CheckOutSteps";
import MetaData from "./MetaData";
import { AiOutlineCreditCard } from "react-icons/ai";
import { MdOutlineVpnKey, MdOutlineEventAvailable } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import ErrorAlert from "./ErrorAlert";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, clearError } from "../store/slices/orderSlice";

const Payment = () => {
  const total = localStorage.getItem("orderTotal");
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { orderError } = useSelector((state) => state.newOrder);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const paymentData = {
    amount: Math.round(total * 100),
  };

  const orderData = {
    shippingInfo,
    orderedItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: gst,
    shippingPrice: shippingCharge,
    totalPrice: total,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisable(true);
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/payment/process",
        paymentData,
        config
      );
      const clientSecret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pin,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        setError(result.error);
        setDisable(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(orderData));
          navigate("/success");
        } else {
          setError("There's some issue occured while processsing payment.");
        }
      }
    } catch (error) {
      setDisable(false);
      setError("Internal Server Error");
    }
  };
  useEffect(() => {
    console.log(error);
    setError();
    dispatch(clearError());
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"Payment -- GetSome"} />
      <CheckOutSteps activeStep={2} />
      <div className="w-full h-[90vh] flex items-center justify-center ">
        <form
          onSubmit={submitHandler}
          className="w-[30%] h-[60vh] flex flex-col justify-evenly sm:w-4/5"
        >
          <h1 className="text-2xl font-bold border-b-4  pb-2 text-center">
            Card Information
          </h1>
          <div className="flex items-center gap-4">
            <AiOutlineCreditCard className="text-2xl" />
            <CardNumberElement className="border-2 p-[1vmax] w-full" />
          </div>
          <div className="flex items-center gap-4">
            <MdOutlineEventAvailable className="text-2xl" />
            <CardExpiryElement className="border-2 p-[1vmax] w-full" />
          </div>
          <div className="flex items-center gap-4">
            <MdOutlineVpnKey className="text-2xl" />
            <CardCvcElement className="border-2 p-[1vmax] w-full" />
          </div>
          <input
            type="submit"
            className={`px-[1.5vmax] py-[1vmax] bg-[#f45050] text-white font=semibold border-2 border-[#f45050] hover:text-[#f45050]  hover:bg-white`}
            disabled={disable}
            value={`Pay - ${total}`}
          />
        </form>
      </div>
      {error ? <ErrorAlert message={error} alert={true} /> : ""}
      {orderError ? <ErrorAlert message={orderError} alert={true} /> : ""}
    </>
  );
};

export default Payment;
