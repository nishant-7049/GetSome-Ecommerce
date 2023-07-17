import React, { useState, useEffect } from "react";
import { forgotPassword, clearError } from "../store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "./ErrorAlert";
import { AiOutlineMail } from "react-icons/ai";
import Loader from "./Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const submitEmail = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-[100%] min-h-[100vh] flex justify-center items-center bg-[#F0F0F0]">
            <form
              onSubmit={submitEmail}
              className="w-[30vmax]  flex flex-col border-2 shadow-lg bg-white sm:w-[40vmax] p-[3vmax] gap-8"
            >
              <h1 className="text-xl text-gray-400 font-semibold text-center border-b-2 pb-4">
                Forgot Password
              </h1>
              <div className="flex gap-4 items-center text-lg  border-2 border-gray-200  px-[1.5vmax]">
                <AiOutlineMail />
                <input
                  type="text"
                  required
                  className="w-full py-[1vmax]"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Send Mail"
                className="py-[1vmax] bg-[#F45050]  text-white cursor-pointer"
              />
            </form>
          </div>
          {error ? <ErrorAlert message={error} alert={true} /> : ""}
          {message ? <ErrorAlert message={message} alert={false} /> : ""}
        </>
      )}
    </>
  );
};

export default ForgotPassword;
