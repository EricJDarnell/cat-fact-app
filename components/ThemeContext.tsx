import React, { createContext, useState, ReactNode } from "react";
import { lightTheme, darkTheme } from "../themes";

type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
    theme: typeof lightTheme | typeof darkTheme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isDark, setIsDark] = useState<boolean>(false);

    const toggleTheme = () => setIsDark(!isDark);

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
          {children}
        </ThemeContext.Provider>
    );
};