import React from "react";
import "./WeatherContentTop.css";
const WeatherContentTop = () => {
  return (
    <div className="content__top-container">
      <div className="content__top-date-tabs">
        <div className="content__top-date">Today</div>
        <div className="content__top-date active">Week</div>
      </div>
      <div className="content__top--formatTemp-box">
        <button className="content__top--btn active">°C</button>
        <button className="content__top--btn">°F</button>
      </div>
    </div>
  );
};

export default WeatherContentTop;
