import React from 'react';
import { chakra, Button, Flex } from "@chakra-ui/react";
import AutoResize from "react-textarea-autosize";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css"; // Import du fichier CSS

const StyledAutoResize = chakra(AutoResize);

const SearchBar = () => {
    return (
        <Flex alignItems="center">
            <StyledAutoResize
                className="search-bar"
                placeholder="Lieu"
                minH="initial"
                resize="none"
                overflow="hidden"
                lineHeight="inherit"
            />
            <Button ml={2}  variant="outline" size="sm"><IoIosSearch /></Button>
        </Flex>


    );
};

export default SearchBar;
