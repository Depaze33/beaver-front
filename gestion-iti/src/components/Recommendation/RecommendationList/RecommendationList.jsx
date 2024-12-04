import { useEffect, useState } from 'react';
import RecoCard from "@/components/Recommendation/RecommendationList/RecoCard.jsx";
import PropTypes from "prop-types";

const RecommendationList = ({ filters }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recommandations, setRecommandations] = useState([]);

    const mapToDatabaseValue = (frontValue) => {
        const mapping = {
            hotel: "HOSTEL",
            restaurant: "RESTAURANT",
            bar: "BAR",
            cafe: "CAFE",
            fast_food: "FAST_FOOD",
            loisir: "LEISURE"
        };
        return mapping[frontValue.toLowerCase()] || null;
    };
    useEffect(() => {
        const fetchLocation = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8000/api/locations`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }

                const jsonResponse = await response.json();
                setRecommandations(jsonResponse);
            } catch (err) {
                setError("Could not fetch locations. Please try again later. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);
    useEffect(() => {
        const fetchRecommandation = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8000/api/recommendations`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }

                const jsonResponse = await response.json();
                setRecommandations(jsonResponse);
            } catch (err) {
                setError("Could not fetch locations. Please try again later. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommandation();
    }, []);

    const databaseFilters = filters.map(mapToDatabaseValue);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {recommandations
                .filter((reco) => {
                    // Vérifiez si location existe et a un locationType correspondant
                    return (
                        reco.location &&
                        reco.location.locationType &&
                        databaseFilters.includes(reco.location.locationType)
                    );
                })
                .map((reco) => {
                    const location = reco.location || {}; // Défaut à un objet vide si location est null
                    return (
                        <RecoCard
                            key={reco.id}
                            img="https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg"
                            type={location.locationType || "Type inconnu"}
                            title={location.name || "Nom inconnu"}
                            distance={40000}
                            comment={reco.comment || "Aucun commentaire"}
                        />
                    );
                })}
        </>
    );
};

RecommendationList.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
};

export default RecommendationList;
