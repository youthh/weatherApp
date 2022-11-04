import React from "react";

const Humidity = () => {
  return (
    <div className="highlights__item-box">
      <h6 className="highlights__item-title">Humidity</h6>
      <div className="box__humidity">
        <p className="humidity">
          81<span>%</span>
        </p>
        <div className="box_humidity-value">
          <div style={{ height: "81%" }}></div>
        </div>
      </div>
      <p className="highlights__item-description">Miserable</p>
    </div>
  );
};

export default Humidity;
