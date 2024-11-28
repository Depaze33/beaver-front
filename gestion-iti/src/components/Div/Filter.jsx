
import PropTypes from "prop-types";
import './Filter.css';
import { Button } from "@/components/ui/button";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { FaFilter } from "react-icons/fa";

const FiltersDialog = ({ filters, onFilterChange }) => {
    const filterOptions = ["hostel", "restaurant", "bar", "cafe", "fast_food"];

    const handleCheckboxChange = (filter) => {
        const newFilters = filters.includes(filter)
            ? filters.filter((f) => f !== filter)
            : [...filters, filter];
        onFilterChange(newFilters);
    };

    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <FaFilter />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Choose Filters</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="filters">
                        {filterOptions.map((filter) => (
                            <label key={filter} className="filter-label">
                                <input
                                    type="checkbox"
                                    checked={filters.includes(filter)}
                                    onChange={() => handleCheckboxChange(filter)}
                                    className="filter-checkbox"
                                />
                                {filter}
                            </label>
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};

FiltersDialog.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default FiltersDialog;
