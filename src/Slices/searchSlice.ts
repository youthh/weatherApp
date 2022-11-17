import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSearchWeatherCity } from "../Api/weatherService";
import { SearchCityFields } from "../Types/types";
import { RootState } from "../Redux/store";

export const getSearchCityWeatherThunk = createAsyncThunk(
  "search/getSearchCityWeatherThunk",
  async (city: string) => {
    return await getSearchWeatherCity(city);
  }
);

type initialState = {
  isLoadingSearch: boolean;
  searchCities: SearchCityFields[];
};

const initialState: initialState = {
  isLoadingSearch: false,
  searchCities: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSearchCityWeatherThunk.pending, (state) => {
      state.isLoadingSearch = true;
    });
    builder.addCase(
      getSearchCityWeatherThunk.fulfilled,

      (state, action: PayloadAction<SearchCityFields[]>) => {
        state.searchCities = action.payload;
        state.isLoadingSearch = false;
      }
    );
  },
});

export const getSearchCities = (state: RootState) => {
  return {
    isLoadingSearchCity: state.searchSlice.isLoadingSearch,
    searchCities: state.searchSlice.searchCities,
  };
};

//export const {} = searchSlice.actions;

export default searchSlice.reducer;
