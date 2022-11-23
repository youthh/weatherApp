import React from "react";
import "./App.css";
import "./Reset.css";
import AppLayout from "./Components/AppLayout/AppLayout";
import InputComp from "./Components/SideBarWeather/Input";
import { useAppSelector } from "./Hooks/hooks";
import { getSearchCities } from "./Slices/searchSlice";

function App() {
  const { isLoadingSearchCity, searchCities } = useAppSelector(getSearchCities);

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
