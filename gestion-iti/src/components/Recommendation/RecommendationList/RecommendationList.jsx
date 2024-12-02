import {useEffect, useState} from 'react';
import RecoCard from "@/components/Recommendation/RecommendationList/RecoCard.jsx";
import PropTypes from "prop-types";

const RecommendationList = ({filters}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState({});

    const [recommandations, setRecommandations] = useState([])

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
                setError("Could not fetch locations. Please try again later." + err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommandation();
    }, []);
// filter.prompt en filter en bd
//     une fct js qui prend en entrée la chaine de caractère qui renvoie la coo en bdd
    return (
        <>
            {recommandations.filter((reco)=>{
                 console.log(reco)
                console.log(filters.includes[reco.location.locationType])
                    return(
                        filters.includes[reco.location.locationType]
                    )})

                .map((reco)=>{
                return <RecoCard
                    key={reco.id}
                    img="https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg"
                    type={reco.location.locationType}
                    title={reco.location.name}
                    distance={40000}
                    comment={reco.comment}/>
            })};

        </>
    );
};
RecommendationList.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
};


export default RecommendationList;
