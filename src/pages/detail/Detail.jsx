import React, { useEffect, useState } from "react";
import Rating from "../../asset/img/Rating.svg";
import minus from "../../asset/icon/minus.svg";
import plus from "../../asset/icon/plus.svg";
import Button from "../../components/base/button";
import review from "../../asset/img/review.png";
import review2 from "../../asset/img/review2.png";
import Card from "../../components/module/card/Card";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/module/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductById,
  getProductByIdCategory,
} from "../../config/features/product/productSlice";
import Description from "../../components/module/description/Description";
import { addToCart, getCart } from "../../config/features/cart/CartSlice";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

const Detail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [idCategory, setIdCategory] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const chooseRole = localStorage.getItem("role");
  let idCustomer;
  if (token) {
    const { id } = jwt_decode(token);
    idCustomer = id;
  }

  const { item } = useSelector((state) => state.product);
  const { recent } = useSelector((state) => state.product);

  let cover;
  if (item.length !== 0) {
    const imgLink = item[0].photo0.split(",");
    cover = imgLink[imgLink.length - 1];
  }
  const thumbnail = [
    item[0]?.photo1,
    item[0]?.photo2,
    item[0]?.photo3,
    item[0]?.photo4,
    item[0]?.photo5,
  ];
  let imgThumnail = [];
  for (let i = 0; i < thumbnail.length; i++) {
    if (thumbnail[i]) {
      const imgLink = thumbnail[i].split(",");
      imgThumnail.push(imgLink[1]);
    }
  }

  const data = {
    productId: id,
    customerId: idCustomer,
    quantity: count,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    dispatch(getProductById({ id, setLoading, setIdCategory }));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getProductByIdCategory({ idCategory, setLoading }));
  }, [dispatch, idCategory]);

  useEffect(() => {
    dispatch(getCart(idCustomer));
  }, [dispatch, loading, idCustomer]);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddBag = () => {
    setLoading(true);
    dispatch(addToCart({ data, setLoading, toast }));
  };
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto mt-32">
        <ToastContainer autoClose={3000} />
        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <img src={cover && cover} alt="img" className=" rounded-md" />
            <div className="flex gap-5 mt-5 overflow-scroll overflow-x-auto overflow-y-hidden">
              {imgThumnail.map((item, index) => {
                if (item) {
                  return (
                    <img
                      key={index}
                      src={item}
                      alt="img"
                      className="w-20 object-cover"
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-3xl font-medium normal-case">
              {item[0]?.name ? item[0].name : "loading name"}
            </h1>
            <p className="text-slate-500">
              {item[0]?.storename ? item[0].storename : "loading storename"}
            </p>
            <img src={Rating} alt="rating" />
            <div className="mt-5">
              <p className="text-slate-500">price</p>
              <h2 className="text-2xl font-medium">
                $ {item[0]?.price ? item[0].price : "loading price"}
              </h2>
            </div>
            {item[0]?.color && (
              <div className="mt-5">
                <p>Color</p>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-slate-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            )}
            <div className="flex gap-16 mt-5">
              {item[0]?.size && (
                <div>
                  <p>size</p>
                  <p className="mt-3">XL</p>
                </div>
              )}
              {chooseRole === "customer" && (
                <div className="w-32">
                  <p className="text-center">jumlah</p>
                  <div className="flex justify-between mt-3">
                    <div className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer">
                      <img
                        src={minus}
                        alt="minus"
                        className="w-6 "
                        onClick={handleDecrement}
                      />
                    </div>
                    <p>{count}</p>
                    <div className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer">
                      <img
                        src={plus}
                        alt="plus"
                        className="w-6 "
                        onClick={handleIncrement}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {chooseRole === "customer" && (
              <div className="mt-8 flex gap-3 flex-wrap">
                <Button
                  name="Chat"
                  className="border-2 py-2 w-40 rounded-full border-black hover:bg-gray-200 transition-all"
                />
                <Button
                  name="Add bag"
                  className="border-2 py-2 w-40 rounded-full border-black hover:bg-gray-200 transition-all"
                  onClick={handleAddBag}
                />
                <Button
                  name="Buy Now"
                  className="bg-red-600 py-2 w-full sm:w-96 rounded-full text-white hover:bg-red-700 transition-all"
                  onClick={() => {
                    handleAddBag();
                    navigate("/checkout");
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {/* informasi produk */}
        <div className="mt-10 mb-7">
          <h1 className="text-3xl">Informasi Produk</h1>
          <div className="mt-5">
            <h5 className="text-xl">Stock</h5>
            <p className="uppercase text-red-600">
              {item[0]?.stock ? item[0].stock : "loading stock"}
            </p>
          </div>
          <div className="mt-5">
            <h5 className="text-xl">Condition</h5>
            <p className="uppercase text-red-600">
              {item[0]?.condition ? item[0].condition : "loading condition"}
            </p>
          </div>
          <div className="mt-10">
            <h5 className="text-2xl mb-3">Deskripsi</h5>
            <Description description={item[0]?.description} />
          </div>
          <div className="mt-10">
            <h1 className="text-2xl mb-4">Produk review</h1>
            <div className="flex gap-5">
              <div>
                <img src={review} alt="review" />
              </div>
              <div>
                <img src={review2} alt="review" />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-10 mb-7">
          <h1 className="text-2xl font-medium">You can also like this</h1>
          <p className="text-sm text-slate-500">You've never seen it before!</p>
        </div>
        <div
          className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-20"
          data-aos="fade-up"
        >
          {loading ? (
            <p>loading</p>
          ) : (
            recent.map((item, index) => {
              const photo = item.photo0.split(",");
              const linkPhoto = photo[photo.length - 1];
              return (
                <Card
                  name={item.name}
                  price={item.price}
                  store={item.storename}
                  img={linkPhoto}
                  key={index}
                  id={item.id}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
