import React, { useEffect, useState } from "react";
import searchIcon from "../../../asset/icon/search.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../asset/icon/logo.svg";
import bell from "../../../asset/icon/bell.svg";
// import filter from "../../../asset/icon/filter.svg";
import mail from "../../../asset/icon/mail.svg";
import shopping from "../../../asset/icon/shopping-cart .svg";
import img from "../../../asset/icon/default-profile.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomer,
  getSeller,
} from "../../../config/features/auth/authSlice";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const chooseRole = localStorage.getItem("role");
  let id;
  if (token) {
    const getId = jwt_decode(token);
    id = getId.id;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?search=${search}`,
    });
  };

  const handleCariClick = () => {
    setShowSearch(!showSearch);
  };

  let imgProfile;

  const { seller } = useSelector((state) => state.auth);
  const { customer } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  // console.log(seller);
  if (chooseRole === "customer") {
    if (customer[0]?.photo) {
      const photo = customer[0].photo.split(",");
      imgProfile = photo[1];
    }
  } else if (chooseRole === "seller") {
    if (seller[0]?.photo) {
      const photo = seller[0].photo.split(",");
      imgProfile = photo[photo.length - 1];
    }
  }

  useEffect(() => {
    if (token && chooseRole === "seller") {
      dispatch(getSeller(id));
    } else if (token && chooseRole === "customer") {
      dispatch(getCustomer(id));
    }
  }, [chooseRole, dispatch, id, token]);

  const navigateProfile = () => {
    if (chooseRole === "seller") {
      navigate("/seller");
    } else {
      navigate("/customer");
    }
  };
  return (
    <>
      <nav className="border-b shadow-md flex justify-between items-center px-10 pt-3 pb-14 sm:py-3 sm:pt-0 sm:pb-0 fixed top-0 bg-white w-full z-50">
        <div className="grow">
          {!showSearch && (
            <Link to="/" className="text-2xl font-bold underline italic">
              <img src={logo} alt="logo" className="h-8 " />
            </Link>
          )}
          <label
            htmlFor="cek"
            className="absolute top-16 cursor-pointer shadow-md sm:hidden"
          >
            <div className="bg-slate-700 h-0.5 w-6 mt-1"></div>
            <div className="bg-slate-700 h-0.5 w-6 mt-1"></div>
            <div className="bg-slate-700 h-0.5 w-6 mt-1"></div>
          </label>
        </div>
        <img
          src={searchIcon}
          alt="search-icon"
          className="lg:hidden w-8"
          onClick={handleCariClick}
        />
        <div
          className={`border py-2 pl-3 relative w-[25rem] lg:w-[30rem] rounded-full lg:block ${
            showSearch ? "" : "hidden"
          }`}
        >
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search"
              className="focus:outline-none w-10/12"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className="bg-gray-200 w-7 absolute top-0 w-[48px] h-[40px] right-0 rounded-r-full p-2 hover:bg-gray-300 transition-all cursor-pointer"
              onClick={handleSearch}
            >
              <img
                src={searchIcon}
                alt="search-icon"
                className="w-8 absolute right-[10px] top-1"
              />
            </div>
          </form>
        </div>
        <input type="checkbox" id="cek" className="peer hidden" />
        <div className="flex flex-col lg:grow items-center sm:justify-around gap-5 absolute left-0 top-0 -translate-x-[33rem] peer-checked:translate-x-0 transition duration-500 h-screen bg-white shadow-2xl w-10/12 p-5 sm:translate-x-0 sm:w-auto sm:flex-row sm:static sm:h-auto sm:bg-inherit sm:shadow-none z-50">
          <label
            htmlFor="cek"
            className="absolute top-6 cursor-pointer text-2xl right-6 sm:hidden"
          >
            X
          </label>

          {token ? (
            <div className="flex gap-5 flex-col sm:items-center mt-24 sm:flex-row sm:mt-0">
              {chooseRole === "customer" && (
                <Link to="/checkout" className="flex gap-2">
                  <div className="relative">
                    <img src={shopping} alt="shop" />
                    <div className="absolute bg-red-600 text-white px-1.5 rounded-full text-sm -top-2 -right-4">
                      <p>{items.length}</p>
                    </div>
                  </div>
                  <p className="sm:hidden">Cart</p>
                </Link>
              )}
              <div className="flex gap-2">
                <div>
                  <img src={bell} alt="bell" />
                </div>
                <p className="sm:hidden">Notificatin</p>
              </div>
              <div className="flex gap-2">
                <div>
                  <img src={mail} alt="mail" />
                </div>
                <p className="sm:hidden">Chats</p>
              </div>
              <div
                className="flex gap-2 cursor-pointer "
                onClick={navigateProfile}
              >
                <div>
                  <img
                    src={imgProfile ? imgProfile : img}
                    alt="img"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <p className="sm:hidden">Profile</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 flex-col mt-24 sm:flex-row sm:mt-0">
              <Link
                to="login"
                className="bg-red-600 text-white w-24 py-1.5 text-center rounded-full hover:bg-red-500 transition-all cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="register"
                className="w-24 py-1.5 border border-gray-300 text-center rounded-full cursor-pointer hover:bg-gray-200 transition-all"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
