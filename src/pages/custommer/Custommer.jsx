import React, { useState, useEffect } from "react";
import Button from "../../components/base/button";
import MyAccount from "../../components/module/my-account/MyAccount";
import MyAddress from "../../components/module/my-address/MyAddress";
import MyOrder from "../../components/module/my-order/MyOrder";
import img from "../../asset/icon/default-profile.svg";
import imyaccount from "../../asset/icon/my-account.png";
import imaps from "../../asset/icon/maps.png";
import imyorder from "../../asset/icon/my-order.png";
import Navbar from "../../components/module/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  editCustomer,
  getCustomer,
} from "../../config/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { getOrder } from "../../config/features/order/orderSlice";

const Custommer = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1");
  let myBirth;
  const { customer } = useSelector((state) => state.auth);
  myBirth = customer[0]?.birth?.split(" ");
  const [birt, setBirth] = useState({
    day: myBirth ? myBirth[0] : "",
    month: myBirth ? myBirth[1] : "",
    year: myBirth ? myBirth[2] : "",
  });

  // console.log(myBirth[0]);

  const handleBirth = (e) => {
    setBirth({
      ...birt,
      [e.target.name]: e.target.value,
    });
  };
  const newBirth = `${birt.day} ${birt.month} ${birt.year}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCustomer(id));
    dispatch(getOrder(id));
  }, [id, loading, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const formData = new FormData();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: customer[0].name,
      email: customer[0].email,
      phoneNumber: customer[0].phonenumber,
      gender: customer[0].gender,
      birth: customer[0].birth,
    },
    onSubmit: () => {
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("gender", values.gender);
      formData.append("birth", newBirth);
      formData.append("photo", photo);
      setLoading(true);
      dispatch(editCustomer({ id, formData, setLoading, toast }));
    },
  });
  let imgProfile;
  if (customer.length !== 0) {
    const imgLink = customer[0]?.photo?.split(",");
    if (imgLink) {
      imgProfile = imgLink[imgLink?.length - 1];
    }
  }
  return (
    <>
      <Navbar />
      <ToastContainer autoClose={3000} />
      <div className="lg:grid grid-cols-4">
        <div className="mt-32">
          <div className="w-9/12 ml-5 lg:ml-auto">
            <div className="flex gap-3 items-center">
              <img
                src={imgProfile ? imgProfile : img}
                alt="profile-icon"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-medium">{customer[0].name}</p>
              </div>
            </div>

            <div className="mt-12 flex lg:flex-col gap-5 text-xl text-slate-500 overflow-auto flex-wrap mb-10">
              <div
                className={
                  activeTab === "tab1"
                    ? "flex gap-3 cursor-pointer text-black"
                    : "flex gap-3 cursor-pointer"
                }
                onClick={() => setActiveTab("tab1")}
              >
                <img
                  src={imyaccount}
                  alt="my-account-icon"
                  className="w-8 h-8 "
                />

                <p className="hidden sm:block">My account</p>
              </div>
              <div
                className={
                  activeTab === "tab2"
                    ? "flex gap-3 cursor-pointer text-black"
                    : "flex gap-3 cursor-pointer"
                }
                onClick={() => setActiveTab("tab2")}
              >
                <img src={imaps} alt="maps-icon" />
                <p className="hidden sm:block">Shipping address</p>
              </div>
              <div
                className={
                  activeTab === "tab3"
                    ? "flex gap-3 cursor-pointer text-black"
                    : "flex gap-3 cursor-pointer"
                }
                onClick={() => setActiveTab("tab3")}
              >
                <img src={imyorder} alt="my-order-icon" />
                <p className="hidden sm:block">My order</p>
              </div>
            </div>
            <Button
              name="log out"
              className="bg-red-600 text-white mb-5 block px-4 py-2 rounded-md hover:bg-red-500 transition-all"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="col-span-3 bg-gray-200 min-h-screen flex lg:items-center overflow-auto items-start">
          {activeTab === "tab1" && (
            <MyAccount
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleBirth={handleBirth}
              setPhoto={setPhoto}
              birt={birt}
              imgProfile={imgProfile}
              loading={loading}
            />
          )}
          {activeTab === "tab2" && <MyAddress />}
          {activeTab === "tab3" && <MyOrder id={id} />}
        </div>
      </div>
    </>
  );
};

export default Custommer;
