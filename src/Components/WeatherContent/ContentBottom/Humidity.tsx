import React from "react";

type HumidityProps = {
  humidity: number;
};

const Humidity = ({ humidity }: HumidityProps) => {
  return (
    <div className="highlights__item-box">
      <h6 className="highlights__item-title">Humidity</h6>
      <div className="box__humidity">
        <p className="humidity">
          {humidity}
          <span>%</span>
        </p>
        <div className="box_humidity-value">
          <div style={{ height: humidity + "%" }}></div>
        </div>
      </div>
      <p className="highlights__item-description">Miserable</p>
    </div>
  );
};

export default Humidity;
