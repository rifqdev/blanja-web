import React, { useState } from "react";
import logo from "../../../asset/icon/logo.svg";
import Button from "../../../components/base/button";
import Input from "../../../components/base/input/Input";
import eye1 from "../../../asset/icon/eye1.svg";
import eye2 from "../../../asset/icon/eye2.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loginCustomer,
  loginSeller,
} from "../../../config/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      setLoading(true);
      if (active) {
        dispatch(loginCustomer({ values, navigate, toast, setLoading }));
      } else {
        dispatch(loginSeller({ values, navigate, toast, setLoading }));
      }
      handleReset();
    },
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <ToastContainer autoClose={3000} />
      <div className="w-10/12 max-w-md">
        <img src={logo} alt="logo" className="block mx-auto" />
        <p className="text-center mt-3">Please login with your account</p>
        <div className="mt-5 flex justify-center w-auto">
          <div>
            <Button
              name="Custommer"
              className={
                active
                  ? "border p-3 bg-[#DB3022] text-white"
                  : "border p-3  text-[#9B9B9B]"
              }
              onClick={() => setActive(true)}
            />
            <Button
              name="Seller"
              className={
                active
                  ? "border p-3  text-[#9B9B9B]"
                  : "border p-3 bg-[#DB3022] text-white"
              }
              onClick={() => setActive(false)}
            />
          </div>
        </div>
        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Email"
              className="border w-full p-3 rounded-md focus:outline-none"
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
            <p className="mt-5 text-end">Forgot password?</p>
            {loading ? (
              <button
                className="bg-[#DB3022] p-3 w-full text-white mt-5 rounded-full hover:bg-[#f43928] flex justify-center items-center gap-2"
                disabled
              >
                login
                <div class="h-5 w-5 border-2 rounded-full border-l-0 border-b-0 animate-spin"></div>
              </button>
            ) : (
              <Button
                name="Login"
                type="submit"
                className="bg-[#DB3022] p-3 w-full text-white mt-5 rounded-full hover:bg-[#f43928] transition-all"
              />
            )}
          </form>
          <p className="mt-10 text-center">
            Dont't have Blanja account?{" "}
            <Link
              to="/register"
              className="text-red-500 hover:text-red-600 hover:underline transition-all"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
