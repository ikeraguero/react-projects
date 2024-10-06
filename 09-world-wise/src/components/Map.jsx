import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
function Map() {
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [mapPostion, setMapPosition] = useState([45, 40]);

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        className={styles.map}
        center={mapPostion}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPostion}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
