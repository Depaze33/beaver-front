import { createContext, useState, useContext } from 'react';

// Crée le contexte
const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => {
    return useContext(UserContext);
};