import React from "react";

const MyOrderSeller = () => {
  return (
    <div
      className="bg-white w-10/12 mx-auto border border-black rounded-md shadow-lg"
      data-aos="fade-left"
    >
      <div className="p-5 h-[35rem]">
        <h1 className="text-2xl font-medium">My order</h1>
        <div className="flex mt-2 gap-10 text-slate-500 font-medium">
          <p className="text-red-600 underline">All items</p>
          <p>Not yet paid</p>
          <p>Packed</p>
          <p>Sent</p>
          <p>Completed</p>
          <p>Order cancel</p>
        </div>
        <hr className="mt-1" />
      </div>
    </div>
  );
};

export default MyOrderSeller;
