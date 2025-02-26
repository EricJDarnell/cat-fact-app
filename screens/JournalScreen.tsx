import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../components/ThemeContext";
import AuthScreen from "./AuthScreen";
import useHeaderThemeToggle from "../components/useHeaderThemeToggle";
import { useAuth } from "../components/AuthContext";

interface JournalEntry {
    id: string;
    text: string;
}

const JournalScreen: React.FC = () => {
    const [entry, setEntry] = useState<string>('');
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const { token, logout } = useAuth();
    const { theme } = useContext(ThemeContext)!;
    useHeaderThemeToggle();

    const saveEntries = async (updatedEntries: JournalEntry[]): Promise<void> => {
        await AsyncStorage.setItem('entries', JSON.stringify(updatedEntries));
    };

    const loadEntries = async (): Promise<void> => {
        const savedEntries = await AsyncStorage.getItem('entries');
        if (savedEntries) setEntries(JSON.parse(savedEntries));
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const addEntry = (): void => {
        const newEntry: JournalEntry = { id: Date.now().toString(), text: entry };
        const updatedEntries = [...entries, newEntry];
        setEntries(updatedEntries);
        saveEntries(updatedEntries);
        setEntry('');
    };

    if (!token) {
        return <AuthScreen />;
    }

    return (
        <View style={[ styles.container, { backgroundColor: theme.background } ]}>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text }]}
              placeholder="What are you grateful for today?"
              placeholderTextColor={theme.text}
              value={entry}
              onChangeText={setEntry}
              multiline
            />
            <Button title="Save Entry" onPress={addEntry} />
            <FlatList 
              data={entries}
              renderItem={({ item }) => <Text style={[styles.entry, { backgroundColor: theme.background, color: theme.text }]}>{item.text}</Text>}
              keyExtractor={(item) => item.id}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    entry: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default JournalScreen;