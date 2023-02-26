import React, { useState, useEffect, Fragment } from "react";

const SelectDay = ({ handleBirth, birt }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const newDays = [];
    for (let i = 1; i <= 31; i++) {
      newDays.push(i);
    }
    setDays(newDays);
  }, []);

  return (
    <>
      <select
        name="day"
        id="day"
        className="py-1 px-2 bg-white border-2 rounded-md border-gray-400 focus:outline-none"
        onChange={handleBirth}
      >
        <option>{birt.day}</option>
        {days.map((item, index) => (
          <Fragment key={index}>
            <option value={item}>{item}</option>
          </Fragment>
        ))}
      </select>
    </>
  );
};

export default SelectDay;
