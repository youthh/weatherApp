import React from "react";
import "./App.css";
import "./Reset.css";
import AppLayout from "./Components/AppLayout/AppLayout";
import WeatherInput from "./Components/SideBarWeather/WeatherInput";
import { useAppSelector } from "./Hooks/hooksRedux";
import { SearchCitiesSelector } from "./Slices/searchSlice";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="inner__app">
          <AppLayout />
        </div>
      </div>
    </div>
  );
}

export default App;
