import { instance } from "./axiousInstance";

export const getWeather = (lat: number | null, lon: number | null) => {
  return instance
    .get(
      `?lat=${lat}&lon=${lon}&appid=2c07b8cc95e07c9de397352f452f6324&units=metric`
    )
    .then((response) => {
      return response.data;
    });
};
