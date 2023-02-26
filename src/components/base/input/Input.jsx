import React from "react";

const Input = ({
  type,
  id,
  className,
  placeholder,
  onChange,
  name,
  values,
  checked,
}) => {
  return (
    <>
      <input
        type={type}
        id={id}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={values}
        checked={checked}
      />
    </>
  );
};

export default Input;
