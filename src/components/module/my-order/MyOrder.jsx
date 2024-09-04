import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CardShipping from "../card-shipping/CardShipping";

const MyOrder = () => {
  const { items } = useSelector((state) => state.order);
  return (
    <div className="bg-white lg:w-10/12 mx-auto border border-black rounded-md shadow-lg my-20 w-11/12">
      <div className="p-5 h-[35rem] overflow-auto">
        <h1 className="text-2xl font-medium">My order</h1>
        <div className="flex mt-2 lg:gap-3 text-slate-500 font-medium flex-wrap gap-5">
          <p className="text-red-600 underline">All items </p>{" "}
          <span>({items.length})</span>
        </div>
        <hr className="mt-1" />
        {items.map((order, index) => {
          console.log(order)
          return (
            <Fragment key={index}>
              <CardShipping
                photo={order.products[0].product_photo[0]}
                name={order.products[0].product_name}
                price={`total item ${order.products.length}`}
                total={`$ ${order.order_price}`}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
