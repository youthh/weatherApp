import React from "react";
import "./App.css";
import "./Reset.css";
import "../src/Style/mediaStyle.css";
import AppLayout from "./Components/AppLayout/AppLayout";

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
