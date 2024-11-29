import  {useState} from 'react'
import FilterBar from './Filter/FilterBar.jsx'
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";

const Recommendation = () => {
    const [filters, setFilters] = useState(["restaurant", "bar", "cafe","hotel","fast_food"]); // Filtres par défaut

    const handleFilterChange = (filter) => {
        setFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter) // Remove filter
                : [...prevFilters, filter] // Add filter
        );
    };

    return (
        <div>

            <FilterBar filter={filters} onFilterChange={handleFilterChange} />
            <RecommendationList filter={filters}  />
        </div>

    )
}
export default Recommendation
