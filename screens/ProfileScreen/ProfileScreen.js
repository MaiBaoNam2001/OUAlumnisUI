import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import GlobalStyles from "../../styles/GlobalStyles";
import styles from "./styles";

const ProfileScreen = () => {
    const theme = useTheme();

    return (
        <View style={{ ...GlobalStyles.container, ...styles.container, backgroundColor: theme.colors.background }}>
            <Text>Profile screen</Text>
        </View>
    )
}

export default ProfileScreen;