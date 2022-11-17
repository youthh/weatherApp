import React from "react";
import WeekDayItem from "./WeekDayItem";
import { useAppSelector } from "../../../Hooks/hooks";
import {
  getCurrentWeatherTodaySelector,
  weatherSelector,
} from "../../../Slices/weatherSlice";
import { getWeatherIcon } from "../../../Data/weatherIconsData";
import { listItemWeather } from "../../../Types/types";

type WeekDayContainerProps = {
  tab: string;
};

const WeekDayContainer = ({ tab }: WeekDayContainerProps) => {
  const { HourlyForecast } = useAppSelector(getCurrentWeatherTodaySelector);
  const { forecastForWeek, timezone } = useAppSelector(weatherSelector);
  return (
    <div
      className={
        "week__day--container " +
        (tab === "day" || tab === "week" ? "activeTab" : "")
      }
    >
      {tab === "day"
        ? HourlyForecast.map((item: listItemWeather, index) => {
            return (
              <WeekDayItem
                timezone={timezone}
                tab={tab}
                isWeekDayTab={false}
                key={index}
                periodTimeOfday={item.dt}
                maxTemp={Math.round(item.main.temp_max)}
                mintemp={Math.round(item.main.temp_min)}
                weatherIcon={getWeatherIcon(item.weather[0].icon)[0].img}
              />
            );
          })
        : forecastForWeek.map((item: listItemWeather, index) => {
            return (
              <WeekDayItem
                tab={tab}
                isWeekDayTab={true}
                key={index}
                periodTimeOfday={item.dt}
                maxTemp={Math.round(item.main.temp_max)}
                mintemp={Math.round(item.main.temp_min)}
                weatherIcon={getWeatherIcon(item.weather[0].icon)[0].img}
              />
            );
          })}
    </div>
  );
};

export default WeekDayContainer;
