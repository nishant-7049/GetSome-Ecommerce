import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { addItemToCart, removeFromCart } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const incrementOrder = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock < newQuantity) {
      return;
    }
    const object = {
      id,
      quantity: newQuantity,
    };
    dispatch(addItemToCart(object));
  };
  const decrementOrder = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (0 == newQuantity) {
      return;
    }
    const object = {
      id,
      quantity: newQuantity,
    };
    dispatch(addItemToCart(object));
  };

  const { cartItems } = useSelector((state) => state.cart);
  const removeOrder = () => {
    const id = item.product;
    dispatch(removeFromCart(id));
    if (cartItems.length == 1) {
      localStorage.setItem("cartItems", undefined);
    }
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, dispatch]);

  return (
    <div className="flex w-full mx-auto  items-center p-[1vmax]">
      <div className="flex items-center w-1/2">
        <img src={item.image} alt="product Image" className="w-1/2" />
        <div className="">
          <Link
            to={`/product/${item.product}`}
            className="text-lg text-[#F45050] font-semibold hover:cursor-pointer sm:text-sm"
          >
            {item.name}
          </Link>
          <p className="sm:text-xs">{`₹ ${item.price}`}</p>
          <button className="text-red-600 sm:text-xs " onClick={removeOrder}>
            Remove
          </button>
        </div>
      </div>
      <div className="flex h-[3vmax] w-1/4 justify-end items-center text-sm">
        <button
          className="p-[1vmax] bg-gray-400  text-white"
          onClick={() => {
            decrementOrder(item.product, item.quantity);
          }}
        >
          -
        </button>

        <input
          type="number"
          className=" w-[4rem] text-center p-[1vmax] sm:w-6 sm:p-0"
          value={item.quantity}
          readOnly
        />
        <button
          className="p-[1vmax] bg-gray-400 text-white"
          onClick={() => {
            incrementOrder(item.product, item.quantity, item.stock);
          }}
        >
          +
        </button>
      </div>
      <p className="text-right w-1/4 text-[#F45050] font-semibold text-xl sm:text-sm">{`₹ ${
        item.price * item.quantity
      }`}</p>
    </div>
  );
};

export default CartItemCard;
