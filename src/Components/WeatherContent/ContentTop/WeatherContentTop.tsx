import React, { useState } from "react";
import "./WeatherContentTop.css";

type WeatherContentTopProps = {
  tab: string;
  setTab: (tab: string) => void;
};

const WeatherContentTop = ({ tab, setTab }: WeatherContentTopProps) => {
  return (
    <div className="content__top-container">
      <div className="content__top-date-tabs">
        <div
          className={"content__top-date " + (tab === "day" ? "active" : "")}
          onClick={() => {
            setTimeout(() => setTab("day"), 200);
          }}
        >
          Today
        </div>
        <div
          className={"content__top-date " + (tab === "week" ? "active" : "")}
          onClick={() => {
            setTimeout(() => setTab("week"), 200);
          }}
        >
          Week
        </div>
      </div>
      <div className="content__top--formatTemp-box">
        <button className="content__top--btn active">°C</button>
        <button className="content__top--btn">°F</button>
      </div>
    </div>
  );
};

export default WeatherContentTop;
