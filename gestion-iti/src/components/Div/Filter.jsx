import React from "react";
import PropTypes from "prop-types";

const Filters = ({ filters, onFilterChange }) => {
    const filterOptions = ["hostel", "restaurant", "bar", "cafe", "fast_food"];

    return (
        <div className="filters">
            {filterOptions.map((filter) => (
                <label key={filter} className="filter-label">
                    <input
                        type="checkbox"
                        checked={filters.includes(filter)}
                        onChange={() => onFilterChange(filter)}
                        className="filter-checkbox"
                    />
                    {filter}
                </label>
            ))}
        </div>
    );
};

Filters.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
