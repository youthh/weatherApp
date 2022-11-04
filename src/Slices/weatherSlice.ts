import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeather } from "../Api/weatherService";
import { Coordinates } from "../Types/types";
import { RootState } from "../Redux/store";

export const getWeatherThunk = createAsyncThunk(
  "weather/getWeatherThunk",
  async (data: Coordinates) => {
    return await getWeather(data.lat, data.lon);
  }
);

interface initialState {
  forecast: [];
  locationCoordinates: Coordinates;
  location: { country: string; city: string };
  weatherToday: {
    sun: { sunrise: number; sunset: number };
  };
}

const initialState: initialState = {
  forecast: [],
  weatherToday: {
    sun: { sunrise: 0, sunset: 0 },
  },
  locationCoordinates: { lat: 40.73, lon: -73.93 },
  location: { country: "US", city: "New York" },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,

  reducers: {
    setCoordinates: (state, action) => {
      state.locationCoordinates = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getWeatherThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.location = {
        country: action.payload.city.country,
        city: action.payload.city.name,
      };
      state.weatherToday.sun = {
        sunrise: action.payload.city.sunrise,
        sunset: action.payload.city.sunset,
      };
      state.forecast = action.payload.list;
    });
  },
});

export const weatherSelector = (state: RootState) => {
  return {
    lat: state.weatherSlice.locationCoordinates.lat,
    lon: state.weatherSlice.locationCoordinates.lon,
    city: state.weatherSlice.location.city,
    country: state.weatherSlice.location.country,
    sunset: state.weatherSlice.weatherToday.sun.sunset,
    sunrise: state.weatherSlice.weatherToday.sun.sunrise,
  };
};

export const { setCoordinates } = weatherSlice.actions;

export default weatherSlice.reducer;
