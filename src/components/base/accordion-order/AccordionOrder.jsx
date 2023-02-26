import React from "react";

const AccordionOrder = ({ icon, title, subtitle, setActiveTab, activeTab }) => {
  return (
    <>
      <div>
        <img src={icon} alt={icon} />
      </div>
      <div>
        <input type="checkbox" id="item3" className="peer hidden" />
        <label
          htmlFor="item3"
          className="flex justify-between hover:cursor-pointer peer-checked:text-black"
        >
          {title}
        </label>
        <div className="border-t mt-3 hidden peer-checked:block transition-all">
          <p
            onClick={() => setActiveTab("tab4")}
            className={
              activeTab === "tab4"
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

export default AccordionOrder;
