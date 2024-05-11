import { useContext } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../UserContext";
import GlobalStyles from "../../styles/GlobalStyles";
import styles from "./styles";

const HomeScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [currentUser, dispatch] = useContext(UserContext);

    return (
        <View style={{ ...GlobalStyles.container, ...styles.container, backgroundColor: theme.colors.background }}>
            <Text>Home screen</Text>
        </View>
    )
}

export default HomeScreen;