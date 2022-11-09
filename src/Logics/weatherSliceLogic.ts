import { listItemWeather } from "../Types/types";

export const getWeatherWeek = (list: listItemWeather[]) => {
  return list.filter((day: listItemWeather) => {
    if (new Date(day.dt_txt).getHours() === 12) {
      list.map((item: listItemWeather) => {
        if (
          new Date(item.dt_txt).getHours() === 3 &&
          new Date(item.dt_txt).getDay() === new Date(day.dt_txt).getDay()
        ) {
          day.main.temp_min = item.main.temp_min;
        }
      });
      return day;
    }
  });
};

export const getForeCastForToday = (list: listItemWeather[]) => {
  return list.filter((item: listItemWeather) => {
    if (new Date().getDay() === new Date(item.dt * 1000).getDay()) {
      return item;
    }
  });
};
