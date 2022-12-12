import React from "react";
import tempHot from "../../../Images/tempHot.svg";
import tempCold from "../../../Images/tempCold.svg";
import { useAppSelector } from "../../../Hooks/hooksRedux";
import { weatherSelector } from "../../../Slices/weatherSlice";

type TemperatureProps = {
  tepmMax: number;
  tepmMin: number;
};

const Temperature = ({ tepmMax, tepmMin }: TemperatureProps) => {
  return (
    <>
      <h6 className="highlights__item-title">Min & Max temperature</h6>
      <div className={"temperature__box"}>
        <img src={tempCold} alt="temp" />
        <p>{tepmMin}°</p>
      </div>
      <div className="temperature__box">
        <img src={tempHot} alt="temp" />
        <p>{tepmMax}°</p>
      </div>
    </>
  );
};

export default Temperature;
