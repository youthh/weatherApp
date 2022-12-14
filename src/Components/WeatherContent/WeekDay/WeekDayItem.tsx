import React, { PropsWithChildren } from "react";
import "./WeekDayItem.css";
import { getCurrentTime } from "../../../Data/converDate";
import { weekDay } from "../../../Data/WeekDay";
import { CircularProgress } from "@mui/material";
import { dayItemProps } from "../../../Data/Interface/interface";

const WeekDayItem = ({
  isWeekDayTab,
  periodTimeOfday,
  weatherIcon,
  maxTemp,
  mintemp,
  timezone,
  tab,
  isLoadingWeather,
}: dayItemProps) => {
  const WeeklyOrHourlyForecast = isWeekDayTab
    ? weekDay[new Date(+periodTimeOfday * 1000).getDay()].slice(0, 3)
    : getCurrentTime(periodTimeOfday, timezone);
  return (
    <div
      className={
        "week__day-item-box " +
        (tab === "day" || tab === "week" ? "activeTab " : "") +
        (isWeekDayTab ? " week" : "") +
        (isLoadingWeather ? " loading" : " ")
      }
    >
      {isLoadingWeather ? (
        <CircularProgress />
      ) : (
        <>
          <h6 className={"week__day-item-day "}>{WeeklyOrHourlyForecast}</h6>
          <img className="week__day-item-img" src={weatherIcon} alt="sunny" />
          <div className="week__day-item-temp-box">
            <p className="week__day-item-temp-day">{mintemp}°</p>
            <p className="week__day-item-temp-night">{maxTemp}°</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeekDayItem;
