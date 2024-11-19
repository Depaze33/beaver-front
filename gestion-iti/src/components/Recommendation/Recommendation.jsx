import React from 'react'
import Filter from './Filter/FilterBar.jsx'
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";
const Recommendation = () => {
    return (
        <div><Filter/>
        <RecommendationList/>
        </div>

    )
}
export default Recommendation
