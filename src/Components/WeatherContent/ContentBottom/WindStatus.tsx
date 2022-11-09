import React from "react";

type WindStatusProps = {
  wind: number;
};

const WindStatus = ({ wind }: WindStatusProps) => {
  return (
    <div className="highlights__item-box">
      <h6 className="highlights__item-title">Wind Status</h6>
      <div>
        <p className="speedOfWind">
          {wind} <span>km/h</span>
        </p>
      </div>
      <p className="highlights__item-description">Light breeze</p>
    </div>
  );
};

export default WindStatus;
