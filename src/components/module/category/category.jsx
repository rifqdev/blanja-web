import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "./category.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "swiper";
import { getAllCategories } from "../../../config/features/categories/categoriesSlice";

const Category = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <div className="h-44 category">
      <Swiper
        loop={true}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 5,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={`category/${item.id}`}>
              <div className="bg-gray-100 h-36 w-40 mx-5 rounded-lg shadow-lg">
                <img
                  src={item.photo}
                  alt="t-shirt"
                  className="border w-full h-full rounded-lg object-cover"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
