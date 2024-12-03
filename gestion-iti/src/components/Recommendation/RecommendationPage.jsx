import  {useState} from 'react'
import FilterBar from './Filter/FilterBar.jsx'
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";

const RecommendationPage = () => {
    const [filters, setFilters] = useState(["restaurant", "bar", "cafe","hotel","fast_food","loisir"]); // Filtres par
    // défaut

    const onFilterChange = (filter) => {
        setFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter) // Remove filter
                : [...prevFilters, filter] // Add filter
        );
    };

    return (
        <div>
            <FilterBar filters={filters} onFilterChange={onFilterChange} />
            <RecommendationList filters={filters}  />
        </div>

    )
}
export default RecommendationPage
