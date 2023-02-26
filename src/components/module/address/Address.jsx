import React from "react";
import Button from "../../base/button";

const Address = ({
  name,
  primaryaddress,
  recipientname,
  recipientphonenumber,
  fulladdress,
  city,
  poscode,
  onClick,
  className,
}) => {
  return (
    // <div className="border py-3 px-4 rounded-md shadow-md">
    //   <h2 className="text-lg font-medium my-2">Andreas Jane</h2>
    //   <p className="text-sm mb-5">
    //     Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten
    //     Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab.
    //     Banyumas, 53181
    //   </p>
    //   <Button
    //     name="Choose another address"
    //     className="border-2 py-2 px-6 rounded-full text-gray-500 hover:bg-slate-200 transition-all"
    //   />
    // </div>
    <div
      className={
        primaryaddress
          ? "mt-10 border-2 border-blue-500 rounded-md p-5"
          : "mt-10 border-2 border-red-500 rounded-md p-5"
      }
    >
      <h4 className="text-xl font-medium ">{recipientname}</h4>
      <p className="mt-2">
        {fulladdress}, {city}, {poscode}
        {recipientphonenumber}
      </p>
      <Button name={name} className={className} onClick={onClick} />
    </div>
  );
};

export default Address;
