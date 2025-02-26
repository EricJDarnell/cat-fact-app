import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from "./components/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import JournalScreen from "./screens/JournalScreen";
import TodoScreen from "./screens/TodoScreen";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";

type RootTabParamList = {
  Home: undefined;
  Todo: undefined;
  Journal: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemeContext.Consumer>
          {({ isDark, theme }) => (
            <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === "Home") {
                      iconName = "home";
                    } else if (route.name === "Journal") {
                      iconName = "book";
                    } else if (route.name === "Todo") {
                      iconName = "list";
                    } else {
                      iconName = "home";
                    }

                    return (
                      <Ionicons name={iconName} color={color} size={size} />
                    );
                  },
                  tabBarActiveTintColor: theme.primary,
                  tabBarInactiveTintColor: theme.text,
                  tabBarStyle: { backgroundColor: theme.background },
                })}
              >
                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    headerStyle: { backgroundColor: theme.background },
                    headerTintColor: theme.text,
                  }}
                />
                <Tab.Screen
                  name="Todo"
                  component={TodoScreen}
                  options={{
                    headerStyle: { backgroundColor: theme.background },
                    headerTintColor: theme.text,
                  }}
                />
                <Tab.Screen
                  name="Journal"
                  component={JournalScreen}
                  options={{
                    headerStyle: { backgroundColor: theme.background },
                    headerTintColor: theme.text,
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          )}
        </ThemeContext.Consumer>
      </AuthProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
