import React from "react";

const CardShipping = ({ photo, name, storename, price, total }) => {
  return (
    <div className="border flex gap-5 p-3 rounded-md shadow-md my-2">
      <div>
        <img
          src={photo}
          alt="img"
          className="w-28 h-24 rounded-md object-cover"
        />
      </div>
      <div className="flex justify-between w-11/12 items-center">
        <div className="h-full flex flex-col justify-around">
          <p className="text-lg font-medium">{name}</p>
          <p className="text-sm text-slate-500">{storename}</p>
        </div>
        <div className="h-full flex flex-col justify-around">
          <p className="font-medium text-lg">{price}</p>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
};

export default CardShipping;
