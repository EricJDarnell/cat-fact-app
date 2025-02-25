import { useLayoutEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ThemeToggleButton from "./ThemeToggleButton";

const useHeaderThemeToggle = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <ThemeToggleButton/>,
        });
    }, [navigation])
};

export default useHeaderThemeToggle;