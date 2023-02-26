import React, { Fragment, useState, useEffect } from "react";

const SelectYears = ({ handleBirth, birt }) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const newYears = [];
    for (let i = 1990; i <= 2005; i++) {
      newYears.push(i);
    }
    setYears(newYears);
  }, []);
  return (
    <>
      <select
        name="year"
        id="day"
        className="py-1 px-2 bg-white border-2 rounded-md border-gray-400 focus:outline-none"
        onChange={handleBirth}
      >
        <option>{birt.year}</option>
        {years.map((item, index) => (
          <Fragment key={index}>
            <option value={item}>{item}</option>
          </Fragment>
        ))}
      </select>
    </>
  );
};

export default SelectYears;
