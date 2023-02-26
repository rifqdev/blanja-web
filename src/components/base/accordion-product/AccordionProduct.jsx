import React from "react";

const AccordionProduct = ({
  icon,
  title,
  subtitle,
  subtitle2,
  setActiveTab,
  activeTab,
}) => {
  return (
    <>
      <div>
        <img src={icon} alt="my-store-icon" />
      </div>
      <div>
        <input type="checkbox" id="item2" className="peer hidden" />
        <label
          htmlFor="item2"
          className="flex justify-between hover:cursor-pointer peer-checked:text-black"
        >
          {title}
        </label>
        <div className="border-t mt-3 hidden peer-checked:block transition-all">
          <p
            onClick={() => setActiveTab("tab2")}
            className={
              activeTab === "tab2"
                ? "flex justify-between hover:cursor-pointer text-black"
                : "flex justify-between hover:cursor-pointer"
            }
          >
            {subtitle}
          </p>
          <p
            onClick={() => setActiveTab("tab3")}
            className={
              activeTab === "tab3"
                ? "flex justify-between hover:cursor-pointer text-black"
                : "flex justify-between hover:cursor-pointer"
            }
          >
            {subtitle2}
          </p>
        </div>
      </div>
    </>
  );
};

export default AccordionProduct;
