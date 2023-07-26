import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MetaData from "../MetaData";
import { DataGrid } from "@mui/x-data-grid";
import {
  getAllUsers,
  deleteUser,
  clearError,
  deleteReset,
} from "../../store/slices/allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import Loader from "../Loader";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, error, users, isDeleted } = useSelector(
    (state) => state.allUsers
  );
  const cols = [
    { field: "id", headerName: "User Id", minWidth: 150, flex: 0.8 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.3 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 0.8 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
          <div>
            {cellValues.row.role == "admin" ? (
              <p className="text-green-500">{cellValues.row.role}</p>
            ) : (
              <p className="text-red-700">{cellValues.row.role}</p>
            )}
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.5,
      type: "number",
      renderCell: (cellValues) => {
        return (
          <div className="flex gap-2">
            <Link to={`/admin/user/edit/${cellValues.id}`}>
              <BiEdit className="text-xl font-bold text-blue-400 cursor-pointer" />
            </Link>
            <RiDeleteBin6Line
              className="text-xl font-bold text-red-600 cursor-pointer"
              onClick={() => {
                dispatch(deleteUser(cellValues.id));
              }}
            />
          </div>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.push({
        name: user.name,
        id: user._id,
        role: user.role,
        email: user.email,
      });
    });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => {
        dispatch(deleteReset());
      }, 5000);
    }
  }, [isDeleted]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <MetaData title={"All Users -- GetSome"} />
          <Sidebar className="w-1/3" />
          <div className="w-full">
            <h1 className="text-3xl my-[3vmax] text-center font-bold">
              All Users
            </h1>
            <div className="w-4/5 mx-auto">
              <DataGrid
                rows={rows}
                columns={cols}
                autoheight
                isRowSelectable={false}
              />
            </div>
          </div>
        </div>
      )}
      {isDeleted && (
        <ErrorAlert message={"User deleted Successfully"} alert={false} />
      )}
    </>
  );
};

export default AllUsers;
