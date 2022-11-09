import React from "react";
import "./Content__bottom.css";
import WindStatus from "./WindStatus";
import SunsetRise from "./SunsetRise";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import Temperature from "./Temperature";
import { useAppSelector } from "../../../Hooks/hooks";
import { getCurrentWeatherTodaySelector } from "../../../Slices/weatherSlice";
import SimpleMap from "../Map/GoogleMap";
import UvIndex from "./UVIndex";
const ContentBottom = () => {
  const { humidity, wind, tepmMax, tepmMin, visible } = useAppSelector(
    getCurrentWeatherTodaySelector
  );

  return (
    <div className="box__highlights">
      <h3 className="content__bottom--title">Today’s Highlights</h3>
      <div className="box__highlights-bottom">
        <div className="highlights__items">
          <UvIndex />
          <WindStatus wind={wind} />
          <SunsetRise />
          <Humidity humidity={humidity} />
          <Visibility visible={visible} />
          <Temperature tepmMax={tepmMax} tepmMin={tepmMin} />
        </div>
        <SimpleMap />
      </div>
    </div>
  );
};

export default ContentBottom;
