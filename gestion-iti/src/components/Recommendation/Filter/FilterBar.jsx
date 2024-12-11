import SearchBar from "@/components/Recommendation/Filter/SearchBar/SearchBar.jsx";
import {Button} from "@chakra-ui/react";
import "./FilterBar.css";
import FilterDialog from "@/components/Div/Filter.jsx";
import PropTypes from "prop-types";
import {useState} from "react";
import {CiLocationArrow1} from "react-icons/ci";// Utilisation de l'état React

const FilterBar = ({filters, onFilterChange}) => {
    const [isGeolocationActive, setIsGeolocationActive] = useState(false); // État pour activer/désactiver la géolocalisation

    // Fonction pour gérer le clic sur le bouton de géolocalisation
    const toggleGeolocation = () => {
        setIsGeolocationActive((prev) => !prev);
    };

    return (
        <div className="filter">
            <SearchBar/>
            <Button
                variant="outline" size="sm"
                ml={2}
                onClick={toggleGeolocation}
                colorScheme={isGeolocationActive ? "teal" : "gray"} // Change la couleur en fonction de l'état
            >
                <CiLocationArrow1/>
            </Button>
            <FilterDialog filters={filters} onFilterChange={onFilterChange}/>
        </div>
    );
};

FilterBar.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    onFilterChange: PropTypes.func,
};

export default FilterBar;
