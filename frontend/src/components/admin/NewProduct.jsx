import React, { useState } from "react";
import MetaData from "../MetaData";
import Sidebar from "./Sidebar";
import { MdDescription } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  clearError,
  productReset,
} from "../../store/slices/NewProduct";
import ErrorAlert from "../ErrorAlert";
import Loader from "../Loader";
import { useEffect } from "react";

const NewProduct = () => {
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone",
    "Sports",
  ];
  const { loading, error, product } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("");
  const [images, setImages] = useState();
  const [imagesPreview, setImagesPreview] = useState();
  const imageDataChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("stock", stock);
    myForm.set("category", category);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };
  useEffect(() => {
    if (product) {
      setTimeout(() => {
        dispatch(productReset());
      }, 5000);
    }
  }, [product]);
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"newProduct -- GetSome"} />
          <div className="flex sm:flex-col">
            <Sidebar className="w-1/3" />
            <div className="w-full flex flex-col items-center">
              <h1 className="text-3xl font-bold border-b-4 w-1/3 text-center border-black mx-auto pb-2 mt-[5vmax] ">
                Create Product
              </h1>
              <form
                onSubmit={submitHandler}
                className="bg-white w-1/3 flex flex-col gap-4 p-[3vmax] lg:w-1/2 sm:w-[90%] sm:mx-auto sm:mb-20"
              >
                <div className="flex gap-4 items-center">
                  <MdDriveFileRenameOutline className="text-3xl" />
                  <input
                    className="border-2 p-[0.7vmax] w-full"
                    required
                    type="text"
                    name="productName"
                    placeholder="Enter Product Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <IoIosPricetag className="text-3xl" />
                  <input
                    className="border-2 p-[0.7vmax] w-full"
                    required
                    type="number"
                    name="productPrice"
                    placeholder="Enter Product Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <MdDescription className="text-3xl" />
                  <textarea
                    className="border-2 p-[0.7vmax] w-full"
                    required
                    name="description"
                    placeholder="Enter Product Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <BiCategory className="text-3xl" />
                  <select
                    className="border-2 p-[0.7vmax] w-full"
                    required
                    name="category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option>Select Category</option>
                    {categories.map((cat, index) => {
                      return (
                        <option value={cat} key={index}>
                          {cat}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex gap-4 items-center">
                  <AiOutlineStock className="text-3xl" />
                  <input
                    className="border-2 p-[0.7vmax] w-full"
                    required
                    type="number"
                    placeholder="Enter Stock Number"
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                  />
                </div>
                <div className="">
                  <div className="flex overflow-x-auto">
                    {imagesPreview &&
                      imagesPreview.map((img, index) => {
                        return (
                          <img
                            key={index}
                            className="w-1/4 mr-2"
                            src={img}
                            alt="select image"
                          />
                        );
                      })}
                  </div>
                  <input
                    className="border-2 p-[0.7vmax] w-full"
                    type="file"
                    accept="image/*"
                    onChange={imageDataChange}
                    multiple
                  />
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
      {product && (
        <ErrorAlert message={"Product created successfully."} alert={false} />
      )}
    </>
  );
};

export default NewProduct;
