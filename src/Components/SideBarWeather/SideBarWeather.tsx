import React from "react";
import "./SideBarWeather.css";

import countOfClouds from "../../Images/CountOfClouds.svg";
import brokenCloud from "../../Images/brokenCloud.svg";
import { weekDay } from "../../Data/WeekDay";
import { getWeatherIcon } from "../../Data/weatherIconsData";
import { getCurrentTime } from "../../Data/converDate";
import InputComp from "./Input";
import { SearchCityFields } from "../../Types/types";
import { CircularProgress } from "@mui/material";

interface SideBarWeatherProps {
  icon: string;
  temp: number;
  city: string;
  country: string;
  date: string | number;
  description: string;
  cloud: number;
  isLoadingSearchCity: boolean;
  searchCities: SearchCityFields[];
  measurementSign: string;
  timezone: number;
  isLoadingWeather: boolean;
}

const SideBarWeather = ({
  isLoadingWeather,
  icon,
  country,
  cloud,
  date,
  temp,
  description,
  searchCities,
  city,
  isLoadingSearchCity,
  measurementSign,
  timezone,
}: SideBarWeatherProps) => {
  return (
    <div
      className={
        "sidebar__inner" +
        (isLoadingWeather ? " loading " : "") +
        (isLoadingWeather && window.innerWidth < 980
          ? " weatherActiveFetchingSidebar "
          : "")
      }
    >
      {isLoadingWeather ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <div className="sidebar__top">
            <InputComp
              isLoadingSearchCity={isLoadingSearchCity}
              searchCities={searchCities}
            />
          </div>
          <div className="box__sidebar--weather-icon">
            <img
              src={getWeatherIcon(icon)[0].img}
              className="box__sidebar__weather--img"
              alt="cloud"
            />
          </div>
          <div className="box_sidebar__weather-bottom">
            <div className="box__sidebar__weather--info">
              <p className="box_sidebar__weather--temperature">{temp}°</p>
              <span className="box_sidebar__weather--temperature-format">
                {measurementSign}
              </span>
              <h1 className="box_sidebar__weather--city">
                {city + ",  " + country}
              </h1>
              <p className="box_sidebar__weather--date">
                {weekDay[new Date().getDay()]},
              </p>
              <p className="box_sidebar__weather--time">
                {getCurrentTime(Number(date) / 1000, timezone)}
              </p>
            </div>
            <div>
              <p className="clouds">
                <img src={countOfClouds} alt="" /> Clouds: {cloud}%
              </p>
              <p className="clouds broken__clouds">
                <img src={brokenCloud} alt="cloud_description" />
                {description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBarWeather;
