import React, { useState } from "react";
import MetaData from "../MetaData";
import Sidebar from "./Sidebar";
import { IoIosPricetag } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../ErrorAlert";
import Loader from "../Loader";
import { useEffect } from "react";
import {
  getUser,
  updateReset,
  updateUser,
  clearError,
} from "../../store/slices/allUsersSlice";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const { loading, error, user, isUpdated } = useSelector(
    (state) => state.allUsers
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    const options = { id, myForm };
    dispatch(updateUser(options));
  };
  useEffect(() => {
    dispatch(getUser(id));
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (isUpdated) {
      setTimeout(() => {
        dispatch(updateReset());
      }, 5000);
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, isUpdated, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"UpdateUser -- GetSome"} />
          <div className="flex sm:flex-col">
            <Sidebar className="w-1/3" />
            <div className="w-full flex flex-col items-center">
              <h1 className="text-3xl font-bold border-b-4 w-1/3 text-center border-black mx-auto pb-2 mt-[5vmax] ">
                Update User
              </h1>
              <form
                onSubmit={submitHandler}
                className="bg-white w-1/3 flex flex-col gap-4 p-[3vmax] lg:w-1/2 sm:w-[90%] sm:mx-auto sm:mb-20"
              >
                <div className="flex gap-4 items-center">
                  <MdDriveFileRenameOutline className="text-3xl" />
                  <input
                    className="border-2 p-[0.7vmax] w-full"
                    type="text"
                    name="Name"
                    value={name}
                    placeholder="Enter User's Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <IoIosPricetag className="text-3xl" />
                  <input
                    className="border-2 p-[0.7vmax] w-full"
                    name="email"
                    value={email}
                    placeholder="Enter User's Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="flex gap-4 items-center">
                  <BiCategory className="text-3xl" />
                  <select
                    className="border-2 p-[0.7vmax] w-full"
                    required
                    name="role"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option>Select Category</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </div>

                <input
                  type="submit"
                  value="Post Product"
                  className="px-[1.5vmax] py-[1vmax] bg-[#F45050] text-white font-semibold border-2 border-[#F45050] hover:text-[#F45050] hover:bg-white cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      )}
      {error && <ErrorAlert message={error} alert={true} />}
      {isUpdated && (
        <ErrorAlert message={"User Updated successfully."} alert={false} />
      )}
    </>
  );
};

export default UpdateUser;
