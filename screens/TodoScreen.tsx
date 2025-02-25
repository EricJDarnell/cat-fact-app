import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from "../components/ThemeContext";

interface Task {
    id: string;
    text: string;
}

const TodoScreen: React.FC = () => {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const { theme } = useContext(ThemeContext)!;

    const saveTasks = async (updatedTasks: Task[]): Promise<void> => {
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const loadTasks = async (): Promise<void> => {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const addTask = (): void => {
        const newTask: Task = { id: Date.now().toString(), text: task };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setTask('');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <TextInput 
              style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
              placeholder="Add a task"
              value={task}
              onChangeText={setTask}
            />
            <Button title="Add Task" onPress={addTask}/>
            <FlatList 
              data={tasks}
              renderItem={({item}) => <Text style={styles.task}>{item.text}</Text>}
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
    task: {
        fontSize: 16,
        marginTop: 10,
    },
})

export default TodoScreen;