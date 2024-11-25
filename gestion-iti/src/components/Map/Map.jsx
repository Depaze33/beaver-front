import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "../Hook/Hooks.jsx";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";

// Icône rouge pour le marqueur
const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
});


// Composant RecherchMarkers avec filtres
const RecherchMarkers = ({ coords, filters }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState({}); // État pour les notes par ID de location

    useEffect(() => {
        if (!coords || filters.length === 0) return;

        const fetchLocations = async () => {
            setLoading(true);
            setError(null);

            const [latitude, longitude] = coords;
            const radius = 5000; // Rayon de recherche en mètres

            // Construire la requête Overpass API en fonction des filtres sélectionnés
            const typesQuery = filters
                .map((type) => `nwr["amenity"="${type}"](around:${radius},${latitude},${longitude});`)
                .join("");

            const query = `data=${encodeURIComponent(
                `[out:json];
        (${typesQuery});
        out geom;`
            )}`;

            try {
                const response = await fetch(`https://overpass-api.de/api/interpreter`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: query,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setLocations(data.elements || []);
            } catch (err) {
                setError("Could not fetch locations. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [coords, filters]);

    const handleNoteChange = (locationId, note) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            [locationId]: note,
        }));
    };

    if (loading) return <div>Loading locations...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={[location.lat ?? location.bounds.maxlat, location.lon ?? location.bounds.maxlon]}
                >
                    <Popup>
                        <strong>{location.tags?.name || "Unnamed Location"}</strong>
                        <br />
                        Type: {location.tags?.cuisine || location.tags?.tourism || "Unknown"}
                        <br />
                        <div>
                            <p>Rate this place:</p>
                            <div style={{ display: "flex", gap: "5px" }}>
                                {["👍", "😐", "👎"].map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => handleNoteChange(location.id, emoji)}
                                        style={{
                                            fontSize: "1.5rem",
                                            background: notes[location.id] === emoji ? "#ddd" : "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                            {notes[location.id] && <p>Note: {notes[location.id]}</p>}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};


RecherchMarkers.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.number),
    filters: PropTypes.arrayOf(PropTypes.string),
};

// Composant SearchControl pour la recherche géolocalisée
const SearchControl = ({ onSearch }) => {
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

        map.on("geosearch/showlocation", (result) => {
            const { lat, lng } = result.location;
            onSearch([lat, lng]);
        });

        return () => map.removeControl(searchControl);
    }, [map, onSearch]);

    return null;
};

SearchControl.propTypes = {
    onSearch: PropTypes.func,
};

// Composant Map avec filtres pour les types de lieux
const Map = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeoLocation();
    const [markerPosition, setMarkerPosition] = useState(null);
    const [filters, setFilters] = useState(["restaurant", "bar", "cafe"]); // Filtres par défaut

    useEffect(() => {
        if (coords) {
            setMarkerPosition([coords.latitude, coords.longitude]);
        }
    }, [coords]);

    if (!isGeolocationAvailable) {
        return <div>Your browser does not support Geolocation</div>;
    }

    if (!isGeolocationEnabled) {
        return <div>Geolocation is not enabled</div>;
    }

    if (!coords) {
        return <div>Getting your location&hellip;</div>;
    }

    const handleMarkerDragEnd = (event) => {
        const { lat, lng } = event.target.getLatLng();
        setMarkerPosition([lat, lng]);
    };

    const handleSearch = (newPosition) => {
        setMarkerPosition(newPosition);
    };

    const toggleFilter = (filter) => {
        setFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    return (
        <div className="map-container">
            <div className="filters">
                {["hostel", "restaurant", "bar", "cafe", "fast_food"].map((filter) => (
                    <label key={filter} className="filter-label">
                        <input
                            type="checkbox"
                            checked={filters.includes(filter)}
                            onChange={() => toggleFilter(filter)}
                            className="filter-checkbox"
                        />
                        {filter}
                    </label>
                ))}
            </div>
            <MapContainer
                center={markerPosition || [coords.latitude, coords.longitude]}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerPosition && (
                    <Marker
                        position={markerPosition}
                        icon={redIcon}
                        draggable={true}
                        eventHandlers={{
                            dragend: handleMarkerDragEnd,
                        }}
                    >
                        <Popup>Your position</Popup>
                    </Marker>
                )}
                {markerPosition && <RecherchMarkers coords={markerPosition} filters={filters} />}
                <SearchControl onSearch={handleSearch} />
            </MapContainer>
        </div>
    );
};

export default Map;
