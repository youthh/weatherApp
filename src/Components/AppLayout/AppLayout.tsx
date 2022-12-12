import React, { useEffect, useState } from "react";
import "./AppLayout.css";
import WeatherContentTop from "../WeatherContent/ContentTop/WeatherContentTop";
import WeekDayContainer from "../WeatherContent/WeekDay/WeekDayContainer";
import ContentBottom from "../WeatherContent/ContentBottom/ContentBottom";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooksRedux";
import {
  CurrentWeatherTodaySelector,
  getWeatherThunk,
  weatherSelector,
} from "../../Slices/weatherSlice";
import { CircularProgress } from "@mui/material";
import {
  Visibility,
  Humidity,
  SunsetRise,
  WindStatus,
  UVIndex,
  Temperature,
} from "../WeatherContent/ContentBottom";
import SideBarContainer from "../SideBarWeather/SideBarContainer";
const AppLayout = () => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("day");
  const [isLoading, setLoading] = useState(true);
  const { measurement, lon, lat } = useAppSelector(weatherSelector);
  const { humidity, wind, tepmMax, tepmMin, visible } = useAppSelector(
    CurrentWeatherTodaySelector
  );
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function error(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    dispatch(
      getWeatherThunk({
        lat: 40.71427,
        lon: -74.00597,
        measurement,
      })
    ).then(() => setLoading(false));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLoading(true);

        dispatch(
          getWeatherThunk({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            measurement,
          })
        ).then(() => setLoading(false));
      },
      error,
      options
    );
  }, []);
  return isLoading ? (
    <div className="box_circle">
      <CircularProgress
        style={{
          opacity: isLoading ? "1" : "0",
          transition: ".3s",
        }}
        size={100}
      />
    </div>
  ) : (
    <div
      className="app__layout-inner"
      style={{ opacity: isLoading ? "0" : "1" }}
    >
      <SideBarContainer />
      <div className="weather__content">
        <WeatherContentTop
          setTab={setTab}
          tab={tab}
          measurement={measurement}
          coord={{ lat, lon }}
        />
        <WeekDayContainer tab={tab} />
        <ContentBottom>
          <UVIndex />
          <WindStatus wind={wind} />
          <SunsetRise />
          <Humidity humidity={humidity} />
          <Visibility visible={visible} />
          <Temperature tepmMax={tepmMax} tepmMin={tepmMin} />
        </ContentBottom>
      </div>
    </div>
  );
};

export default AppLayout;
