import React from "react";
import Input from "../../base/input/Input";
import eye1 from "../../../asset/icon/eye1.svg";
import eye2 from "../../../asset/icon/eye2.svg";

const Custommer = ({
  showPassword,
  handleShowPassword,
  handleChange,
  values,
}) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Name"
        className="border w-full p-3 rounded-md focus:outline-none"
        name="name"
        values={values.name}
        onChange={handleChange}
      />
      <Input
        type="email"
        placeholder="Email"
        className="mt-3 border w-full p-3 rounded-md focus:outline-none"
        name="email"
        values={values.email}
        onChange={handleChange}
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="mt-3 border w-full p-3 rounded-md focus:outline-none"
          name="password"
          values={values.password}
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

export default Custommer;
