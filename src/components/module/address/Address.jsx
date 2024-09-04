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
    <div
      className={
        primaryaddress
          ? "mt-10 border-2 border-blue-500 rounded-md p-5"
          : "mt-10 border-2 border-red-500 rounded-md p-5"
      }
    >
      <h4 className="text-xl font-medium ">{recipientname}</h4>
      <p className="mt-2">
        {fulladdress}, {city}, {poscode},
        {recipientphonenumber}
      </p>
      <Button name={name} className={className} onClick={onClick} />
    </div>
  );
};

export default Address;
