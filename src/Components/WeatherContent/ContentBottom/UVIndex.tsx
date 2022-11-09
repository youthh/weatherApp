import React from "react";
import value from "../../../Images/uvIndexImg.svg";

const UvIndex = () => {
  return (
    <div className="highlights__item-box">
      <h6 className="highlights__item-title">UV Index</h6>
      <div className="half-circle">
        <div className="value_circle"></div>
        <p className="uvIndexValueNumber three">3</p>
        <p className="uvIndexValueNumber six">6</p>
        <p className="uvIndexValueNumber nine">9</p>
        <p className="uvIndexValueNumber twelve">12</p>
        <p className="uvIndex_value">7</p>
      </div>
    </div>
  );
};

export default UvIndex;
