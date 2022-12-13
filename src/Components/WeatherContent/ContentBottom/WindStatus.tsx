import React from "react";
import { useAppSelector } from "../../../Hooks/hooksRedux";
import { weatherSelector } from "../../../Slices/weatherSlice";

type WindStatusProps = {
  wind: number;
};

const WindStatus = ({ wind }: WindStatusProps) => {
  return (
    <>
      <h6 className="highlights__item-title">Wind Status</h6>
      <div>
        <p className="speedOfWind">
          {wind} <span>km/h</span>
        </p>
      </div>
      <p className="highlights__item-description">Light breeze</p>
    </>
  );
};

export default WindStatus;
