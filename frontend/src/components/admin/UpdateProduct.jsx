import React, { useState } from "react";
import MetaData from "../MetaData";
import Sidebar from "./Sidebar";
import { MdDescription } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../ErrorAlert";
import Loader from "../Loader";
import { useEffect } from "react";
import { updateProduct, clearError } from "../../store/slices/updateProduct";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  clearError as clear,
} from "../../store/slices/productDetailsSlice";

const UpdateProduct = () => {
  const { id } = useParams();
  let img = [];
  const {
    product: pro,
    error: err,
    loading: load,
  } = useSelector((state) => state.productDetails);

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
  const { loading, error, product } = useSelector(
    (state) => state.updateProduct
  );

  const [name, setName] = useState(pro.name);
  const [price, setPrice] = useState(pro.price);
  const [description, setDescription] = useState(pro.description);
  const [stock, setStock] = useState(pro.stock);
  const [category, setCategory] = useState(pro.category);
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
    if (name) {
      myForm.set("name", name);
    }
    if (price) {
      myForm.set("price", price);
    }
    if (description) {
      myForm.set("description", description);
    }
    if (stock) {
      myForm.set("stock", stock);
    }
    if (category) {
      myForm.set("category", category);
    }
    if (images) {
      images.forEach((image) => {
        myForm.append("images", image);
      });
    }
    const Data = {
      id: id,
      productData: myForm,
    };
    dispatch(updateProduct(Data));
  };
  useEffect(() => {
    if (pro && pro._id !== id) {
      dispatch(getProductDetails(id));
    }
    if (err) {
      dispatch(clear());
    }
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch, err]);
  return (
    <>
      {loading && load ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"UpdateProduct -- GetSome"} />
          <div className="flex sm:flex-col">
            <Sidebar className="w-1/3" />
            <div className="w-full flex flex-col items-center">
              <h1 className="text-3xl font-bold border-b-4 w-1/3 text-center border-black mx-auto pb-2 mt-[5vmax] ">
                Update Product
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
                    value={name}
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
                    type="number"
                    name="productPrice"
                    value={price}
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
                    name="description"
                    value={description}
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
                    name="category"
                    value={category}
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
                    type="number"
                    value={stock}
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

export default UpdateProduct;
