import React, { useState } from "react";
// import "../css/components/Mapp.css";
// import * as parkData from "../data/skateboard-parks.json";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// const skater = new Icon({
//   iconUrl: "./skateboarding.svg",
//   iconSize: [25, 25],
// });

const Mapp = () => {
  const defaultPosition = [-6.44712525, 106.84958524];

  const [activePark, setActivePark] = useState(null);
  return (
    <div className="map-width-cont margin-map">
      <MapContainer center={defaultPosition} zoom={13} id="mapid">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          // key={park.properties.PARK_ID}
          position={defaultPosition}
          // position={[
          //   park.geometry.coordinates[1],
          //   park.geometry.coordinates[0],
          // ]}
          // icon={skater}
        >
          {/* <Popup>
              <div>
                <h2>{park.properties.NAME}</h2>
                <p>{park.properties.DESCRIPTIO}</p>
              </div>
            </Popup> */}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapp;
