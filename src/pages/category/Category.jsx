import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/module/card/Card";
import Navbar from "../../components/module/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../config/features/categories/categoriesSlice";

const Category = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const { id } = useParams();
  const { byId } = useSelector((state) => state.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoryById({id, setLoading}));
  }, [dispatch, id]);
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto my-32">
        <h1 className="text-3xl font-bold mb-5">{byId[0]?.category}</h1>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {byId.length === 0 ? (
            <>
              {loading ? <h1>Loading...</h1> : <h1>Data tidak tersedia</h1>}
            </>
          ) : (
            <>
              {byId.map((item, index) => {
                const photo = item.photo[0];
                return <Card name={item.name} price={item.price} store={item.user.store_name} img={photo} key={index} id={item.id} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
