import React from "react";

const Button = ({ name, className, onClick, type, disable }) => {
  return (
    <>
      <button
        className={className}
        onClick={onClick}
        type={type}
        disabled={disable}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
