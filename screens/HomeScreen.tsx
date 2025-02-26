import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../components/AuthContext";
import AuthScreen from "./AuthScreen";
import { ThemeContext } from "../components/ThemeContext";
import useHeaderThemeToggle from "../components/useHeaderThemeToggle";

const HomeScreen: React.FC = () => {
    const [fact, setFact] = useState<string>('');
    const { token, logout } = useAuth();
    const { theme } = useContext(ThemeContext)!;
    useHeaderThemeToggle();

    const fetchFact = async (): Promise<void> => {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            setFact(`${data.fact}`);
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    useEffect(() => {
        fetchFact();
    }, []);

    if (!token) {
        return <AuthScreen />;
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.fact, { color: theme.text, backgroundColor: theme.background }]}>{fact}</Text>
            <Button title="New Cat-Fact" onPress={fetchFact}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    fact: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    navButtons: {
        marginTop: 20,
    },
});

export default HomeScreen;