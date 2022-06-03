import React from "react";
import "./Toggle.scss";

const Toggle = ({ toggleBtn }) => {
  return (
    <button className="toggle" onClick={toggleBtn}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default Toggle;
