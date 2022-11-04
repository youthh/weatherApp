import React from "react";
import sun from "../../../Images/sunny.svg";
import "./WeekDayItem.css";
const WeekDayItem = () => {
  return (
    <div className="week__day-item-box">
      <h6 className="week__day-item-day">Mon</h6>
      <img className="week__day-item-img" src={sun} alt="sunny" />
      <div className="week__day-item-temp-box">
        <p className="week__day-item-temp-day">5°</p>
        <p className="week__day-item-temp-night">8°</p>
      </div>
    </div>
  );
};

export default WeekDayItem;
