import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearError } from "../../store/slices/myOrderDetails";
import { updateOrder, updateReset } from "../../store/slices/updateOrderSlice";
import { useParams } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import Loader from "../Loader";

const UpdateOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState();
  const { address, city, pincode, phoneNo, country, state } = useSelector(
    (state) => state.cart.shippingInfo
  );
  const { loading: orLoading, order } = useSelector(
    (state) => state.myOrderDetails
  );
  const { loading, isUpdated, error } = useSelector(
    (state) => state.updateOrders
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
  const submitOrder = (e) => {
    e.preventDefault();
    let quantity = 0;
    order.orderedItems.forEach((or) => {
      quantity += or.quantity;
    });
    const options = {
      id,
      data: { status },
    };
    dispatch(updateOrder(options));
  };

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (isUpdated) {
      dispatch(getOrderDetails(id));
      dispatch(updateReset());
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, isUpdated, error]);
  return (
    <>
      {loading || orLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar className="w-1/3" />
          <div className="w-full">
            <MetaData title="Edit Order -- GetSome" />
            <div className="my-[4vmax] mx-[2vmax] flex justify-between sm:flex-col sm:gap-4">
              <div className="w-2/3 pr-4 sm:w-full">
                <div className="flex flex-col gap-2 border-b-2  pb-4 sm:py-4">
                  <h1 className="text-2xl font-bold">Shipping Info.</h1>
                  <div className="flex  gap-2 ml-4">
                    <h2 className="font-semibold">Name:</h2>
                    <p>{name}</p>
                  </div>
                  <div className="flex  gap-2 ml-4">
                    <h2 className="font-semibold">Phone:</h2>
                    <p>{phoneNo}</p>
                  </div>
                  <div className="flex  gap-2 ml-4">
                    <h2 className="font-semibold">Address:</h2>
                    <p>{`${address}, ${city} ${pincode}, ${state}, ${country}`}</p>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mt-[2vmax] mb-2">Payment</h1>
                <div className="border-b-2 pb-4 mb-[2vmax] ml-4">
                  <p
                    className={`${
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-700"
                        : "text-red-700"
                    } font-bold `}
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "Paid"
                      : "Unpaid"}
                  </p>
                  <div className="flex gap-2">
                    <p className="font-bold ">Amount: </p>
                    <p>₹{order.totalPrice}</p>
                  </div>
                </div>
                <h1 className="text-xl font-semibold">Order Status</h1>
                <div className="border-b-2 pb-[1vmax] ml-4">
                  <p
                    className={`${
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-700"
                        : "text-red-700"
                    } font-bold py-2`}
                  >
                    {order.orderStatus}{" "}
                  </p>
                </div>
                <div></div>
                <div className="my-[2vmax] sm:border-b-2 pb-4">
                  <h1 className="text-2xl font-bold">Items in your Cart</h1>
                  <div className="flex flex-col gap-4 my-4">
                    {cartItems.map((item, index) => {
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
              {order.orderStatus !== "Delivered" && (
                <div className="border-l-2 pl-4 w-1/3 flex flex-col gap-8 items-center sm:w-full sm:border-0 sm:p-0">
                  <h1 className="text-2xl font-bold border-b-4 pb-4 border-gray-600 w-2/3 text-center sm:w-full">
                    Process Order
                  </h1>
                  <div className="flex flex-col gap-8 w-1/2 items-center sm:w-full">
                    <h1 className="text-xl font-bold">Status:</h1>
                    <form
                      className="flex flex-col items-center gap-8"
                      onSubmit={submitOrder}
                    >
                      <select
                        className="border p-2"
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      >
                        <option value="">Select Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                      <input
                        type="submit"
                        disabled={status === "" ? true : false}
                        className="bg-[#F45050] p-[0.7vmax] text-white cursor-pointer w-full"
                      />
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isUpdated && (
        <ErrorAlert message={"Order updated Successfully"} alert={false} />
      )}
    </>
  );
};

export default UpdateOrder;
