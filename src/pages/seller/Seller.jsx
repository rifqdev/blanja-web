import React, { useState, useEffect } from "react";
import Button from "../../components/base/button";
import product from "../../asset/icon/product.png";
import store from "../../asset/icon/store.png";
import img from "../../asset/img/img.jpeg";
import AccordionProduct from "../../components/base/accordion-product/AccordionProduct";
import AccordionStore from "../../components/base/accordion-store/AccordionStore";
import MyProduct from "../../components/module/my-product/MyProduct";
import MyStore from "../../components/module/my-store/MyStore";
import Navbar from "../../components/module/navbar/Navbar";
import SellingProduct from "../../components/module/selling-product/SellingProduct";
import { useSelector, useDispatch } from "react-redux";
import { editSeller, getSeller } from "../../config/features/auth/authSlice";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { getMyProduct } from "../../config/features/product/productSlice";

const Seller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const decoded = jwt_decode(token);
  const id = decoded.userId;
  const { seller } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("tab1");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getSeller(id));
    dispatch(getMyProduct(id));
  }, [dispatch, id, loading]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const formData = new FormData();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      store_name: seller.store_name,
      email: seller.email,
      phone_number: seller.phone_number,
      store_description: seller.store_description,
    },
    onSubmit: () => {
      formData.append("store_name", values.store_name);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone_number);
      formData.append("store_description", values.store_description);
      formData.append("photo", photo);
      setLoading(true);
      dispatch(editSeller({ id, formData, setLoading, toast }));
    },
  });
  return (
    <>
      <Navbar />
      <ToastContainer autoClose={3000} />
      <div className="lg:grid grid-cols-4">
        <div className="mt-28">
          <div className="w-9/12 ml-5 lg:ml-auto">
            <div className="flex gap-3 items-center">
              <img
                src={seller && seller.photo ? seller.photo : img}
                alt="profile-icon"
                className="w-16 h-16 rounded-full object-cover"
              />
              <p className="text-lg font-medium">{seller[0]?.name}</p>
            </div>

            <div className="mt-12 flex lg:flex-col gap-5 text-xl mb-10 text-slate-500">
              <div className="flex gap-3 cursor-pointer">
                <AccordionStore
                  icon={store}
                  title="Store"
                  subtitle="Store profile"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              <div className="flex gap-3 cursor-pointer">
                <AccordionProduct
                  icon={product}
                  title="Product"
                  subtitle="My products"
                  subtitle2="Selling products"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              {/* <div className="flex gap-3 cursor-pointer">
                <AccordionOrder
                  icon={cartorder}
                  title="Order"
                  subtitle="My order"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div> */}
            </div>
            <Button
              name="log out"
              className="bg-red-600 text-white mb-5 block px-4 py-2 rounded-md hover:bg-red-500 transition-all"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="col-span-3 bg-gray-200 min-h-screen overflow-auto flex py-20 mt-16">
          {activeTab === "tab1" && (
            <MyStore
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setPhoto={setPhoto}
              imgProfile={seller && seller.photo ? seller.photo : img}
              seller={seller[0]}
              loading={loading}
            />
          )}
          {activeTab === "tab2" && (
            <MyProduct id={id} toast={toast} ToastContainer={ToastContainer} />
          )}
          {activeTab === "tab3" && <SellingProduct id={id} />}
          {/* {activeTab === "tab4" && <MyOrderSeller />} */}
        </div>
      </div>
    </>
  );
};

export default Seller;
