import React, { useState, useEffect, Fragment } from "react";
import Button from "../../components/base/button";
import Address from "../../components/module/address/Address";
import CardShipping from "../../components/module/card-shipping/CardShipping";
import ModalPayment from "../../components/module/modal-payment/ModalPayment";
import Navbar from "../../components/module/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../config/features/cart/CartSlice";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAddressPrimary } from "../../config/features/customer/customerSlice";
import { ToastContainer, toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("access");
  const { userId } = jwt_decode(token);
  const id = userId;
  const { items } = useSelector((state) => state.cart);
  const { primary } = useSelector((state) => state.customer);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCart(id));
    dispatch(getAddressPrimary());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCart(id));
  }, [showModal, id, dispatch]);

  const delivery = 5;
  let total = null;
  for (let i = 0; i < items.length; i++) {
    const productPrice = items[i].price;
    total += productPrice;
  }

  return (
    <>
      <Navbar />
      <ToastContainer autoClose={3000} />
      <div className="grid lg:grid-cols-3 gap-5 w-11/12 mx-auto my-32">
        <ModalPayment visible={showModal} onClose={handleCloseModal} total={total} delivery={delivery} toast={toast} />
        <div className="lg:col-span-2" data-aos="fade-right">
          <h1 className="text-3xl font-bold">Checkout</h1>
          {items.length === 0 && (
            <>
              <p className="mt-32 text-center text-slate-500 text-2xl">No product in cart, please insert firts</p>
            </>
          )}
          {!primary && (
            <>
              <p className="mt-5 text-center text-slate-500 text-2xl">No address set, please select or add new address in profile first</p>
            </>
          )}
          <div>
            {primary && (
              <>
                <h5 className="text-xl mb-2 mt-5">Shipping Address</h5>
                <Address
                  primaryaddress={primary?.primary_address}
                  recipientname={primary?.recipient_name}
                  recipientphonenumber={primary?.recipient_phone_number}
                  fulladdress={primary?.full_address}
                  city={primary?.city}
                  poscode={primary?.pos_code}
                  onClick={() => navigate("/customer")}
                  name="Choose another address"
                  className="border-2 py-2 px-6 rounded-full text-gray-500 hover:bg-slate-200 transition-all mt-10"
                />
              </>
            )}
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {items.map((item, index) => {
              const photo = item.product.photo[0];
              return (
                <Fragment key={index}>
                  <CardShipping
                    photo={photo}
                    name={item.product.name}
                    price={`$ ${item.product.price}`}
                    storename={item.product.user.store_name}
                    total={`${item.quantity}x`}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
        {items.length > 0 && (
          <div data-aos="fade-left">
            <div className="border mt-5 rounded-md shadow-md p-5">
              <h1 className="font-medium ">Shopping summary</h1>
              <div className="flex justify-between mt-5">
                <p className="text-slate-500">Order</p>
                <p>$ {total}</p>
              </div>
              <div className="flex justify-between my-2">
                <p className="text-slate-500">Delivery</p>
                <p>$ {delivery}</p>
              </div>
              <hr />
              <div className="flex justify-between my-2">
                <p>Shopping summary</p>
                <p>$ {total + delivery}</p>
              </div>
              <Button
                name="Select payment"
                className="bg-red-600 w-full py-2 rounded-full text-white mt-2 font-medium hover:bg-red-700 transition-all"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
