import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type JournalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Journal'>;

interface JournalEntry {
    id: string;
    text: string;
}

const JournalScreen: React.FC = () => {
    const [entry, setEntry] = useState<string>('');
    const [entries, setEntries] = useState<JournalEntry[]>([]);

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

    return (
        <View>
            <TextInput 
              style={styles.input}
              placeholder="What are you grateful for today?"
              value={entry}
              onChangeText={setEntry}
              multiline
            />
            <Button title="Save Entry" onPress={addEntry} />
            <FlatList 
              data={entries}
              renderItem={({ item }) => <Text style={styles.entry}>{item.text}</Text>}
              keyExtractor={(item) => item.id}
            />
            <Button
              title="Return to Home"
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