import React from "react";
import GoogleMapReact from "google-map-react";
import "../../AppLayout/AppLayout.css";
export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 40.99835602,
      lng: 38.01502627,
    },
    zoom: 11,
  };

  return (
    <div className="map_box">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBPAN9GOUr1d1bFXPbFvCbGjDteeXWr5Dc" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  );
}
