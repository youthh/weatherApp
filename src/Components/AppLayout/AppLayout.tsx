import React, { useEffect } from "react";
import SideBarWeather from "../SideBarWeather/SideBarWeather";
import "./AppLayout.css";
import WeatherContentTop from "../WeatherContent/ContentTop/WeatherContentTop";
import WeekDay from "../WeatherContent/WeekDay/WeekDay";
import ContentBottom from "../WeatherContent/ContentBottom/ContentBottom";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import {
  getWeatherThunk,
  setCoordinates,
  weatherSelector,
} from "../../Slices/weatherSlice";
const AppLayout = () => {
  const dispatch = useAppDispatch();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const { lat, lon } = useAppSelector(weatherSelector);

  function success(pos: { coords: any }) {
    const crd = pos.coords;
    dispatch(
      setCoordinates({
        lat: crd.latitude.toFixed(2),
        lon: crd.longitude.toFixed(2),
      })
    );
  }

  function error(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    //dispatch(getWeatherThunk({ lat, lon }));
  }, []);

  navigator.geolocation.getCurrentPosition(success, error, options);
  return (
    <div className="app__layout-inner">
      <SideBarWeather />
      <div className="weather__content">
        <WeatherContentTop />
        <WeekDay />
        <ContentBottom />
      </div>
    </div>
  );
};

export default AppLayout;
