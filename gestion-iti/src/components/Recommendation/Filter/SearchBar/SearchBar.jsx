import React from 'react';
import { chakra, Button, Flex } from "@chakra-ui/react";
import AutoResize from "react-textarea-autosize";
import "./SearchBar.css"; // Import du fichier CSS

const StyledAutoResize = chakra(AutoResize);

const SearchBar = () => {
    return (
        <Flex alignItems="center">
            <StyledAutoResize
                className="search-bar" // Ajout de la classe CSS
                placeholder="Lieu"
                minH="initial"
                resize="none"
                overflow="hidden"
                lineHeight="inherit"
            />
            <Button ml={2}>🔍</Button>
        </Flex>


    );
};

export default SearchBar;
