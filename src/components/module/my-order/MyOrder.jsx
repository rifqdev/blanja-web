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
        {items.map((item, index) => {
          const photo = item.products[0].photo.split(",");
          const linkPhoto = photo[photo.length - 1];

          return (
            <Fragment key={index}>
              <CardShipping
                photo={linkPhoto}
                name={item.products[0].name}
                price={`total item ${item.products.length}`}
                total={`$ ${item.totalprice}`}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
