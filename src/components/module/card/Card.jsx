import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../../../asset/img/Rating.svg";

const Card = ({ img, name, store, price, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border w-full rounded-lg cursor-pointer shadow-md hover:shadow-2xl hover:relative transform hover:-translate-y-5 hover:scale-110 transition duration-300"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <img
        src={img}
        alt="product"
        className="w-full h-40 rounded-t-md object-cover"
      />
      <div className="px-2 py-3">
        <p className="text-lg font-medium tracking-wider leading-6">{name}</p>
        <p className="mt-2 font-medium text-red-600">$ {price}</p>
        <p className="font-medium text-sm text-slate-500 mb-3">{store}</p>
        <img src={Rating} alt="rating" />
      </div>
    </div>
  );
};

export default Card;
