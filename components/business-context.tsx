import React, { createContext, useContext, useState, ReactNode } from 'react';

const BusinessContext = createContext<any>({});

export const BusinessProvider: React.FC<{ children?: ReactNode, businessData: any }> = ({ children, businessData }) => {
    const [business, setBusiness] = useState(businessData);

    return (
        <BusinessContext.Provider value={{ business, setBusiness }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusiness = () => {
    const context = useContext(BusinessContext);

    if (!context) throw new Error('no context')

    return context
}