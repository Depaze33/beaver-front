import {useEffect, useState} from 'react';
import RecoCard from "@/components/Recommendation/RecommendationList/RecoCard.jsx";

const RecommendationList = () => {
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

    return (
        <>
            {recommandations.map((reco)=>{
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


export default RecommendationList;
