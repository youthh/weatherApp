import React from "react";
import "./Content__bottom.css";
import WindStatus from "./WindStatus";
import SunsetRise from "./SunsetRise";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import Temperature from "./Temperature";
import { useAppSelector } from "../../../Hooks/hooks";
import {
  getCurrentWeatherTodaySelector,
  weatherSelector,
} from "../../../Slices/weatherSlice";
import SimpleMap from "../Map/GoogleMap";
import UvIndex from "./UVIndex";
import { getWeather } from "../../../Api/weatherService";
import { CircularProgress } from "@mui/material";

type ContentBottomProps = {
  children: React.ReactNode[];
};

const ContentBottom = ({ children }: ContentBottomProps) => {
  const { isLoadingWeather } = useAppSelector(weatherSelector);

  return (
    <div className="box__highlights">
      <h3 className="content__bottom--title">Today’s Highlights</h3>
      <div className="box__highlights-bottom">
        <div className="highlights__items">
          {children.map((reactNode, index) => {
            return isLoadingWeather ? (
              <div
                key={index}
                className="highlights__item-box loadingHighLightsBox"
              >
                <CircularProgress />
              </div>
            ) : (
              <div key={index} className="highlights__item-box">
                {reactNode}
              </div>
            );
          })}
        </div>
        <SimpleMap />
      </div>
    </div>
  );
};

export default ContentBottom;
