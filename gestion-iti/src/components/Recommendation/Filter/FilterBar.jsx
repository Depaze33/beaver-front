import React from 'react';
import SearchBar from "@/components/Recommendation/Filter/SearchBar/SearchBar.jsx";
import { Button } from "@chakra-ui/react";
import './FilterBar.css'

const FilterBar = () => {
    return (
        <div className="filter">
            <SearchBar />
            <Button ml={2}>🌍</Button>
        </div>


    );
}

export default FilterBar;
