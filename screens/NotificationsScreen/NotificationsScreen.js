import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import GlobalStyles from "../../styles/GlobalStyles";
import styles from "./styles";

const NotificationsScreen = () => {
    const theme = useTheme();

    return (
        <View style={{ ...GlobalStyles.container, ...styles.container, backgroundColor: theme.colors.background }}>
            <Text>Notifications screen</Text>
        </View>
    );
}

export default NotificationsScreen;