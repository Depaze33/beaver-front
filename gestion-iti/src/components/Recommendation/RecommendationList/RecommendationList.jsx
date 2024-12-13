import {useEffect, useState} from 'react';
import RecoCard from "@/components/Recommendation/RecommendationList/RecoCard.jsx";
import PropTypes from "prop-types";


/**
 *
 * @param filters
 * @param mapId : id to map
 * @returns {JSX.Element} information displayed on the recommendations page
 * @constructor
 */
const RecommendationList = ({filters, mapId}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recommandations, setRecommandations] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);


    function getImageByType(type) {
        switch (type) {
            case "HOSTEL":
                return "hotel.png";
            case "RESTAURANT":
                return "restaurant-picto.png"

            case "LEISURE":
                return "bar.png"; // Image pour les musées
            default:
                return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"; // Image par défaut
        }
    }

    const mapToDatabaseValue = (frontValue) => {
        const mapping = {
            hotel: "HOSTEL",
            restaurant: "RESTAURANT",
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
                setError("Could not fetch locations. Please try again later. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommandation();
    }, []);

    // const databaseFilters = filters.map(mapToDatabaseValue);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {recommandations
                // .filter((reco) => {
                //     // Vérifiez si location existe et a un locationType correspondant
                //     return (
                //         reco.location &&
                //         reco.location.locationType &&
                //         // databaseFilters.includes(reco.location.locationType)
                //     );
                // })
                .map((reco) => {
                    const location = reco.location || {}; // Défaut à un objet vide si location est null
                    return (
                        <RecoCard
                            key={reco.id}
                            img={getImageByType(location.locationType) || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                            type={location.locationType || "Type inconnu"}
                            title={location.name || "Nom inconnu"}
                            distance={40000}
                            comment={reco.comment || "Aucun commentaire"}
                            onShowOnMap={() => setSelectedPosition(reco.coordinates)} // Passez les coordonnées au clic

                        />
                    );
                })}
        </>
    );
};

RecommendationList.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    mapId: PropTypes.number
};

export default RecommendationList;
