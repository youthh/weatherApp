import React, { useState } from "react";
import search from "../../Images/SearchIcon.svg";
import "./SideBarWeather.css";
import { SearchCityFields } from "../../Data/Types/types";
import { getWeatherThunk, weatherSelector } from "../../Slices/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooksRedux";
import { CircularProgress } from "@mui/material";
import { setSearchValue } from "../../Slices/searchSlice";
type InputCompProps = {
  searchCities: SearchCityFields[];
  isLoadingSearchCity: boolean;
};

const WeatherInput = ({
  isLoadingSearchCity,
  searchCities,
}: InputCompProps) => {
  const dispatch = useAppDispatch();
  const { measurement } = useAppSelector(weatherSelector);

  const [isShowInputSearchFilter, setShowInputSearchFilter] = useState("");
  return (
    <div className="sidebar_box--input">
      <img src={search} alt="search" />
      <input
        placeholder="search for places ..."
        className="sidebar__input"
        type="text"
        onChange={(event) => {
          dispatch(setSearchValue(event.target.value));
          setShowInputSearchFilter(event.target.value);
        }}
      />

      {isShowInputSearchFilter && (
        <div
          className={
            "box__search--city " +
            (isLoadingSearchCity ? "box__search--city--fetching" : "")
          }
        >
          {isLoadingSearchCity ? (
            <CircularProgress />
          ) : (
            <ul>
              {searchCities.map((cities, index) => {
                return (
                  <li
                    onClick={() => {
                      dispatch(
                        getWeatherThunk({
                          lat: cities.lat,
                          lon: cities.lon,
                          measurement,
                        })
                      );
                      setShowInputSearchFilter("");
                    }}
                    className="search__city--item"
                    key={index}
                  >
                    {cities.name}, {cities.country} {cities?.state}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherInput;
