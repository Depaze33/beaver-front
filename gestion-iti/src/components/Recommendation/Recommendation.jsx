import React, { useState } from "react";
import FilterBar from "@/components/Div/Filter.jsx";
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";

const Recommendation = () => {
    const [filters, setFilters] = useState(["restaurant", "bar", "cafe"]); // Filtres par défaut

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        console.log("Updated filters:", newFilters); // Débogage
    };

    return (
        <div>
            <h1>Recommendations</h1>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <RecommendationList filters={filters} />
        </div>
    );
};

export default Recommendation;
