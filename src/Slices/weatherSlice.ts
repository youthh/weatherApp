import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWeather } from "../Api/weatherService";
import { Location } from "../Data/Types/types";
import { RootState } from "../Redux/store";
import {
  getDataLocation,
  getDataWeatherToday,
  getForeCastForToday,
  getWeatherWeek,
} from "../Logics/weatherSliceLogic";
import {
  listItemWeather,
  responseGetWeather,
} from "../Data/Interface/interface";

export const getWeatherThunk = createAsyncThunk(
  "weather/getWeatherThunk",
  async (data: { lat: number; lon: number; measurement: string }) => {
    return await getWeather(data.lat, data.lon, data.measurement);
  }
);

interface initialState {
  isLoadingWeather: boolean;
  forecastForWeek: listItemWeather[];
  HourlyForecast: listItemWeather[];
  location: Location;
  weatherToday: {
    sunrise: number;
    sunset: number;
    wind: number;
    temp_max: number;
    temp_min: number;
    temp: number;
    humidity: number;
    visibility: number;
    clouds: number;
    icon: string;
    description: string;
  };
  measurement: string;
  measurementSign: string;
  isAllowAccessLocation: boolean;
}

const initialState: initialState = {
  isLoadingWeather: false,
  forecastForWeek: [],
  HourlyForecast: [],
  location: {
    timezone: 0,
    country: "UA",
    city: "Kiev",
    lon: 49,
    lat: 30,
  },
  weatherToday: {
    sunrise: 0,
    sunset: 0,
    wind: 0,
    temp_max: 0,
    temp_min: 0,
    temp: 0,
    humidity: 0,
    visibility: 0,
    clouds: 0,
    icon: "01d",
    description: "",
  },
  measurementSign: "C",
  measurement: "metric",
  isAllowAccessLocation: false,
};

const weather = createSlice({
  name: "weather",
  initialState,

  reducers: {
    setCoordinates: (state, action) => {
      state.location = action.payload;
    },
    setSearchCoordinate: (state, action) => {
      state.location.lon = action.payload.lon;
      state.location.lat = action.payload.lat;
    },
    setMeasurement: (state, action: PayloadAction<string>) => {
      state.measurement = action.payload;
    },
    setMeasurementSign: (state, action) => {
      state.measurementSign = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getWeatherThunk.pending, (state, action) => {
      state.isLoadingWeather = true;
    });
    builder.addCase(
      getWeatherThunk.fulfilled,
      (state, action: PayloadAction<responseGetWeather>) => {
        state.isLoadingWeather = false;

        state.location = getDataLocation(action.payload);
        state.weatherToday = getDataWeatherToday(
          action.payload,
          state.measurement
        );

        state.HourlyForecast = getForeCastForToday(
          action.payload.list,
          action.payload.city.timezone
        );

        state.forecastForWeek = getWeatherWeek(
          action.payload.list,
          action.payload.city.timezone
        );
      }
    );
    builder.addCase(getWeatherThunk.rejected, (state, action) => {
      state.isLoadingWeather = false;
    });
  },
});

export const weatherSelector = (state: RootState) => {
  return {
    lat: state.weather.location.lat,
    lon: state.weather.location.lon,
    city: state.weather.location.city,
    country: state.weather.location.country,
    sunset: state.weather.weatherToday.sunset,
    sunrise: state.weather.weatherToday.sunrise,
    forecastForWeek: state.weather.forecastForWeek,
    measurement: state.weather.measurement,
    measurementSign: state.weather.measurementSign,
    timezone: state.weather.location.timezone,
    isLoadingWeather: state.weather.isLoadingWeather,
  };
};

export const CurrentWeatherTodaySelector = (state: RootState) => {
  return {
    tepmMin: Math.round(state.weather.weatherToday.temp_min),
    tepmMax: Math.round(state.weather.weatherToday.temp_max),
    humidity: state.weather.weatherToday.humidity,
    wind: Math.round(state.weather.weatherToday.wind),
    cloud: state.weather.weatherToday.clouds,
    visible: state.weather.weatherToday.visibility,
    temp: Math.round(state.weather.weatherToday.temp),
    description: state.weather.weatherToday.description,
    icon: state.weather.weatherToday.icon,
    HourlyForecast: state.weather.HourlyForecast,
  };
};

export const { setMeasurement, setMeasurementSign } = weather.actions;

export default weather.reducer;
