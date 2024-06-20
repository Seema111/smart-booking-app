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

/**
 * @description Generates a map component with a custom marker icon representing
 * Kathmandu, Nepal.
 * 
 * @param { React Element or a React Node. } children - content that will be displayed
 * inside the map container.
 * 
 * 	* `children`: The input children element passed to the component.
 * 
 * 	The returned JSX is constructed using the `div`, `className`, `col-6`,
 * `location-children`, and `location-map-view` classes. The `MapContainer` component
 * is used to render a map with the `center` prop set to `[27.7172, 85.324]`, and the
 * `zoom` prop set to 50. The `TileLayer` component is used to load a tile layer with
 * the `url` prop set to `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`. The
 * `attribution` prop is set to `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`.
 * A `Marker` component is used to add a marker at the position `[27.7172, 85.324]`.
 * Finally, a `Popup` component is used to display the label "Kathmandu, Nepal" when
 * the marker is clicked.
 * 
 * @returns { HTMLDivElement, specifically a div with the class "parent-container }
 * a responsive HTML container that displays a map and a location marker for Kathmandu,
 * Nepal.
 * 
 * 	* `<div className="row parent-container">`: This element is a container for the
 * rest of the content on the page, and it has a `className` attribute set to `"parent-container"`.
 * 	* `<div className="col-6 location-children">{children}</div>`: This element is a
 * column that takes up 50% of the width of its parent container. Its `className`
 * attribute is set to `"location-children"`, and it contains the content passed in
 * as an argument (`{children}`).
 * 	* `<div className="col-6 location-map-view">`: This element is another column
 * that takes up 50% of the width of its parent container. Its `className` attribute
 * is set to `"location-map-view"`, and it contains a `MapContainer` component inside
 * it.
 * 	* `<div className="card">`: This element is a container for the map view, and it
 * has a `className` attribute set to `"card"`.
 * 	* `<h2 className="card-title">`: This element is the title of the map view, and
 * it has a `className` attribute set to `"card-title"`.
 * 	* `<div className="card-body" style={{ ... }}>`: This element is the main content
 * area of the map view, and it has a `className` attribute set to `"card-body"`. It
 * contains a `MapContainer` component inside it.
 * 	* `<TileLayer>`: This element is a Tile Layer component that loads a tile map
 * from an URL. Its `url` attribute is set to `"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"`,
 * where `{s}` is the server variable, `{z}` and `{x}` are the zoom and x-coordinate
 * of the tile, respectively, and `{y}` is the y-coordinate of the tile. Its `attribution`
 * attribute is set to `'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'`.
 * 	* `<Marker position={kathmanduPosition} icon={customMarkerIcon}>`: This element
 * is a marker that displays the location of Kathmandu, Nepal. Its `position` attribute
 * is set to `{kathmanduPosition}`, which contains the coordinates of Kathmandu in
 * the format of (`latitude`, `longitude`). Its `icon` attribute is set to
 * `customMarkerIcon`, which is a custom icon that is not shown in the output.
 * 	* `<Popup>`: This element is a popup that displays the location name when the
 * marker is clicked. Its content is set to `"Kathmandu, Nepal"`.
 */

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
