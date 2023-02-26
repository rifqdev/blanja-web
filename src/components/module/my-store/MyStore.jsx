import React, { useState } from "react";
import img from "../../../asset/img/img.jpeg";
import Button from "../../base/button";
import Input from "../../base/input/Input";

const MyStore = ({
  values,
  handleChange,
  handleSubmit,
  setPhoto,
  imgProfile,
  loading,
}) => {
  const [prevImg, setPrevImg] = useState(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPrevImg(reader.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div
      className="bg-white w-10/12 mx-auto border border-black rounded-md shadow-lg"
      data-aos="fade-left"
    >
      <div className="p-5">
        <h1 className="text-2xl font-medium">My profile store</h1>
        <p className="text-sm text-slate-500 mt-2">
          Manage your profile information
        </p>
      </div>
      <hr className="w-11/12 mx-auto border-t-2" />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 p-5">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-10 items-center">
              <label htmlFor="nama" className="text-slate-500 ml-auto">
                Store name
              </label>
              <Input
                type="text"
                id="nama"
                className="border p-3 rounded-md focus:outline-none w-8/12 ml-auto shadow-md"
                placeholder="Name"
                name="storeName"
                values={values.storeName}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-10 items-center mt-5">
              <label htmlFor="email" className=" text-slate-500 ml-auto">
                Email
              </label>
              <Input
                type="email"
                id="email"
                className="border p-3 rounded-md focus:outline-none w-8/12 ml-auto shadow-md"
                placeholder="Email"
                name="email"
                values={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-10 items-center mt-5 ">
              <label htmlFor="phone" className=" text-slate-500">
                Phone Number
              </label>
              <Input
                type="text"
                id="phone"
                className="border p-3 rounded-md focus:outline-none w-8/12 ml-auto shadow-md"
                placeholder="Phone Number"
                name="phoneNumber"
                values={values.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-10 mt-5">
              <label htmlFor="phone" className=" text-slate-500 ">
                Store description
              </label>
              <textarea
                cols="27"
                rows="4"
                className="border focus:outline-none shadow-md p-3"
                name="storeDescription"
                value={values.storeDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            {loading ? (
              <button className="bg-red-500 text-white px-8 py-2  mt-10 lg:ml-0 mb-5 rounded-full hover:bg-red-600 transition-all block ml-auto flex justify-center items-center gap-2">
                Save
                <div class="h-5 w-5 border-2 rounded-full border-l-0 border-b-0 animate-spin"></div>
              </button>
            ) : (
              <Button
                name="Save"
                type="submit"
                className="bg-red-500 text-white px-8 py-2  mt-10 lg:ml-0 mb-5 rounded-full hover:bg-red-600 transition-all block ml-auto"
              />
            )}
            {/* <Button
              name="Save"
              type="submit"
              className="bg-red-500 text-white px-8 py-2 ml-40 mt-10 rounded-full hover:bg-red-600 transition-all"
            /> */}
          </form>
        </div>
        <div>
          <div className="border-l-2">
            <img
              src={prevImg ? prevImg : imgProfile || img}
              alt="profil"
              className="w-24 h-24 rounded-full mx-auto mt-7 object-cover"
            />
            <input
              type="file"
              className="hidden"
              id="photos"
              onChange={handlePhoto}
            />
            <label
              htmlFor="photos"
              className="py-2 border-2 block mx-auto rounded-full mt-5 w-8/12 text-center hover:bg-slate-200 transition-all cursor-pointer"
            >
              Select image
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStore;
