import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWeather } from "../Api/weatherService";
import {
  Coordinates,
  listItemWeather,
  Location,
  responseGetWeather,
} from "../Types/types";
import { RootState } from "../Redux/store";
import {
  getForeCastForToday,
  getWeatherWeek,
} from "../Logics/weatherSliceLogic";

export const getWeatherThunk = createAsyncThunk(
  "weather/getWeatherThunk",
  async (data: Coordinates) => {
    return await getWeather(data.lat, data.lon);
  }
);

interface initialState {
  forecastForWeek: listItemWeather[];
  location: Location;
  weatherToday: {
    weatherInterval: listItemWeather[];
    sun: { sunrise: number; sunset: number };
    wind: number;
    main: { max: number; min: number; tempNow: number; humidity: number };
    visibility: number;
    clouds: number;
    weather: {
      icon: string;
      description: string;
    };
  };
}

const initialState: initialState = {
  forecastForWeek: [],
  location: {
    country: "UA",
    city: "Kiev",
    lon: 49,
    lat: 30,
  },
  weatherToday: {
    weatherInterval: [],
    sun: { sunrise: 0, sunset: 0 },
    wind: 0,
    main: { max: 0, min: 0, tempNow: 0, humidity: 0 },
    visibility: 0,
    clouds: 0,
    weather: {
      icon: "01d",
      description: "",
    },
  },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,

  reducers: {
    setCoordinates: (state, action) => {
      state.location = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getWeatherThunk.fulfilled,
      (state, action: PayloadAction<responseGetWeather>) => {
        console.log(action.payload);
        state.location = {
          country: action.payload.city.country,
          city: action.payload.city.name,
          lon: action.payload.city.coord.lon,
          lat: action.payload.city.coord.lat,
        };
        state.weatherToday.sun = {
          sunrise: action.payload.city.sunrise,
          sunset: action.payload.city.sunset,
        };

        state.weatherToday.clouds = action.payload.list[0].clouds.all;
        state.weatherToday.main.max = action.payload.list[0].main.temp_max;
        state.weatherToday.main.min = action.payload.list[0].main.temp_min;
        state.weatherToday.main.tempNow = action.payload.list[0].main.temp;
        state.weatherToday.main.humidity = action.payload.list[0].main.humidity;
        state.weatherToday.visibility = action.payload.list[0].visibility;
        state.weatherToday.wind = action.payload.list[0].wind.speed;
        state.weatherToday.weather = action.payload.list[0].weather[0];

        state.weatherToday.weatherInterval = getForeCastForToday(
          action.payload.list
        );

        state.forecastForWeek = getWeatherWeek(action.payload.list);
      }
    );
  },
});

export const weatherSelector = (state: RootState) => {
  return {
    lat: state.weatherSlice.location.lat,
    lon: state.weatherSlice.location.lon,
    city: state.weatherSlice.location.city,
    country: state.weatherSlice.location.country,
    sunset: state.weatherSlice.weatherToday.sun.sunset,
    sunrise: state.weatherSlice.weatherToday.sun.sunrise,
    forecastForWeek: state.weatherSlice.forecastForWeek,
  };
};

export const getCurrentWeatherTodaySelector = (state: RootState) => {
  return {
    tepmMin: Math.round(state.weatherSlice.weatherToday.main.min),
    tepmMax: Math.round(state.weatherSlice.weatherToday.main.max),
    humidity: state.weatherSlice.weatherToday.main.humidity,
    wind: Math.round(state.weatherSlice.weatherToday.wind),
    cloud: state.weatherSlice.weatherToday.clouds,
    visible: state.weatherSlice.weatherToday.visibility,
    temp: Math.round(state.weatherSlice.weatherToday.main.tempNow),
    weather: state.weatherSlice.weatherToday.weather,
    weatherIntervalDay: state.weatherSlice.weatherToday.weatherInterval,
  };
};

export const { setCoordinates } = weatherSlice.actions;

export default weatherSlice.reducer;
