import React, { useEffect, useState } from "react";
import SideBarWeather from "../SideBarWeather/SideBarWeather";
import "./AppLayout.css";
import "../../Style/mediaStyle.css";
import WeatherContentTop from "../WeatherContent/ContentTop/WeatherContentTop";
import WeekDayContainer from "../WeatherContent/WeekDay/WeekDayContainer";
import ContentBottom from "../WeatherContent/ContentBottom/ContentBottom";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import {
  getWeatherThunk,
  setCoordinates,
  weatherSelector,
} from "../../Slices/weatherSlice";
import { Box, CircularProgress } from "@mui/material";
import SideBarContainer from "../SideBarWeather/SideBarContainer";
const AppLayout = () => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("day");
  const { measurement, lon, lat } = useAppSelector(weatherSelector);
  const [isLoading, setLoading] = useState(false);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function error(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
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
    <div className="app__layout-inner">
      <SideBarContainer />
      <div className="weather__content">
        <WeatherContentTop
          setTab={setTab}
          tab={tab}
          measurement={measurement}
          coord={{ lat, lon }}
        />
        <WeekDayContainer tab={tab} />
        <ContentBottom />
      </div>
    </div>
  );
};

export default AppLayout;
