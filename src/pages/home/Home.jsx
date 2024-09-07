import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/module/card/Card";
import Carousel from "../../components/module/carousel/Carousel";
import Category from "../../components/module/category/category";
import Navbar from "../../components/module/navbar/Navbar";
import { getAllProduct, getNewProduct } from "../../config/features/product/productSlice";
import jwt_decode from "jwt-decode";
import { getCart } from "../../config/features/cart/CartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  let id;
  if (token) {
    const getId = jwt_decode(token);
    id = getId.id;
  }

  const { items } = useSelector((state) => state.product);
  const { all } = useSelector((state) => state.product);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getNewProduct());
    dispatch(getAllProduct());
  }, [dispatch, id]);

  useEffect(() => {
    if(token){
      dispatch(getCart(id));
    }
  }, [dispatch, id]);
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto mt-32">
        <div>
          <Carousel />
        </div>
        <div className="mt-10">
          <h1 className="text-3xl font-bold">Category</h1>
          <p className="mt-1 text-sm text-slate-400 mb-5">What are you currently looking for</p>
          <Category />
        </div>
        <div className="mt-14">
          <h1 className="text-3xl font-bold ">New</h1>
          <p className="text-sm text-slate-500">You've never seen it before</p>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5" data-aos="fade-up">
          {items &&
            items.map((item, index) => {
              const photo = item.photo[0];
              return <Card name={item.name} price={item.price} store={item.user.store_name} img={photo} key={index} id={item.id} />;
            })}
        </div>
        <div className="mt-14">
          <h1 className="text-3xl font-bold ">Popular</h1>
          <p className="text-sm text-slate-500">Find clothes that are trending recently</p>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-20" data-aos="fade-up">
          {all &&
            all.map((item, index) => {
              const photo = item.photo[0];
              return <Card name={item.name} price={item.price} store={item.user.store_name} img={photo} key={index} id={item.id} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
