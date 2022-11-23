import React, { useEffect, useState } from "react";
import "./AppLayout.css";
import WeatherContentTop from "../WeatherContent/ContentTop/WeatherContentTop";
import WeekDayContainer from "../WeatherContent/WeekDay/WeekDayContainer";
import ContentBottom from "../WeatherContent/ContentBottom/ContentBottom";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import {
  getCurrentWeatherTodaySelector,
  getWeatherThunk,
  setCoordinates,
  weatherSelector,
} from "../../Slices/weatherSlice";
import { Box, CircularProgress } from "@mui/material";
import SideBarContainer from "../SideBarWeather/SideBarContainer";
import UvIndex from "../WeatherContent/ContentBottom/UVIndex";
import WindStatus from "../WeatherContent/ContentBottom/WindStatus";
import SunsetRise from "../WeatherContent/ContentBottom/SunsetRise";
import Humidity from "../WeatherContent/ContentBottom/Humidity";
import Visibility from "../WeatherContent/ContentBottom/Visibility";
import Temperature from "../WeatherContent/ContentBottom/Temperature";
const AppLayout = () => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("day");
  const [isLoading, setLoading] = useState(true);
  const { measurement, lon, lat } = useAppSelector(weatherSelector);
  const { humidity, wind, tepmMax, tepmMin, visible } = useAppSelector(
    getCurrentWeatherTodaySelector
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
    <div className="boxCircle">
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
          <UvIndex />
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
