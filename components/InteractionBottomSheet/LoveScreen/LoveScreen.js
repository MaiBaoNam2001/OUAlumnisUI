import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import InteractionItem from "../../InteractionItem/InteractionItem";
import styles from "./styles";

const LoveScreen = () => {
    const theme = useTheme();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
        }}>
            <ScrollView contentContainerStyle={styles.content}>
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
                <InteractionItem type='LOVE' />
            </ScrollView>
        </View>
    );
}

export default LoveScreen;