
import { HStack } from "@chakra-ui/react"
import { Radio, RadioGroup }  from "@/components/ui/radio.jsx";
import { useState } from "react";

const Filters = ({ onFilterChange }) => {
    const [value, setValue] = useState("all"); // "all" signifie aucun filtre spécifique

    const handleChange = (nextValue) => {
        setValue(nextValue);
        onFilterChange(nextValue); // Appelle la fonction pour informer le parent du filtre sélectionné
    };

    return (
        <RadioGroup onChange={handleChange} value={value}>
            <HStack spacing="6">
                <Radio value="all">All</Radio>
                <Radio value="hostel">Hostels</Radio>
                <Radio value="restaurant">Restaurants</Radio>
                <Radio value="bar">Bars</Radio>
                <Radio value="cafe">Cafés</Radio>
                <Radio value="fast_food">Fast Food</Radio>
            </HStack>
        </RadioGroup>
    );
};

export default Filters;