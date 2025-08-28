// src/contexts/ConfigContext.jsx
import { createContext, useContext, useState } from "react";

const ConfigContext = createContext();
export const useConfig = () => {
    return useContext(ConfigContext);
};

export function ConfigProvider({ children }) {
    const [autoCheck, setAutoCheck] = useState(false);

    return (
        <ConfigContext.Provider value={{ autoCheck, setAutoCheck }}>
            {children}
        </ConfigContext.Provider>
    );
}

