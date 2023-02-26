import React from "react";

const SelectMonth = ({ handleBirth, birt }) => {
  return (
    <>
      <select
        name="month"
        id="day"
        className="py-1 px-2 bg-white border-2 rounded-md border-gray-400 focus:outline-none"
        onChange={handleBirth}
      >
        <option>{birt.month}</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="Mei">Mei</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
    </>
  );
};

export default SelectMonth;
