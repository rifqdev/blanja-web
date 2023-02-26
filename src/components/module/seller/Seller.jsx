import React from "react";
import Input from "../../base/input/Input";
import eye1 from "../../../asset/icon/eye1.svg";
import eye2 from "../../../asset/icon/eye2.svg";

const Seller = ({ showPassword, handleShowPassword, handleChange, values }) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Name"
        className="border w-full p-3 rounded-md focus:outline-none"
        values={values.name}
        name="name"
        onChange={handleChange}
      />
      <Input
        type="email"
        placeholder="Email"
        className="mt-3 border w-full p-3 rounded-md focus:outline-none"
        values={values.email}
        name="email"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Phone number"
        className="mt-3 border w-full p-3 rounded-md focus:outline-none"
        values={values.phoneNumber}
        name="phoneNumber"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Store name"
        className="mt-3 border w-full p-3 rounded-md focus:outline-none"
        values={values.storeName}
        name="storeName"
        onChange={handleChange}
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="mt-3 border w-full p-3 rounded-md focus:outline-none"
          values={values.password}
          name="password"
          onChange={handleChange}
        />
        <img
          src={showPassword ? eye1 : eye2}
          alt="eyeicon1"
          width="22"
          className="absolute right-4 top-7 cursor-pointer"
          onClick={handleShowPassword}
        />
      </div>
    </>
  );
};

export default Seller;
