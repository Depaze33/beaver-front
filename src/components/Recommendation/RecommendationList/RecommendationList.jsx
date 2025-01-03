import {useEffect, useState} from 'react';
import RecoCard from "@/components/Recommendation/RecommendationList/RecoCard.jsx";
import PropTypes from "prop-types";
import URL_API from '../../../apiConfig/urlApi';


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
    // const [selectedPosition, setSelectedPosition] = useState(null);

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

                let response = null;
                if (mapId !== undefined) { // cas avec un mapId pour récupérer toutes les recommendations liées à un
                    // lieu existant sur OSM
                    response = await fetch(`${URL_API}/api/recommendations?mapId=${mapId}`, {
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    });
                } else { // cas sans mapId pour tout récupérer
                    response = await fetch(`${URL_API}/api/recommendations`, {
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    });
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }

                const jsonResponse = await response.json();
                setRecommandations(jsonResponse);
            } catch (err) {
                setError("Could not fetch locations. Please try again later. " + err.message);
                setRecommandations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommandation();
    }, [mapId]);

    // const databaseFilters = filters.map(mapToDatabaseValue);

    return (
        <>
            {loading && <p>Loading...</p>}
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
                            // onShowOnMap={() => setSelectedPosition(reco.coordinates)} // Passez les coordonnées au clic

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
