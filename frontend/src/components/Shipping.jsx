import React, { useState } from "react";
import { AiFillHome, AiFillPhone } from "react-icons/ai";
import { FaCity, FaMapPin } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { MdOutlineTransferWithinAStation } from "react-icons/md";
import { Country, State } from "country-state-city";
import CheckOutSteps from "./CheckOutSteps";
import MetaData from "./MetaData";
import { useDispatch } from "react-redux";
import ErrorAlert from "./ErrorAlert";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../store/slices/cartSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPin] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [alert, setAlert] = useState();

  const submitShipping = (e) => {
    e.preventDefault();
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      setAlert("Phone Number should be of 10 numbers.");
      return;
    }
    const options = { address, city, pincode, phoneNo, country, state };
    dispatch(saveShippingInfo(options));
    navigate("/shipping/confirm");
  };
  return (
    <>
      <MetaData title="Shipping steps -- GetSome" />
      <CheckOutSteps activeStep={0} />
      {alert && <ErrorAlert message={alert} alert={true} />}
      <div className="w-full h-[100vh]  flex justify-center mt-[3vmax]">
        <form
          onSubmit={submitShipping}
          className="flex flex-col gap-8 sm:w-4/5"
        >
          <h1 className="text-2xl font-bold text-gray-600 border-b-4 border-gray-600 pb-4 text-center">
            Shipping Details
          </h1>
          <div className="flex gap-[1vmax] items-center ">
            <AiFillHome className="text-2xl" />
            <input
              type="text"
              required
              name="address"
              placeholder="Enter your address"
              value={address}
              className="px-[1vmax] py-[0.6vmax] w-full"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-[1vmax] items-center">
            <FaCity className="text-2xl" />
            <input
              type="text"
              name="city"
              placeholder="Enter your City"
              required
              value={city}
              className="px-[1vmax] py-[0.6vmax] w-full"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex gap-[1vmax] items-center">
            <FaMapPin className="text-2xl" />
            <input
              type="number"
              required
              placeholder="Enter your PIN"
              name="pin"
              value={pincode}
              className="px-[1vmax] py-[0.6vmax] w-full"
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="flex gap-[1vmax] items-center">
            <AiFillPhone className="text-2xl" />
            <input
              type="number"
              name="phone"
              placeholder="Enter your Phone Number"
              required
              value={phoneNo}
              className="px-[1vmax] py-[0.6vmax] w-full"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex gap-[1vmax] items-center">
            <GiWorld className="text-2xl" />
            <select
              name="country"
              required
              value={country}
              className="px-[1.5vmax] py-[1vmax] w-full"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Set Country</option>
              {Country.getAllCountries().map((c) => (
                <option value={c.isoCode} key={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {country && (
            <div className="flex gap-[1vmax] items-center">
              <MdOutlineTransferWithinAStation className="text-2xl" />
              <select
                name="state"
                required
                value={state}
                className="px-[1.5vmax] py-[1vmax] w-full"
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Set State</option>
                {State.getStatesOfCountry(country).map((s) => (
                  <option value={s.isoCode} key={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <input
            type="submit"
            value="Continue"
            className="px-[1.5vmax] py-[1vmax] text-white bg-[#F45050] w-3/5 mx-auto cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default Shipping;
