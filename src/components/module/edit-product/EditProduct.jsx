import React, { Fragment, useEffect, useState } from "react";
import Input from "../../base/input/Input";
import Button from "../../base/button";
import OtherPhoto from "../../base/other-photo/OtherPhoto";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import {
  addProduct,
  editProduct,
  getProductById,
} from "../../../config/features/product/productSlice";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../navbar/Navbar";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [photo, setPhoto] = useState([]);
  const { id } = useParams();

  const { item } = useSelector((state) => state.product);

  const photoRes = [
    item[0]?.photo0,
    item[0]?.photo1,
    item[0]?.photo2,
    item[0]?.photo3,
    item[0]?.photo4,
    item[0]?.photo5,
  ];
  let imgThumnail = [];
  for (let i = 0; i < photoRes.length; i++) {
    if (photoRes[i]) {
      const imgLink = photoRes[i].split(",");
      imgThumnail.push(imgLink[1]);
    }
  }
  // console.log(previews);
  useEffect(() => {
    dispatch(getProductById({ id, setLoading }));
    setPreviews(imgThumnail);
    setPhoto(imgThumnail);
  }, []);

  const handlePhoto = (e) => {
    const files = e.target.files;
    const photos = [];
    const newPreviews = [];

    for (let i = 0; i < 5; i++) {
      const file = files[i];
      photos.push(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
        }
      };

      reader.readAsDataURL(file);
    }
    setPhoto(photos);
  };

  const handleRemove = (index) => {
    setPreviews((prevPreviews) => {
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const { items } = useSelector((state) => state.categories);

  const moveImageToFirst = (index) => {
    if (index !== 0) {
      const itemToMove = previews[index];
      previews.splice(index, 1);
      previews.unshift(itemToMove);
      setPreviews([...previews]);
      const indexPhoto = photo[index];
      photo.splice(index, 1);
      photo.unshift(indexPhoto);
      setPhoto([...photo]);
    }
  };

  const formData = new FormData();

  const [data, setData] = useState({
    name: item[0]?.name,
    price: item[0]?.price,
    stock: item[0]?.stock,
    color: "",
    size: "",
    condition: item[0]?.condition,
    description: item[0]?.description,
    categoryId: item[0]?.categoryid,
  });
  const [description, setDescription] = useState(data.description);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (value) => {
    setDescription(value);
  };

  const dirty = description;
  const clean = DOMPurify.sanitize(dirty);

  const handleSubmit = () => {
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("color", data.color);
    formData.append("size", data.size);
    formData.append("condition", data.condition);
    formData.append("description", clean);
    formData.append("sellerId", id);
    formData.append("categoryId", data.categoryId);
    photo.map((item) => {
      formData.append("photo", item);
    });
    setLoading(true);
    dispatch(editProduct({ id, setLoading, toast, formData }));
    setData({
      name: "",
      price: "",
      stock: "",
      color: "",
      size: "",
      condition: "",
      description: "",
      categoryId: "",
    });
    setDescription("");
    setPhoto(null);

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };

  return (
    <>
      <Navbar />
      <div
        className="w-full flex flex-col gap-5 mt-32 mb-20 lg:w-1/2"
        data-aos="fade-left"
      >
        <ToastContainer autoClose={3000} />
        <div className="bg-white w-10/12 mx-auto border  rounded-md shadow-lg">
          <h1 className="mt-5 ml-5 text-2xl font-medium">Inventory</h1>
          <hr className="my-5 border-t-2" />
          <div className=" flex gap-10 mx-5 mb-5">
            <div className="flex flex-col gap-5 grow">
              <label>Name of goods</label>

              <Input
                type="text"
                className="border p-2 rounded-md focus:outline-none w-full lg:w-1/2"
                name="name"
                values={data.name}
                onChange={handleChange}
              />
              <div>
                <select
                  name="categoryId"
                  values={data.categoryId}
                  onChange={handleChange}
                >
                  {items.map((item, index) => {
                    if (item.id === data.categoryId) {
                      return (
                        <div key={index}>
                          <option>{item.name}</option>
                        </div>
                      );
                    }
                  })}
                  {items.map((item, index) => (
                    <Fragment key={index}>
                      <option value={item.id}>{item.name}</option>
                    </Fragment>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white w-10/12 mx-auto border  rounded-md shadow-lg">
          <h1 className="mt-5 ml-5 text-2xl font-medium">Item details</h1>
          <hr className="my-5 border-t-2" />
          <div className="flex flex-col gap-5 mx-5 mb-5">
            <label>Unit price</label>
            <Input
              type="number"
              className="border p-2 rounded-md focus:outline-none w-full lg:w-1/2"
              name="price"
              values={data.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-5 ml-5 mb-5">
            <label>Stock</label>
            <div className="relative">
              <Input
                type="number"
                className="border p-2 rounded-md focus:outline-none w-1/2 pr-16"
                name="stock"
                values={data.stock}
                onChange={handleChange}
              />
              <p className="text-slate-500 absolute right-[16rem] top-[9px] lg:right-[25rem]">
                Buah
              </p>
            </div>
          </div>
          <div className="ml-5 mb-5">
            <p>Condition</p>
            <div className="flex mt-1 gap-5">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="condition"
                  id="new"
                  value="new"
                  checked={data.condition === "new"}
                  onChange={handleChange}
                />
                <label htmlFor="new">New</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="condition"
                  id="second"
                  value="second"
                  checked={data.condition === "second"}
                  onChange={handleChange}
                />
                <label htmlFor="second">Second</label>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white w-10/12 mx-auto border  rounded-md shadow-lg"
          data-aos="fade-up"
        >
          <h1 className="mt-5 ml-5 text-2xl font-medium">Photo of goods</h1>
          <hr className="my-5 border-t-2" />
          <div>
            <div
              className="w-11/12 mx-auto gap-3 border-dashed rounded-lg p-5
       mb-5 border-2 border-gray-300 flex items-center "
            >
              {previews?.map((item, index) => (
                <Fragment key={index}>
                  <OtherPhoto
                    item={item}
                    handleChange={handlePhoto}
                    handleRemove={handleRemove}
                    index={index}
                    onClick={() => moveImageToFirst(index)}
                  />
                </Fragment>
              ))}

              <input
                type="file"
                name="photo"
                multiple
                onChange={handlePhoto}
                id="multiple"
                className="hidden"
              />
              {previews.length === 5 ? (
                ""
              ) : (
                <label
                  htmlFor="multiple"
                  className="bg-gray-200 rounded-lg w-20 h-20 flex justify-center items-center cursor-pointer"
                >
                  <p className="text-xs text-center">add max 5 photo</p>
                </label>
              )}
            </div>
            <hr className="w-11/12 mx-auto mt-3 border-t-2" />
          </div>
        </div>

        <div
          className="bg-white w-10/12 h-[30rem] mx-auto border  rounded-md shadow-lg"
          data-aos="fade-up"
        >
          <h1 className="mt-5 ml-5 text-2xl font-medium">Description</h1>
          <hr className="mt-5 mb-10 border-t-2" />
          <div className="w-11/12 mx-auto mb-5">
            <ReactQuill
              className="h-64"
              value={description}
              onChange={handleEditorChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <>
              <button
                className="bg-red-400 w-40 rounded-full py-2 text-white font-medium flex gap-3 justify-center items-center mr-12"
                disabled
              >
                Save{" "}
                <div class="h-5 w-5 border-2 rounded-full border-l-0 border-b-0 animate-spin"></div>
              </button>
            </>
          ) : (
            <Button
              name="Save"
              className="bg-red-500 w-40 rounded-full py-2 text-white font-medium hover:bg-red-600 transition-all mr-12"
              onClick={handleSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
