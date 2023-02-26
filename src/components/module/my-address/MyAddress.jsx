import React, { useEffect, useState } from "react";
import ModalAddAddress from "../modal-add-address/ModalAddAddress";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAddress,
  setPrimaryAddress,
} from "../../../config/features/customer/customerSlice";
import Address from "../address/Address";

const MyAddress = () => {
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { myAddress } = useSelector((state) => state.customer);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllAddress(id));
  }, [dispatch, id, loading]);

  return (
    <div className="bg-white lg:w-10/12 mx-auto border border-black rounded-md shadow-lg my-20 w-11/12">
      <ToastContainer autoClose={3000} />
      <ModalAddAddress
        visible={showModal}
        onClose={handleCloseModal}
        toast={toast}
        id={id}
      />
      <div className="p-5">
        <h1 className="text-2xl font-medium">Choose another address</h1>
        <p className="text-slate text-sm">Manage your shipping address</p>
      </div>
      <hr className="w-11/12 border-t-2 mx-auto" />
      <div className="p-5">
        <div
          className="border-2 border-dashed border-gray-400 rounded-md h-28 flex items-center justify-center mt-5 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <h1 className="text-2xl font-bold text-slate-500">Add new address</h1>
        </div>
        {myAddress.map((item, index) => {
          const data = {
            customerId: id,
            id: item.id,
          };
          return (
            <Address
              primaryaddress={item.primaryaddress}
              recipientname={item.recipientname}
              recipientphonenumber={item.recipientphonenumber}
              fulladdress={item.fulladdress}
              city={item.city}
              poscode={item.poscode}
              onClick={() => {
                setLoading(true);
                dispatch(setPrimaryAddress({ data, toast, setLoading }));
              }}
              name="Set primary address"
              className="text-red-600 font-medium mt-5 cursor-pointer hover:underline transition-all"
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyAddress;
