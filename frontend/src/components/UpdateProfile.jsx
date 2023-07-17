import React, { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  resetUpdate,
  clearError,
} from "../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { loadUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/user.png");
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const updateProfileSubmit = () => {
    const fd = new FormData();
    fd.set("name", name);
    fd.set("email", email);
    fd.set("avatar", avatar);
    dispatch(updateProfile(fd));
    dispatch(clearError());
  };

  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch(resetUpdate());
      navigate("/account");
    }
    dispatch(resetUpdate);
  }, [dispatch, isUpdated, user]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="h-[100vh] w-[100%] flex items-center justify-center bg-[#F0F0F0]">
            <form
              onSubmit={updateProfileSubmit}
              className="w-[30vmax]  flex flex-col p-[5vmax] gap-8 border-2 shadow-lg bg-white sm:w-[40vmax] "
            >
              <h1 className="text-center text-xl font-semibold text-gray-400 border-b-2 border-gray-400 pb-4">
                Update Profile
              </h1>
              <div className="flex gap-4 items-center text-lg  border-2 border-gray-200  px-[1.5vmax] ">
                <AiOutlineUser />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  className="px-[1.5vmax] py-[1vmax] w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-4 items-center text-lg  border-2 border-gray-200  px-[1.5vmax] ">
                <AiOutlineMail />
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="px-[1.5vmax] py-[1vmax] w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-8">
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-[20%] rounded-full"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="border-2 border-gray-400 bg-gray-400 text-white"
                  onChange={(e) => updateProfileDataChange(e)}
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Update"
                  className="py-[1vmax] bg-[#F45050] w-full  text-white cursor-pointer"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
