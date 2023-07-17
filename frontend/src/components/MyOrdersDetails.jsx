import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, clearError } from "../store/slices/myOrderDetails";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";
import { Link } from "react-router-dom";

const MyOrdersDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, order, error } = useSelector(
    (state) => state.myOrderDetails
  );
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="m-[6vmax] flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#f45050]">
              Order: {order && order._id}
            </h1>
            <h1 className="text-xl font-semibold">Shipping Info.</h1>
            <div className="border-b-2 pb-[1vmax]">
              <p>Name: {user.name}</p>
              <p>
                Phone No.: {order.shippingInfo && order.shippingInfo.phoneNo}
              </p>
              <p>
                Address:{" "}
                {order.shippingInfo &&
                  `${order.shippingInfo.address} ${order.shippingInfo.pincode} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.country}`}
              </p>
            </div>
            <h1 className="text-xl font-semibold">Payment</h1>
            <div className="border-b-2 pb-[1vmax]">
              <p
                className={`${
                  order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "Paid"
                  : "Unpaid"}
              </p>
              <p>Amount: ₹{order.totalPrice}</p>
            </div>
            <h1 className="text-xl font-semibold">Order Status</h1>
            <div className="border-b-2 pb-[1vmax]">
              <p
                className={
                  order.orderStatus && order.orderStatus === "Delivered"
                    ? "text-green-700"
                    : "text-red-700"
                }
              >
                {order.orderStatus}{" "}
              </p>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Ordered Items</h1>
              <div className="border-b-2 pb-[1vmax]">
                {order.orderedItems &&
                  order.orderedItems.map((item) => {
                    return (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt="Product Image"
                            className="w-[20vmax]"
                          />
                          <Link
                            to={`/product/${item.product}`}
                            className="text-xl font-bold text-[#f45050]"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="flex gap-2">
                          <p>{`${item.quantity} X ₹${item.price} = `}</p>
                          <p className="font-bold ">{`₹${
                            item.quantity * item.price
                          }`}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
      {error ? <ErrorAlert message={error} alert={true} /> : ""}
    </>
  );
};

export default MyOrdersDetails;
