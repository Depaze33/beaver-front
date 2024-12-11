import  {useState} from 'react'
import FilterBar from './Filter/FilterBar.jsx'
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";
import './RecommendationList/RecommendationPage.css'

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
        <div className="card-page">
            <FilterBar filters={filters} onFilterChange={onFilterChange} />
            <RecommendationList filters={filters}  />
        </div>

    )
}
export default RecommendationPage
