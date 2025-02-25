import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import JournalScreen from "./screens/JournalScreen";
import TodoScreen from "./screens/TodoScreen";
import { ThemeProvider } from "./components/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

type RootTabParamList = {
  Home: undefined;
  Todo: undefined;
  Journal: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const App:React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen 
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size}/>                
              ),
            }}
          />
          <Tab.Screen 
            name="Todo"
            component={TodoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size}/>
              )
            }}
          />
          <Tab.Screen
            name="Journal"
            component={JournalScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="book" color={color} size={size}/>
              )
            }}
          />
        </Tab.Navigator>
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