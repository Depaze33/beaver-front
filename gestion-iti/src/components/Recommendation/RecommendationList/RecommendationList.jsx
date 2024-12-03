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
                setError("Could not fetch locations. Please try again later. " + err);
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
                    // Vérifiez si le type de location est dans les filtres mappés
                    return databaseFilters.includes(reco.location.locationType);
                })
                .map((reco) => {
                    return (
                        <RecoCard
                            key={reco.id}
                            img="https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg"
                            type={reco.location.locationType}
                            title={reco.location.name}
                            distance={40000}
                            comment={reco.comment}
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
