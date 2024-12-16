import SearchBar from "@/components/Recommendation/Filter/SearchBar/SearchBar.jsx";
import { Button } from "@chakra-ui/react";
import './FilterBar.css';
import FilterDialog from "@/components/Div/Filter.jsx";
import PropTypes from "prop-types";  // Assuming Filter is the FiltersDialog component

const FilterBar = ({filters, onFilterChange}) => {



    return (
        <div className="filter">
            <SearchBar />
            <Button ml={2}>🌍</Button>
            <FilterDialog filters={filters} onFilterChange={onFilterChange} />
        </div>
    );
}
FilterBar.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    onFilterChange: PropTypes.func,
};
export default FilterBar;
