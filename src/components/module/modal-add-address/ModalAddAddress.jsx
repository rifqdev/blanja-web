import React from "react";
import Button from "../../base/button";
import Input from "../../base/input/Input";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../config/features/customer/customerSlice";

const ModalAddAddress = ({ visible, onClose, toast, id }) => {
  const dispatch = useDispatch();

  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      addressAs: "",
      recipientName: "",
      recipientPhoneNumber: "",
      fullAddress: "",
      city: "",
      poscode: "",
      setPrimary: false,
      customerId: id,
    },
    onSubmit: () => {
      dispatch(addAddress({ values, toast }));
      handleReset();
      onClose();
    },
  });
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white py-2 rounded-sm w-11/12 relative md:w-4/12 lg:w-8/12 p-5 overflow-auto mt-14 lg:mt-0">
        <h1 className="my-2 text-xl lg:my-5 text-center lg:text-3xl font-bold">
          Add new address
        </h1>
        <div>
          <p className="text-gray-500">
            Save as address (ex: Home address, Office address)
          </p>
          <Input
            type="text"
            className="border p-3 rounded-md w-full focus:outline-none"
            placeholder="Home"
            name="addressAs"
            values={values.addressAs}
            onChange={handleChange}
          />
        </div>

        <div className="lg:flex justify-between gap-10 mt-3">
          <div className="w-full">
            <p className="text-gray-500">Fullname</p>
            <Input
              type="text"
              className="border p-3 rounded-md w-full focus:outline-none"
              placeholder="Fullname"
              name="recipientName"
              values={values.recipientName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <p className="text-gray-500">Phone number</p>
            <Input
              type="text"
              className="border p-3 rounded-md w-full focus:outline-none"
              placeholder="Phone number"
              name="recipientPhoneNumber"
              values={values.recipientPhoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="lg:flex justify-between gap-10 mt-3">
          <div className="w-full">
            <p className="text-gray-500">City or Subdistric</p>
            <Input
              type="text"
              className="border p-3 rounded-md w-full focus:outline-none"
              placeholder="City or Subdistric"
              name="city"
              values={values.city}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <p className="text-gray-500">Pos code</p>
            <Input
              type="text"
              className="border p-3 rounded-md w-full focus:outline-none"
              placeholder="Pos code"
              name="poscode"
              values={values.poscode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3 w-1/2">
          <p className="text-gray-500">Full address</p>
          <Input
            type="text"
            className="border p-3 rounded-md w-full focus:outline-none"
            placeholder="Full address"
            name="fullAddress"
            values={values.fullAddress}
            onChange={handleChange}
          />
        </div>

        <div className="mt-10 flex gap-3">
          <Input
            type="checkbox"
            id="primary"
            className="w-6 h-6"
            name="setPrimary"
            checked={values.setPrimary}
            onChange={handleChange}
          />
          <label htmlFor="primary" className="text-gray-500">
            Make it the primary address
          </label>
        </div>

        <div className="flex gap-5 justify-end my-10">
          <Button
            className="border w-1/4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            name="Cancel"
            onClick={() => {
              onClose();
              handleReset();
            }}
          />
          <Button
            className="border w-1/4 rounded-full bg-red-600 text-white hover:bg-red-500 transition-all"
            name="Save"
            type="submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAddAddress;
