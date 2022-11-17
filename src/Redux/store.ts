import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherSlice from "../Slices/weatherSlice";
import searchSlice from "../Slices/searchSlice";

export const store = configureStore({
  reducer: {
    weatherSlice,
    searchSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
