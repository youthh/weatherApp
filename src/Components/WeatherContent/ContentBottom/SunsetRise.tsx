import React from "react";
import ArrowTop from "../../../Images/ArrowTop.svg";
import ArrowBot from "../../../Images/ArrowBottom.svg";
import { useAppSelector } from "../../../Hooks/hooksRedux";
import { weatherSelector } from "../../../Slices/weatherSlice";
import { getCurrentTime } from "../../../Data/converDate";
const SunsetRise = () => {
  const { sunrise, sunset, timezone } = useAppSelector(weatherSelector);

  return (
    <>
      <h6 className="highlights__item-title">Sunrise & Sunset</h6>
      <div className="temp_max-box">
        <img src={ArrowTop} alt="arrow" />
        <p>{getCurrentTime(sunrise, timezone)}</p>
      </div>
      <div className="temp_max-box">
        <img src={ArrowBot} alt="arrow" />
        <p>{getCurrentTime(sunset, timezone)}</p>
      </div>
    </>
  );
};

export default SunsetRise;
