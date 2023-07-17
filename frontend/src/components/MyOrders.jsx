import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getMyOrders } from "../store/slices/myOrdersSlice";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "./MetaData";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";
import { BsBoxArrowUpRight } from "react-icons/bs";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, myOrderError, loading } = useSelector(
    (state) => state.myOrders
  );
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 300,
      flex: 1,
      cellClassName: "font-bold",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.value == "Delivered" ? (
              <p className="text-green-700 font-bold">Delivered</p>
            ) : cellValues.value == "Processing" ? (
              <p className="text-red-800 font-bold">Processing</p>
            ) : (
              <p className="text-red-800 font-bold">Processing</p>
            )}
          </>
        );
      },
      cellClassName: "font-bold",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      minWidth: 150,
      flex: 0.3,
      cellClassName: "font-bold",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      flex: 0.5,
      cellClassName: "font-bold",
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      cellClassName: "font-bold",
      renderCell: (cellValues) => {
        return (
          <Link
            to={`/order/${cellValues.id}`}
            className="text-blue-400 font-bold"
          >
            <BsBoxArrowUpRight />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderedItems.length,
        amount: item.itemsPrice * item.orderedItems.length,
        status: item.orderStatus,
        id: item._id,
      });
    });
  useEffect(() => {
    if (myOrderError) {
      dispatch(clearError());
    }
    dispatch(getMyOrders());
  }, [dispatch, myOrderError]);

  return (
    <>
      <MetaData title={`${user.name} -- Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-[100vh] bg-[#F0F0F0]">
          <h1 className="pt-[1.5vmax] pb-[1vmax]  text-center border-b-4 border-black w-1/5 mx-auto text-xl font-bold">{`${user.name}'s Orders`}</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5]}
            autoHeight
            className="w-4/5 mx-auto my-[6vmax]"
          ></DataGrid>
        </div>
      )}
      {myOrderError && <ErrorAlert message={myOrderError} alert={true} />}
    </>
  );
};

export default MyOrders;
