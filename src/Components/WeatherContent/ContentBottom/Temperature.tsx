import React from "react";
import tempHot from "../../../Images/tempHot.svg";
import tempCold from "../../../Images/tempCold.svg";
import { useAppSelector } from "../../../Hooks/hooks";
import { weatherSelector } from "../../../Slices/weatherSlice";
const Temperature = () => {
  return (
    <div className="highlights__item-box">
      <h6 className="highlights__item-title">Min & Max temperature</h6>
      <div className={"temperature__box"}>
        <img src={tempCold} alt="temp" />
        <p>7°</p>
      </div>
      <div className="temperature__box">
        <img src={tempHot} alt="temp" />
        <p>9°</p>
      </div>
    </div>
  );
};

export default Temperature;
