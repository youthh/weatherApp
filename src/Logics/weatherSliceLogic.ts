import { listItemWeather, responseGetWeather } from "../Types/types";
import { getCurrentTime } from "../Data/converDate";

export const getWeatherWeek = (list: listItemWeather[], timezone: number) => {
  return list.filter((day: listItemWeather) => {
    const utc_seconds =
      parseInt(String(day.dt), 10) + parseInt(String(timezone), 10);
    const date = new Date(utc_seconds * 1000).getUTCHours();
    if (date === 11 || date === 13 || date == 12) {
      list.map((item: listItemWeather) => {
        const utc_seconds2 =
          parseInt(String(item.dt), 10) + parseInt(String(timezone), 10);
        const date = new Date(utc_seconds2 * 1000).getUTCHours();

        if (
          date === 1 ||
          date === 4 ||
          (date === 2 &&
            new Date(utc_seconds2 * 1000).getUTCDay() ===
              new Date(utc_seconds * 1000).getUTCDay())
        ) {
          day.main.temp_min = Math.min(day.main.temp_min, item.main.temp_min);
        }
      });
      return day;
    }
  });
};

export const getForeCastForToday = (
  list: listItemWeather[],
  timezone: number
) => {
  const currentDt =
    parseInt(String(list[0].dt), 10) + parseInt(String(timezone), 10);
  return list.filter((item: listItemWeather) => {
    const utc_seconds =
      parseInt(String(item.dt), 10) + parseInt(String(timezone), 10);

    if (
      new Date(currentDt * 1000).getUTCDate() ===
      new Date(utc_seconds * 1000).getUTCDate()
    ) {
      return item;
    }
  });
};

export const getDataWeatherToday = (
  data: responseGetWeather,
  metrik: string
) => {
  const { temp_min, temp_max, temp, humidity } = data.list[0].main;
  const { sunrise, sunset, timezone } = data.city;
  const clouds = data.list[0].clouds.all;
  const { icon, description } = data.list[0].weather[0];
  const visibility = data.list[0].visibility;

  const wind =
    metrik === "metric"
      ? Math.round(data.list[0].wind.speed * 3.6)
      : Math.round(1.609344 * data.list[0].wind.speed);

  return {
    wind,
    humidity,
    temp_min,
    temp_max,
    temp,
    timezone,
    sunrise,
    sunset,
    clouds,
    icon,
    description,
    visibility,
  };
};

export const getDataLocation = (data: responseGetWeather) => {
  const { country, timezone } = data.city;
  const city = data.city.name;
  const { lat, lon } = data.city.coord;

  return {
    timezone,
    country,
    city,
    lat,
    lon,
  };
};
