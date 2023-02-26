import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/module/card/Card";
import Navbar from "../../components/module/navbar/Navbar";
import { getSearch } from "../../config/features/product/productSlice";
import Button from "../../components/base/button";

const Search = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { items } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getSearch({ searchParams, setData, setTotalPage, currentPage }));
  }, [searchParams, dispatch, currentPage]);
  const pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Navbar />
      {data.length === 0 ? (
        <div className="mt-44 w-11/12 mx-auto">
          <p className="text-slate-600 text-3xl font-medium my-20 text-center">
            Opps.. Product tidak tersedia
          </p>
          <hr className="border-2 border-dashed mb-20 border-gray-500" />
          <div
            className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            data-aos="fade-up"
          >
            {items?.map((item, index) => {
              const photo = item.photo0.split(",");
              const linkPhoto = photo[photo.length - 1];
              return (
                <Card
                  name={item.name}
                  price={item.price}
                  store={item.storename}
                  img={linkPhoto}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-44 w-11/12 mx-auto">
          <div
            className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            data-aos="fade-up"
          >
            {data?.map((item, index) => {
              const photo = item.photo0.split(",");
              const linkPhoto = photo[photo.length - 1];
              return (
                <Card
                  name={item.name}
                  price={item.price}
                  store={item.storename}
                  img={linkPhoto}
                  key={index}
                  id={item.id_product}
                />
              );
            })}
          </div>
          <div className="my-10 flex gap-3 justify-end">
            <Button
              name="Prev"
              disable={currentPage === 1 ? true : false}
              className="disabled:bg-red-200 bg-red-500 text-white px-2 py-1 rounded-md"
              onClick={handlePrev}
            />

            {pageNumber.map((number, index) => (
              <ul key={index}>
                <li
                  className={
                    currentPage === number
                      ? "border border-red-500 bg-red-500 text-white px-3 rounded-md py-1  cursor-pointer"
                      : "border border-gray-500 px-3 rounded-md py-1 cursor-pointer"
                  }
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </li>
              </ul>
            ))}

            <Button
              name="Next"
              disable={currentPage === pageNumber.length ? true : false}
              className="disabled:bg-red-200 bg-red-500 text-white px-2 py-1 rounded-md"
              onClick={handleNext}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
