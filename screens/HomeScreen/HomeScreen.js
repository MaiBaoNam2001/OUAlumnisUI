import { useContext } from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../UserContext";
import GlobalStyles from "../../styles/GlobalStyles";
import styles from "./styles";

const HomeScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [, dispatch] = useContext(UserContext);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('access-token');
        await AsyncStorage.removeItem('refresh-token');

        dispatch({
            type: 'logout',
        });

        navigation.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ]
        });
    }

    return (
        <View style={{ ...GlobalStyles.container, ...styles.container, backgroundColor: theme.colors.background }}>
            <Text>Home screen</Text>
            <Button onPress={handleLogout}>Đăng xuất</Button>
        </View>
    )
}

export default HomeScreen;