import React from "react";
import "./Avatar.scss";

const Avatar = (props) => {
  return (
    <div className={`_avatar ${props.className}`}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.height }}
      ></img>
    </div>
  );
};

export default Avatar;
