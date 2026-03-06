import React, { createContext, useContext } from 'react';

interface AuthContextType {
    // Define the shape of your context
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC = ({ children }) => {
    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export { AuthProvider, useAuth };