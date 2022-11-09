import React, { useState } from "react";
import SideBarWeather from "./SideBarWeather";
import { useAppSelector } from "../../Hooks/hooks";
import {
  getCurrentWeatherTodaySelector,
  weatherSelector,
} from "../../Slices/weatherSlice";

const SideBarContainer = () => {
  const { city, country } = useAppSelector(weatherSelector);
  const { temp, cloud, weather } = useAppSelector(
    getCurrentWeatherTodaySelector
  );
  const [date, setDate] = useState<number | string>(new Date().getTime());
  setInterval(() => {
    setDate(new Date().getTime());
  }, 60000);

  return (
    <div>
      <SideBarWeather
        icon={weather.icon}
        description={weather.description}
        country={country}
        city={city}
        cloud={cloud}
        date={date}
        temp={temp}
      />
    </div>
  );
};

export default SideBarContainer;
