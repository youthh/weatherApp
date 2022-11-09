import React from "react";
import "./Content__bottom.css";

type VisibleProps = {
  visible: number;
};

const Visibility = ({ visible }: VisibleProps) => {
  return (
    <div className="highlights__item-box">
      <h6 className="highlights__item-title">Visibility</h6>
      <p className="humidity">
        {visible / 1000} <span>km/h</span>
      </p>
      <p className="highlights__item-description">Good visibility</p>
    </div>
  );
};

export default Visibility;
