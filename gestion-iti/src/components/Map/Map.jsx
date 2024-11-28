import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import useGeoLocation from "../Hook/Hooks.jsx";
import Filters from '../Div/Filter.jsx'; // Import du composant Filters
import L from "leaflet";
import './Map.css'

// Icône rouge pour le marqueur de la position
const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
});

// Icône bleue pour les autres marqueurs
const blueIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
});

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
            // Inverser x et y en lat et lng
            const { x, y } = result.location;
            const lat = y;  // y devient lat
            const lng = x;  // x devient lng

            // Vérification si les coordonnées sont valides avant de les utiliser
            if (lat !== undefined && lng !== undefined) {
                // Créez un marqueur avec l'icône rouge (redIcon) pour la recherche géolocalisée
                const searchMarker = new L.Marker([lat, lng], {
                    icon: redIcon,  // Utilisation de l'icône rouge
                    draggable: false,
                });

                // Ajoutez ce marqueur à la carte
                map.addLayer(searchMarker);

                // Mettez à jour la position après la recherche
                onSearch([lat, lng]);  // On passe les coordonnées sous la forme [lat, lng]
            } else {
                console.error("Invalid coordinates received from geosearch:", result.location);
                alert("Unable to find valid coordinates for this location. Please try again.");
            }
        });


        return () => map.removeControl(searchControl);
    }, [map, onSearch]);

    return null;
};

SearchControl.propTypes = {
    onSearch: PropTypes.func,
};

// Composant RecherchMarkers avec filtres
const RecherchMarkers = ({ coords, filters }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState({});

    useEffect(() => {
        if (!coords || filters.length === 0) return;

        const fetchLocations = async () => {
            setLoading(true);
            setError(null);

            const [latitude, longitude] = coords;
            const radius = 1000; // Rayon de recherche en mètres

            const typesQuery = filters
                .map((type) => `nwr["amenity"="${type}"](around:${radius},${latitude},${longitude});
                                       nwr["tourism"="${type}"](around:${radius},${latitude},${longitude});`)
                .join(" ");

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
                setError("Could not fetch locations. Please try again later." + err);
            } finally {
                setLoading(false);
            }
        };
        const fetchWithDynamicRadius = async () => {
            let radius = 5000; // Start with 5 km radius
            let locations = [];
            let attempt = 0;

            while (locations.length > 50 && radius > 500 && attempt < 5) {
                locations = await fetchLocations(radius);
                attempt++;
                if (locations.length > 50) {
                    radius = Math.max(500, radius / 2); // Reduce radius but not below 500 meters
                }
            }

            setLocations(locations);
            setLoading(false);
        };

        fetchWithDynamicRadius();
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
                    icon={blueIcon} // Applique l'icône bleue pour les lieux autour
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

    // Ne pas afficher la carte si la géolocalisation n'est pas disponible ou activée
    if (!isGeolocationAvailable) {
        return <div>Your browser does not support Geolocation</div>;
    }

    if (!isGeolocationEnabled) {
        return <div>Geolocation is not enabled</div>;
    }

    if (!coords) {
        return <div>Getting your location&hellip;</div>;
    }

    // Gérer la fin du drag du marqueur
    const handleMarkerDragEnd = (event) => {
        const { lat, lng } = event.target.getLatLng();
        setMarkerPosition([lat, lng]);

        // Récupère l'instance de la carte via l'événement et récentre la carte
        const map = event.target._map;
        map.setView([lat, lng], map.getZoom());  // Réinitialise la vue de la carte sur la nouvelle position
    };

    // Gérer la recherche géolocalisée
    const handleSearch = (newPosition) => {
        if (newPosition && newPosition[0] !== undefined && newPosition[1] !== undefined) {
            setMarkerPosition(newPosition); // Mettre à jour la position avec la recherche
        } else {
            console.error("Invalid coordinates received from search.");
            alert("Unable to get valid coordinates for this address.");
        }
    };

    // Gérer les filtres
    const toggleFilter = (filter) => {
        setFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    return (
        <div className="map-container">
            <Filters filters={filters} onFilterChange={toggleFilter} />
            <MapContainer
                center={markerPosition || [coords.latitude, coords.longitude]}  // Utilise markerPosition comme centre
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%" }}
                whenCreated={(map) => {
                    // S'assurer que la carte suit le marqueur après chaque changement de position
                    if (markerPosition) {
                        map.setView(markerPosition, 14);  // Réinitialise la vue de la carte sur la nouvelle position
                    }
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerPosition && (
                    <Marker
                        position={markerPosition}
                        icon={redIcon}  // Applique l'icône rouge pour la position
                        draggable={true}
                        eventHandlers={{
                            dragend: handleMarkerDragEnd,
                        }}
                    >
                        <Popup>Your position</Popup>
                    </Marker>
                )}
                {/* Affichage des marqueurs des lieux uniquement si des filtres sont sélectionnés */}
                {filters.length > 0 && markerPosition && (
                    <RecherchMarkers coords={markerPosition} filters={filters} />
                )}
                <SearchControl onSearch={handleSearch} />
            </MapContainer>
        </div>
    );
};

export default Map;
