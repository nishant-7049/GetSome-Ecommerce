import React, { useState } from "react";
import { BsKey, BsKeyFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/slices/profileSlice";
import ErrorAlert from "./ErrorAlert";
import Loader from "./Loader";

const UpdatePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const submitPasswords = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const passwords = {
        oldPassword: currPassword,
        newPassword: newPassword,
        confirmPassword,
      };
      dispatch(updatePassword(passwords));
    }
  };

  const { loading, error } = useSelector((state) => state.profile);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-[100%] min-h-[100vh] flex justify-center items-center bg-[#F0F0F0]">
            <form
              onSubmit={submitPasswords}
              className="w-[30vmax]  flex flex-col border-2 shadow-lg bg-white sm:w-[40vmax] p-[3vmax] gap-8"
            >
              <h1 className="text-xl text-gray-400 font-semibold text-center border-b-2 pb-4">
                Update Password
              </h1>
              <div className="flex gap-4 items-center text-lg  border-2 border-gray-200  px-[1.5vmax]">
                <BsKey />
                <input
                  type="password"
                  required
                  className="w-full py-[1vmax]"
                  placeholder="Current Password"
                  onChange={(e) => setCurrPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-4 items-center text-lg  border-2 border-gray-200  px-[1.5vmax]">
                <BsKeyFill />
                <input
                  type="password"
                  required
                  className="w-full py-[1vmax]"
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-4 items-center text-lg  border-2 border-gray-200  px-[1.5vmax]">
                <GiConfirmed />
                <input
                  type="password"
                  required
                  className="w-full py-[1vmax]"
                  placeholder="Confirm New Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Change Password"
                className="py-[1vmax] bg-[#F45050]  text-white cursor-pointer"
              />
            </form>
          </div>
          {error ? (
            <ErrorAlert message={error} alert={true} />
          ) : (
            <ErrorAlert
              message="Password Changed Successfully."
              alert={false}
            />
          )}
        </>
      )}
    </>
  );
};

export default UpdatePassword;
