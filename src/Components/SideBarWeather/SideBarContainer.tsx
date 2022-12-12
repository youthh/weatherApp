import React, { useEffect, useState } from "react";
import SideBarWeather from "./SideBarWeather";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooksRedux";
import {
  CurrentWeatherTodaySelector,
  weatherSelector,
} from "../../Slices/weatherSlice";
import {
  SearchCitiesSelector,
  getSearchCityWeatherThunk,
} from "../../Slices/searchSlice";
import useDebounce from "../../Hooks/useDebounce";

const SideBarContainer = () => {
  const { city, country, measurementSign, timezone, isLoadingWeather } =
    useAppSelector(weatherSelector);
  const { isLoadingSearchCity, searchCities, searchValue } =
    useAppSelector(SearchCitiesSelector);
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const { temp, cloud, description, icon } = useAppSelector(
    CurrentWeatherTodaySelector
  );
  const [date, setDate] = useState<number>(new Date().getTime());
  setInterval(() => {
    setDate(new Date().getTime());
  }, 60000);

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
        icon={icon}
        description={description}
        country={country}
        city={city}
        cloud={cloud}
        date={date}
        isLoadingWeather={isLoadingWeather}
        temp={temp}
      />
    </div>
  );
};

export default SideBarContainer;
