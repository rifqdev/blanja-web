import React, { useState } from "react";
import logo from "../../../asset/icon/logo.svg";
import Button from "../../../components/base/button";
import Custommer from "../../../components/module/custommer/Custommer";
import Seller from "../../../components/module/seller/Seller";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  registerCustomer,
  registerSeller,
} from "../../../config/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
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
      name: "",
      email: "",
      phoneNumber: "",
      storeName: "",
      password: "",
    },
    onSubmit: () => {
      const customer = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      setLoading(true);
      if (active) {
        dispatch(registerCustomer({ customer, navigate, toast, setLoading }));
      } else {
        dispatch(registerSeller({ values, navigate, toast, setLoading }));
      }
      handleReset();
    },
  });

  return (
    <div className="h-screen flex justify-center items-center my-10">
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
            {active ? (
              <Custommer
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                values={values}
                handleChange={handleChange}
              />
            ) : (
              <Seller
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                values={values}
                handleChange={handleChange}
              />
            )}
            <p className="mt-5 text-end">Forgot password?</p>
            {loading ? (
              <button
                className="bg-[#DB3022] p-3 w-full text-white mt-5 rounded-full hover:bg-[#f43928] flex justify-center items-center gap-2"
                disabled
              >
                Register
                <div class="h-5 w-5 border-2 rounded-full border-l-0 border-b-0 animate-spin"></div>
              </button>
            ) : (
              <Button
                name="Register"
                type="submit"
                className="bg-[#DB3022] p-3 w-full text-white mt-5 rounded-full hover:bg-[#f43928] transition-all"
              />
            )}
          </form>
          <p className="mt-10 text-center">
            Already have Blanja account?{" "}
            <Link
              to="/login"
              className="text-red-500 hover:text-red-600 hover:underline transition-all"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
