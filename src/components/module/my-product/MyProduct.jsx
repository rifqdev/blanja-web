import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../../asset/icon/search.svg";
import noProductIcon from "../../../asset/img/no-product.png";
import Input from "../../base/input/Input";
import trash from "../../../asset/icon/trash.svg";
import edit from "../../../asset/icon/edit.svg";
import {
  getMyProduct,
  removeProduct,
} from "../../../config/features/product/productSlice";
import { useNavigate } from "react-router-dom";

const MyProduct = ({ id, toast }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { myProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getMyProduct({ id, search }));
  }, [id, dispatch, loading, search]);

  return (
    <div
      className="bg-white lg:w-10/12 mx-auto border border-black rounded-md shadow-lg my-20 w-11/12"
      data-aos="fade-left"
    >
      <div className="p-5">
        <h1 className="text-2xl font-medium">My product</h1>
        <div className="flex gap-10 text-slate-500 mt-5">
          <h5 className="text-red-600 underline font-semibold cursor-pointer">
            All items ({myProducts?.length})
          </h5>
          <h5 className="cursor-pointer">Sould out</h5>
          <h5 className="cursor-pointer">Archived</h5>
        </div>
        <hr className="my-5 border-t-2" />
        <div className="relative">
          <Input
            type="text"
            className="border p-2 rounded-full pl-12 focus:outline-none shadow-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search-icon"
            className="w-[28px] absolute top-2 left-3"
          />
        </div>

        <div>
          <table className="mt-10 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {myProducts?.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 1 ? "bg-gray-100" : "bg-gray-200"}
                >
                  <td className="px-6 py-4 text-gray-900">{index + 1}</td>
                  <td
                    className="px-6 py-4 text-blue-600 cursor-pointer"
                    onClick={() => navigate(`/detail/${item.id}`)}
                  >
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{item.price}</td>
                  <td className="px-6 py-4 text-gray-900">{item.stock}</td>
                  <td className="flex gap-3 px-6 py-4">
                    <img
                      src={trash}
                      alt="trash"
                      className="w-5 cursor-pointer"
                      onClick={() => {
                        setLoading(true);
                        const id = item.id;
                        dispatch(removeProduct({ id, setLoading, toast }));
                      }}
                    />
                    <img
                      src={edit}
                      alt="edit"
                      className="w-5 cursor-pointer"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!myProducts && (
            <div className="border border-gray-300 rounded-b-md flex justify-center items-center h-80">
              <img src={noProductIcon} alt="no-product-icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
