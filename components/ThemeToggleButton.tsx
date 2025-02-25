import React, { useContext } from "react";
import { Button } from "react-native";
import { ThemeContext } from "./ThemeContext";

const ThemeToggleButton: React.FC = () => {
    const { isDark, toggleTheme } = useContext(ThemeContext)!;

    return (
        <Button
          title={isDark ? 'Light Mode' : 'Dark Mode'}
          onPress={toggleTheme}
        />
    );
};

export default ThemeToggleButton;