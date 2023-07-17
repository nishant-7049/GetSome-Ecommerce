import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../store/slices/productSlice";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  clearError,
  messReset,
} from "../../store/slices/deleteProductSlice";
import Loader from "../Loader";
import ErrorAlert from "../ErrorAlert";

const AdminProducts = () => {
  const navigate = useNavigate();
  const col = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.4,
      cellClassName: "font-semibold ",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.2,
      cellClassName: "font-semibold ",
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.2,
      cellClassName: "font-semibold ",
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
            <Link to={`/admin/product/edit/${cellValues.id}`}>
              <BiEdit className="text-xl font-bold text-blue-400 cursor-pointer" />
            </Link>
            <RiDeleteBin6Line
              className="text-xl font-bold text-red-600 cursor-pointer"
              onClick={() => {
                dispatch(deleteProduct(cellValues.id));
              }}
            />
          </div>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  const rows = [];
  const { products, error, loading } = useSelector((state) => state.products);
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
      });
    });

  const [toggleEdit, setToggleEdit] = useState("close");

  const {
    loading: delLoading,
    error: delError,
    message,
  } = useSelector((state) => state.deleteProduct);
  useEffect(() => {
    dispatch(getAdminProducts());
    if (message) {
      setTimeout(() => {
        dispatch(messReset());
      }, 5000);
    }
  }, [dispatch, message]);
  useEffect(() => {
    dispatch(clearError());
  }, [error]);

  return (
    <>
      {loading || delLoading ? (
        <Loader />
      ) : (
        <div className="flex h-fit">
          <Sidebar className="w-1/3" />
          <div className="w-full  h-fit">
            <h1 className="text-3xl text-gray-700 font-bold text-center mt-[2vmax]">
              Admin Products
            </h1>
            <DataGrid
              rows={rows}
              columns={col}
              className="w-4/5  mx-auto my-[4vmax]"
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
      {error && <ErrorAlert message={error} alert={true} />}
      {delError && <ErrorAlert message={delError} alert={true} />}
      {message && <ErrorAlert message={message} alert={false} />}
    </>
  );
};

export default AdminProducts;
