import React from "react";
import PropTypes from "prop-types";
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
import './Filter.css'


const Filters = ({ filters, onFilterChange }) => {
    const filterOptions = ["hostel", "restaurant", "bar", "cafe", "fast_food"];

    return (
        <div className="filters">
            {filterOptions.map((filter) => {
                const isChecked = filters.includes(filter);
                return (
                    <label
                        key={filter}
                        className={`filter-label ${isChecked ? "checked" : ""}`}
                    >
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onFilterChange(filter)}
                            className="filter-checkbox"
                        />
                        {filter}
                    </label>
                );
            })}
        </div>
    );
};


Filters.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

const FiltersDialog = ({ filters, onFilterChange }) => {
    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <FaFilter />

                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="dialog-title">Filter Options</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Filters filters={filters} onFilterChange={onFilterChange} />
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button className="button-apply">Apply</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

FiltersDialog.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default FiltersDialog;
