import React from "react";
import "./BackDrop.scss";

const BackDrop = ({ drawerHandler }) => {
  return <div onClick={drawerHandler} className="backdrop"></div>;
};

export default BackDrop;
