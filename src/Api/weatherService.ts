import { API_KEY_WEATHER, instance } from "./axiousInstance";
import { useSelector } from "react-redux";
import { weatherSelector } from "../Slices/weatherSlice";

export const getWeather = (
  lat: number | null,
  lon: number | null,
  measurement: string
) => {
  return instance
    .get(
      `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=` +
        measurement
    )
    .then((response) => {
      return response.data;
    });
};

export const getSearchWeatherCity = (cityName: string) => {
  return instance
    .get(`/geo/1.0/direct?q=${cityName}&limit=3&appid=${API_KEY_WEATHER}`)
    .then((response) => response.data);
};
