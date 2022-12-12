import React, { useEffect, useState } from "react";

import "../../AppLayout/AppLayout.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooksRedux";
import { getWeatherThunk, weatherSelector } from "../../../Slices/weatherSlice";
import { MarkerProps } from "../../../Data/Types/types";

function MyMarker() {
  const { lat, lon, measurement } = useAppSelector(weatherSelector);

  const dispatch = useAppDispatch();
  const mapEvents = useMapEvents({
    click: (e) => {
      dispatch(
        getWeatherThunk({
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          measurement,
        })
      );
    },
  });

  useEffect(() => {
    mapEvents.flyTo([lat, lon], 10);
  }, [lat]);
  return (
    <Marker position={[lat, lon]}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function SimpleMap() {
  const { lat, lon } = useAppSelector(weatherSelector);
  return (
    <div className="map_box">
      <MapContainer
        style={{ width: " 100%", height: "100%" }}
        center={[lat ? lat : 0, lon ? lon : 0]}
        zoom={7}
        scrollWheelZoom={false}
        ha
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarker />
      </MapContainer>
    </div>
  );
}
