import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import JournalScreen from "./screens/JournalScreen";
import TodoScreen from "./screens/TodoScreen";
import { ThemeProvider } from "./components/ThemeContext";

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
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Todo" component={TodoScreen}/>
          <Tab.Screen name="Journal" component={JournalScreen} />
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