import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/module/card/Card";
import Navbar from "../../components/module/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../config/features/categories/categoriesSlice";

const Category = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { byId } = useSelector((state) => state.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoryById(id));
  }, [dispatch, id]);
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto my-32">
        <h1 className="text-3xl font-bold mb-5">{byId[0]?.category}</h1>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {byId.length === 0 ? (
            <>
              <h1>Data tidak tersedia</h1>
            </>
          ) : (
            <>
              {byId.map((item, index) => {
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
