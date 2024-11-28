import  {useState} from 'react'
import FilterBar from './Filter/FilterBar.jsx'
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";
const Recommendation = () => {
    const [filters, setFilters] = useState([]);

    const handleFilterChange = (filter) => {
        setFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter) // Remove filter
                : [...prevFilters, filter] // Add filter
        );
    };

    return (
        <div>

            <FilterBar />
            <RecommendationList filters={filters} />
        </div>

    )
}
export default Recommendation
