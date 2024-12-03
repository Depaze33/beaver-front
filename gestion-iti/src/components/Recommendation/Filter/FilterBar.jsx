import  { useState } from 'react';
import SearchBar from "@/components/Recommendation/Filter/SearchBar/SearchBar.jsx";
import { Button } from "@chakra-ui/react";
import './FilterBar.css';
import Filter from "@/components/Div/Filter.jsx";  // Assuming Filter is the FiltersDialog component

const FilterBar = () => {
    // State to hold the selected filters
    const [filters, setFilters] = useState(["hotel", "restaurant", "bar", "cafe", "fast_food", "loisir"]);

    // Function to handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="filter">
            <SearchBar />
            <Button ml={2}>🌍</Button>
            <Filter filters={filters} onFilterChange={handleFilterChange} />
        </div>
    );
}

export default FilterBar;
