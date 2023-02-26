import React from "react";

const AccordionStore = ({ icon, title, subtitle, setActiveTab, activeTab }) => {
  return (
    <>
      <div>
        <img src={icon} alt="my-store-icon" />
      </div>
      <div>
        <input type="checkbox" id="item1" className="peer hidden" />
        <label
          htmlFor="item1"
          className="flex justify-between hover:cursor-pointer peer-checked:text-black"
        >
          {title}
        </label>
        <div className="border-t mt-3 hidden peer-checked:block transition-all">
          <p
            onClick={() => setActiveTab("tab1")}
            className={
              activeTab === "tab1"
                ? "flex justify-between hover:cursor-pointer text-black"
                : "flex justify-between hover:cursor-pointer"
            }
          >
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
};

export default AccordionStore;
