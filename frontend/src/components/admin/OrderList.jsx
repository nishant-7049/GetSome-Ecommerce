import React, { useEffect } from "react";
import Loader from "../Loader";
import MetaData from "../MetaData";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrders, clearError } from "../../store/slices/allOrderSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteOrder,
  deleteReset,
  clearError as ClearUpError,
} from "../../store/slices/updateOrderSlice";
import ErrorAlert from "../ErrorAlert";

const OrderList = () => {
  const { loading, error, orders, totalAmount } = useSelector(
    (state) => state.allOrders
  );
  const {
    loading: upLoading,
    error: upError,
    isDeleted,
  } = useSelector((state) => state.updateOrders);
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 150, flex: 0.5 },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.4,
      renderCell: (cellValues) => {
        return (
          <div>
            {cellValues.row.status === "Delivered" ? (
              <p className="text-green-500">{cellValues.row.status}</p>
            ) : (
              <p className="text-red-700">{cellValues.row.status}</p>
            )}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.4,
      type: "number",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <div className="flex gap-2">
            <Link to={`/admin/order/edit/${cellValues.id}`}>
              <BiEdit className="text-xl font-bold text-blue-400 cursor-pointer" />
            </Link>
            <RiDeleteBin6Line
              className="text-xl font-bold text-red-600 cursor-pointer"
              onClick={() => {
                dispatch(deleteOrder(cellValues.id));
              }}
            />
          </div>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((orderItem) => {
      rows.push({
        id: orderItem._id,
        quantity: orderItem.orderedItems.length,
        amount: orderItem.totalPrice,
        status: orderItem.orderStatus,
      });
    });

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllOrders());
      setTimeout(() => {
        dispatch(deleteReset());
      }, 5000);
    }
    if (upError) {
      dispatch(ClearUpError());
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, isDeleted, error, upError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"All Orders -- GetSome"} />
          <div className="flex">
            <Sidebar className="w-1/3" />
            <div className="w-full">
              <h1 className="text-3xl font-bold text-gray-500 text-center my-[2vmax]">
                Order List{" "}
              </h1>
              <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                className="w-4/5 mx-auto h-fit "
              />
            </div>
          </div>
        </div>
      )}
      {error && <ErrorAlert message={error} alert={true} />}
      {upError && <ErrorAlert message={upError} alert={true} />}
      {isDeleted && (
        <ErrorAlert message={"Order Deleted Successfully"} alert={false} />
      )}
    </>
  );
};

export default OrderList;
