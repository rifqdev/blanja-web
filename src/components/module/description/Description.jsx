import React from "react";
import ReactHtmlParser from "react-html-parser";

const Description = ({ description }) => {
  return <div>{ReactHtmlParser(description)}</div>;
};

export default Description;
