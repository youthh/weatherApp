import React from "react";

const WindStatus = () => {
  return (
    <div className="highlights__item-box">
      <h6 className="highlights__item-title">Wind Status</h6>
      <div>
        <p className="speedOfWind">
          2 <span>km/h</span>
        </p>
      </div>
      <p className="highlights__item-description">Light breeze</p>
    </div>
  );
};

export default WindStatus;
