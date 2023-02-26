import React, { useState } from "react";
import gopay from "../../../asset/icon/gopay.png";
import pos from "../../../asset/icon/pos.png";
import mastercard from "../../../asset/icon/mastercard.png";
import Button from "../../base/button";
import { useDispatch } from "react-redux";
import { addOrder } from "../../../config/features/order/orderSlice";

const ModalPayment = ({ visible, onClose, total, delivery, id, toast }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const data = {
    customerId: id,
  };
  const handleBuy = () => {
    setLoading(true);
    dispatch(addOrder({ data, onClose, toast, setLoading }));
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white py-2 rounded-sm w-11/12 relative md:w-4/12 ">
        <div className="flex gap-5 px-4 items-center text-gray-600 border-b shadow-md">
          <p
            className="text-[30px] px-2 cursor-pointer transition-all hover:bg-gray-200"
            onClick={onClose}
          >
            x
          </p>
          <h1 className="text-xl font-medium">Payment</h1>
        </div>

        <div className="p-4">
          <h4>Payment method</h4>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-10 items-center ">
                <div>
                  <img src={gopay} alt="gopay" />
                </div>

                <label
                  htmlFor="gopay"
                  className="text-medium text-lg cursor-pointer"
                >
                  Gopay
                </label>
              </div>
              <input type="checkbox" id="gopay" className="w-6 h-6 " />
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="flex gap-16 items-center ">
                <div>
                  <img src={pos} alt="pos" />
                </div>

                <label
                  htmlFor="pos"
                  className="text-medium text-lg cursor-pointer"
                >
                  Pos Indonesia
                </label>
              </div>
              <input type="checkbox" id="pos" className="w-6 h-6 " />
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="flex gap-16 items-center ">
                <div>
                  <img src={mastercard} alt="mastercard" />
                </div>

                <label
                  htmlFor="mastercard"
                  className="text-medium text-lg cursor-pointer"
                >
                  Mastercard
                </label>
              </div>
              <input type="checkbox" id="mastercard" className="w-6 h-6 " />
            </div>
          </div>
        </div>

        <hr />
        <div className="p-5">
          <h5 className="text-lg">Shopping summary</h5>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 text-lg">Order</p>
            <p className="text-bold">$ {total}</p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-gray-500 text-lg">Delivery</p>
            <p className="text-bold">$ {delivery}</p>
          </div>
        </div>

        <div className="border-t  p-4 flex justify-between mt-20 item-center">
          <div>
            <p className="font-medium text-lg">Shopping summary</p>
            <p className="text-red-500 font-medium text-lg">
              $ {total + delivery}
            </p>
          </div>

          {loading ? (
            <button
              className="bg-red-400  rounded-full w-32 h-[41px] text-white flex justify-center items-center gap-2"
              disabled
            >
              Buy
              <div class="h-5 w-5 border-2 rounded-full border-l-0 border-b-0 animate-spin"></div>
            </button>
          ) : (
            <Button
              name="Buy"
              className="bg-red-600  rounded-full w-32 h-[41px] text-white hover:bg-red-500 transition-all"
              onClick={handleBuy}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;
