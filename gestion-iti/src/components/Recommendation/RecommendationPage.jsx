import  {useState} from 'react'
import FilterBar from './Filter/FilterBar.jsx'
import Filter from '@/components/Div/Filter.jsx'
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";

const RecommendationPage = () => {
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
            <FilterBar/>
            <Filter filters={filters} onFilterChange={handleFilterChange}  />
            <RecommendationList filters={filters}  />
        </div>

    )
}
export default RecommendationPage
