// ./components/Map.jsx

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGeolocated } from "react-geolocated";
import "leaflet/dist/leaflet.css";

const Map = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    // Mapping des emojis en fonction de la note
    const emojiMap = {
        1: "😡", // Très mécontent
        2: "😠", // Mécontent
        3: "😐", // Neutre
        4: "😊", // Satisfait
        5: "😍", // Très satisfait
    };

    // État pour gérer la note sélectionnée
    const [rating, setRating] = useState(3); // Note par défaut : Neutre

    if (!isGeolocationAvailable) {
        return <div>Your browser does not support Geolocation</div>;
    }

    if (!isGeolocationEnabled) {
        return <div>Geolocation is not enabled</div>;
    }

    // Attendez que les coordonnées soient disponibles avant d'afficher la carte
    if (!coords) {
        return <div>Getting the location data&hellip;</div>;
    }

    const position = [coords.latitude, coords.longitude];

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    <div>
                        <p>Your current rating:</p>
                        <h2>{emojiMap[rating]}</h2>
                        <p>Select your rating:</p>
                        <div>
                            {Object.keys(emojiMap).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setRating(Number(key))}
                                    style={{
                                        fontSize: "20px",
                                        margin: "5px",
                                        padding: "5px",
                                        cursor: "pointer",
                                        border: rating === Number(key) ? "2px solid blue" : "1px solid gray",
                                        borderRadius: "5px",
                                    }}
                                >
                                    {emojiMap[key]}
                                </button>
                            ))}
                        </div>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
