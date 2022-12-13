import React, { useState } from "react";
import "./WeatherContentTop.css";
import { useAppDispatch } from "../../../Hooks/hooksRedux";
import {
  getWeatherThunk,
  setMeasurement,
  setMeasurementSign,
} from "../../../Slices/weatherSlice";
import { Coordinates } from "../../../Data/Types/types";

type WeatherContentTopProps = {
  tab: string;
  setTab: (tab: string) => void;
  measurement: string;
  coord: Coordinates;
};

const WeatherContentTop = ({
  tab,
  setTab,
  measurement,
  coord,
}: WeatherContentTopProps) => {
  const dispatch = useAppDispatch();
  const { lat, lon } = coord;
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
        <button
          className={
            "content__top--btn " + (measurement === "metric" ? "active" : "")
          }
          onClick={() => {
            dispatch(setMeasurement("metric"));
            dispatch(setMeasurementSign("C"));
            dispatch(getWeatherThunk({ lat, lon, measurement: "metric" }));
          }}
        >
          °C
        </button>
        <button
          className={
            "content__top--btn " + (measurement === "imperial" ? "active" : "")
          }
          onClick={() => {
            dispatch(setMeasurement("imperial"));
            dispatch(setMeasurementSign("F"));
            dispatch(getWeatherThunk({ lat, lon, measurement: "imperial" }));
          }}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default WeatherContentTop;
