import React from "react";
import "./CardCatalog.css";

const CardCatalog = (props) => {
  return (
    <div className={`card-catalog ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default CardCatalog;
