import React, { useState, useEffect } from "react";
// import cartorder from "../../asset/icon/cart-order.png";
import Button from "../../components/base/button";
import product from "../../asset/icon/product.png";
import store from "../../asset/icon/store.png";
import img from "../../asset/img/img.jpeg";
// import AccordionOrder from "../../components/base/accordion-order/AccordionOrder";
import AccordionProduct from "../../components/base/accordion-product/AccordionProduct";
import AccordionStore from "../../components/base/accordion-store/AccordionStore";
// import MyOrderSeller from "../../components/module/my-order-seller/MyOrderSeller";
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
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const { seller } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("tab1");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(seller[0].photo.split(","));
  let imgProfile;
  if (seller.length !== 0) {
    const imgLink = seller[0]?.photo?.split(",");
    if (imgLink) {
      imgProfile = imgLink[imgLink?.length - 1];
    }
  }
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
      storeName: seller[0].storename,
      email: seller[0].email,
      phoneNumber: seller[0].phonenumber,
      storeDescription: seller[0].storedescription,
    },
    onSubmit: () => {
      formData.append("storeName", values.storeName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("storeDescription", values.storeDescription);
      formData.append("photo", photo);
      setLoading(true);
      dispatch(editSeller({ id, formData, setLoading, toast }));
    },
  });

  // console.log("seller ", values.storeDescription);
  return (
    <>
      <Navbar />
      <ToastContainer autoClose={3000} />
      <div className="lg:grid grid-cols-4">
        <div className="mt-28">
          <div className="w-9/12 ml-5 lg:ml-auto">
            <div className="flex gap-3 items-center">
              <img
                src={imgProfile ? imgProfile : img}
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
              imgProfile={imgProfile}
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
