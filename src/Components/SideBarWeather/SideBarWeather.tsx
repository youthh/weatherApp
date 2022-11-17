import React, { useState } from "react";
import "./SideBarWeather.css";
import home from "../../Images/HomeIcon.svg";
import search from "../../Images/SearchIcon.svg";
import countOfClouds from "../../Images/CountOfClouds.svg";
import brokenCloud from "../../Images/brokenCloud.svg";
import { weekDay } from "../../Data/WeekDay";
import { useAppSelector } from "../../Hooks/hooks";
import {
  getCurrentWeatherTodaySelector,
  weatherSelector,
} from "../../Slices/weatherSlice";
import { getWeatherIcon } from "../../Data/weatherIconsData";
import { getCurrentTime } from "../../Data/converDate";
import InputComp from "./Input";
import { SearchCityFields } from "../../Types/types";

interface SideBarWeatherProps {
  getWeatherOnSearchCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
}

const SideBarWeather = ({
  getWeatherOnSearchCity,
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
    <div className="sidebar__inner">
      <div className="sidebar__top">
        <InputComp
          isLoadingSearchCity={isLoadingSearchCity}
          searchCities={searchCities}
          getWeatherOnSearchCity={getWeatherOnSearchCity}
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
            <img src={countOfClouds} alt="" /> Clouds - {cloud}%
          </p>
          <p className="clouds broken__clouds">
            <img src={brokenCloud} alt="cloud_description" />
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBarWeather;
