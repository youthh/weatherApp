import React, { PropsWithChildren } from "react";
import sun from "../../../Images/sunny.svg";
import "./WeekDayItem.css";
import { dayItemProps } from "../../../Types/types";
import { getCurrentTime } from "../../../Data/converDate";
import { weekDay } from "../../../Data/WeekDay";

const WeekDayItem = ({
  isWeekDayTab,
  periodTimeOfday,
  weatherIcon,
  maxTemp,
  mintemp,
  tab,
}: dayItemProps) => {
  return (
    <div
      className={
        "week__day-item-box " +
        (tab === "day" || tab === "week" ? "activeTab" : "")
      }
    >
      <h6 className="week__day-item-day">
        {isWeekDayTab
          ? weekDay[new Date(+periodTimeOfday * 1000).getDay()]
          : getCurrentTime(periodTimeOfday)}
      </h6>
      <img className="week__day-item-img" src={weatherIcon} alt="sunny" />
      <div className="week__day-item-temp-box">
        <p className="week__day-item-temp-day">{mintemp}°</p>
        <p className="week__day-item-temp-night">{maxTemp}°</p>
      </div>
    </div>
  );
};

export default WeekDayItem;
