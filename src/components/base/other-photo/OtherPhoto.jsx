import React from "react";

const OtherPhoto = ({ item, handleRemove, index, onClick }) => {
  return (
    <div className="relative  mx-2">
      <div
        className={
          index === 0
            ? "rounded-lg bg-gray-100 w-32 h-32 flex justify-center items-center cursor-pointer"
            : "rounded-lg bg-gray-100 w-20 h-20 flex justify-center items-center cursor-pointer"
        }
        onClick={onClick}
      >
        {item ? (
          <img src={item} alt="img" className="border-2 shadow-lg" />
        ) : (
          <p>add</p>
        )}
      </div>
      {index === 0 && (
        <>
          <p className="text-center mt-2">Cover</p>
        </>
      )}
      <div
        className="bg-red-600 text-white absolute -right-[2px] -top-[13px] h-[17px] w-[15px] rounded-full cursor-pointer"
        onClick={() => handleRemove(index)}
      >
        <p className="absolute -top-[4px] right-[3px] ">&times;</p>
      </div>
    </div>
  );
};

export default OtherPhoto;
