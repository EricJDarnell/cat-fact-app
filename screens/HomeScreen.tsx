import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const [fact, setFact] = useState<string>('');
    const navigation = useNavigation<HomeScreenNavigationProp>();

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

    return (
        <View style={styles.container}>
            <Text style={styles.fact}>{fact}</Text>
            <Button title="New Cat-Fact" onPress={fetchFact}/>
            <View style={styles.navButtons}>
                <Button
                  title="Go to To-Do List"
                  onPress={() => navigation.navigate('Todo')}
                />
                <Button
                  title="Go to Journal"
                  onPress={() => navigation.navigate('Journal')}
                />
            </View>
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