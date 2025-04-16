import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LogoContextType {
    logoUrl: string | null;
    setLogoUrl: (url: string | null) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const useLogo = () => {
    const context = useContext(LogoContext);
    if (!context) {
        throw new Error('useLogo must be used within a LogoProvider');
    }
    return context;
};

interface LogoProviderProps {
    children: ReactNode;
}

export const LogoProvider: React.FC<LogoProviderProps> = ({ children }) => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    return (
        <LogoContext.Provider value={{ logoUrl, setLogoUrl }}>
            {children}
        </LogoContext.Provider>
    );
};
