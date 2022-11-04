import React, { useEffect, useState } from "react";
import "./SideBarWeather.css";
import home from "../../Images/HomeIcon.svg";
import search from "../../Images/SearchIcon.svg";
import cloud from "../../Images/Cloudy.svg";
import { weekDay } from "../../Data/WeekDay";
import { useAppSelector } from "../../Hooks/hooks";
import { weatherSelector } from "../../Slices/weatherSlice";
const SideBarWeather = () => {
  const { city, country } = useAppSelector(weatherSelector);
  const [data, setData] = useState({
    hours: new Date().getHours(),
    min: new Date().getMinutes(),
  });
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setData((prevState) => {
        return (prevState = {
          hours: date.getHours(),
          min: date.getMinutes(),
        });
      });
    }, 60000);
  });
  return (
    <div className="sidebar__inner">
      <div className="sidebar__top">
        <div className="sidebar_box--input">
          <img src={search} alt="search" />
          <input
            placeholder="search for places ..."
            className="sidebar__input"
            type="text"
          />
        </div>
        <button className="sidebar__btn--home">
          <img src={home} alt="home" />
        </button>
      </div>
      <div className="box__sidebar--weather-icon">
        <img src={cloud} alt="cloud" />
      </div>
      <div className="box__sidebar__weather--info">
        <p className="box_sidebar__weather--temperature">9°</p>
        <span className="box_sidebar__weather--temperature-format">C</span>
        <h1 className="box_sidebar__weather--city">{city + ",  " + country}</h1>
        <p className="box_sidebar__weather--date">
          {weekDay[new Date().getDay()]},
        </p>
        <p className="box_sidebar__weather--time">
          {data.hours + ":" + data.min}
        </p>
      </div>
      <div>
        <p className="clouds">Clouds - 75%</p>
        <p className="clouds">Broken clouds</p>
      </div>
    </div>
  );
};

export default SideBarWeather;
