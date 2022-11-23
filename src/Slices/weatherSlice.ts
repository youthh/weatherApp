import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWeather } from "../Api/weatherService";
import { listItemWeather, Location, responseGetWeather } from "../Types/types";
import { RootState } from "../Redux/store";
import {
  getDataLocation,
  getDataWeatherToday,
  getForeCastForToday,
  getWeatherWeek,
} from "../Logics/weatherSliceLogic";

export const getWeatherThunk = createAsyncThunk(
  "weather/getWeatherThunk",
  async (data: {
    lat: number | null;
    lon: number | null;
    measurement: string;
  }) => {
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

const weatherSlice = createSlice({
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
    lat: state.weatherSlice.location.lat,
    lon: state.weatherSlice.location.lon,
    city: state.weatherSlice.location.city,
    country: state.weatherSlice.location.country,
    sunset: state.weatherSlice.weatherToday.sunset,
    sunrise: state.weatherSlice.weatherToday.sunrise,
    forecastForWeek: state.weatherSlice.forecastForWeek,
    measurement: state.weatherSlice.measurement,
    measurementSign: state.weatherSlice.measurementSign,
    timezone: state.weatherSlice.location.timezone,
    isLoadingWeather: state.weatherSlice.isLoadingWeather,
  };
};

export const getCurrentWeatherTodaySelector = (state: RootState) => {
  return {
    tepmMin: Math.round(state.weatherSlice.weatherToday.temp_min),
    tepmMax: Math.round(state.weatherSlice.weatherToday.temp_max),
    humidity: state.weatherSlice.weatherToday.humidity,
    wind: Math.round(state.weatherSlice.weatherToday.wind),
    cloud: state.weatherSlice.weatherToday.clouds,
    visible: state.weatherSlice.weatherToday.visibility,
    temp: Math.round(state.weatherSlice.weatherToday.temp),
    description: state.weatherSlice.weatherToday.description,
    icon: state.weatherSlice.weatherToday.icon,
    HourlyForecast: state.weatherSlice.HourlyForecast,
  };
};

export const {
  setSearchCoordinate,
  setCoordinates,
  setMeasurement,
  setMeasurementSign,
} = weatherSlice.actions;

export default weatherSlice.reducer;
