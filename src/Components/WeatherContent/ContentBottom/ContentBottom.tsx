import React from "react";
import "./Content__bottom.css";
import WindStatus from "./WindStatus";
import SunsetRise from "./SunsetRise";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import Temperature from "./Temperature";
const ContentBottom = () => {
  return (
    <div>
      <h3 className="content__bottom--title">Today’s Highlights</h3>
      <div className="highlights__items">
        <WindStatus />
        <SunsetRise />
        <Humidity />
        <Visibility />
        <Temperature />
      </div>
    </div>
  );
};

export default ContentBottom;
