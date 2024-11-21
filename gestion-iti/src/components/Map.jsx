import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "./Hook/Hooks.jsx";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch"; // Hook pour la géolocalisation
import L from "leaflet";

const RestaurantMarkers = ({ coords }) => {
    const [bars, setBars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!coords) return;

        const fetchBars = async () => {
            setLoading(true);
            setError(null);
            console.log("Fetching bars for coordinates:", coords);

            const { latitude, longitude } = coords;
            const radius = 1000; // Rayon de recherche en mètres

            const query = `[out:json][timeout:25];
               nwr["amenity"="restaurant"](around:${radius},${latitude},${longitude});
                out geom;`;

            try {
                console.log("Query:", query);
                const response = await fetch(
                    `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
                );

                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                console.log("Fetched data:", data);

                setBars(data.elements || []);
            } catch (err) {
                console.error("Error fetching bars:", err);
                setError("Could not fetch bars. Try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBars();
    }, [coords]);

    if (loading) return <div>Loading bars around you...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {bars.map((bar) => (
                <Marker
                    key={bar.id}
                    position={[bar.lat ?? bar.bounds.maxlat, bar.lon ?? bar.bounds.maxlon]}
                >
                    <Popup>
                        <strong>{bar.tags?.name || "Unnamed Bar"}</strong>
                        <br />
                        Type: {bar.tags?.cuisine || "Unknown"}
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

const SearchControl = () => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: "button",
            showMarker: true,
            retainZoomLevel: false,
            animateZoom: true,
            autoClose: true,
            searchLabel: "Enter address",
            keepResult: true,
        });

        map.addControl(searchControl);

        return () => map.removeControl(searchControl);
    }, [map]);

    return null;
};

const Map = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeoLocation();

    if (!isGeolocationAvailable) {
        return <div>Your browser does not support Geolocation</div>;
    }

    if (!isGeolocationEnabled) {
        return <div>Geolocation is not enabled</div>;
    }

    if (!coords) {
        return <div>Getting your location&hellip;</div>;
    }

    console.log("User coordinates:", coords);

    const position = [coords.latitude, coords.longitude];

    return (
        <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>You are here!</Popup>
            </Marker>
            <RestaurantMarkers coords={coords} />
            <SearchControl />
        </MapContainer>
    );
};

export default Map;
