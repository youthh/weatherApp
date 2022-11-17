import React, { useEffect, useState } from "react";
import SideBarWeather from "./SideBarWeather";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import {
  getCurrentWeatherTodaySelector,
  weatherSelector,
} from "../../Slices/weatherSlice";
import {
  getSearchCities,
  getSearchCityWeatherThunk,
} from "../../Slices/searchSlice";
import useDebounce from "../../Hooks/useDebounce";

const SideBarContainer = () => {
  const { city, country, measurementSign, timezone } =
    useAppSelector(weatherSelector);
  const { isLoadingSearchCity, searchCities } = useAppSelector(getSearchCities);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const { temp, cloud, description, icon } = useAppSelector(
    getCurrentWeatherTodaySelector
  );
  const [date, setDate] = useState<number | string>(new Date().getTime());
  setInterval(() => {
    setDate(new Date().getTime());
  }, 60000);

  const getWeatherOnSearchCity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      dispatch(getSearchCityWeatherThunk(searchValue));
    }
  }, [debouncedValue]);

  return (
    <div>
      <SideBarWeather
        timezone={timezone}
        measurementSign={measurementSign}
        isLoadingSearchCity={isLoadingSearchCity}
        searchCities={searchCities}
        getWeatherOnSearchCity={getWeatherOnSearchCity}
        icon={icon}
        description={description}
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
