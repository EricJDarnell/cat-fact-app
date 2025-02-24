import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import JournalScreen from "./screens/JournalScreen";
import TodoScreen from "./screens/TodoScreen";
import { ThemeProvider } from "./components/ThemeContext";

type RootStackParamList = {
  Home: undefined;
  Todo: undefined;
  Journal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App:React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Todo" component={TodoScreen}/>
          <Stack.Screen name="Journal" component={JournalScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

 export default App;