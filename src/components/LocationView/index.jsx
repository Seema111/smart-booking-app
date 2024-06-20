/* eslint-disable react/prop-types */
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import IconMarker from "../../assets/images/pindrop.jpg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.scss";

const customMarkerIcon = new L.Icon({
  iconUrl: IconMarker, // Provide the URL to your custom marker icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationView = ({ children }) => {
  // Coordinates for Kathmandu, Nepal
  const kathmanduPosition = [27.7172, 85.324];
  return (
    <div className="row parent-container">
      <div className="col-6 location-children">{children}</div>
      <div className="col-6 location-map-view">
        <div className="card">
          <h2
            className="card-title"
            style={{ padding: "1rem 1rem 0.5rem 1rem" }}
          >
            <i className="bi bi-geo-alt"></i>
            <span className="ml-5">Explore Our Location</span>
          </h2>
          <div
            className="card-body"
            style={{
              height: "70vh",
              width: "100%",
              borderRadius: "25px",
              overflow: "hidden",
              padding: "0 1rem 1rem 1rem",
            }}
          >
            <MapContainer
              center={kathmanduPosition}
              zoom={50}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={kathmanduPosition} icon={customMarkerIcon}>
                <Popup>Kathmandu, Nepal</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationView;
