import React, { useContext, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";
import { ThemeContext } from "../components/ThemeContext";
import { useAuth } from "../components/AuthContext";
import { TESTING_ADDRESS } from "../dev-details"; //computers IP address, not uploaded to GitHub!!!

const AuthScreen: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext)!;
    const { login } = useAuth();

    const handleAuth = async () => {
        const endpoint = isLogin ? '/login' : '/register';
        console.log('endpoint: ', endpoint);
        try {
            const response = await axios.post(`${TESTING_ADDRESS}:5000${endpoint}`, {
                username,
                password,
            });
            console.log('response: ', await response);
            const { token } = response.data;
            login(token);
        } catch (err) {
            console.log('err: ', err);
            setError('Authentication failed');
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[styles.title, {color: theme.text, backgroundColor: theme.background}]}>{isLogin ? 'Login' : 'Register'}</Text>
            <TextInput
              style={[styles.input, {backgroundColor: theme.cardBackground, color: theme.text}]}
              placeholder="Username"
              placeholderTextColor={theme.text}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={[styles.input, {color: theme.text, backgroundColor: theme.cardBackground}]}
              placeholder="Password"
              placeholderTextColor={theme.text}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title={isLogin ? 'Login' : 'Register'} onPress={handleAuth} />
            <Button
              title={isLogin ? 'Switch to Register' : 'Switch to Login'}
              onPress={() => setIsLogin(!isLogin)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default AuthScreen;