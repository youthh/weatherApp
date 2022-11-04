import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherSlice from "../Slices/weatherSlice";

export const store = configureStore({
  reducer: {
    weatherSlice,
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