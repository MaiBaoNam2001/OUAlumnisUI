import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import InteractionItem from "../../InteractionItem/InteractionItem";
import styles from "./styles";

const HahaScreen = () => {
    const theme = useTheme();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
        }}>
            <ScrollView contentContainerStyle={styles.content}>
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
                <InteractionItem type='HAHA' />
            </ScrollView>
        </View>
    );
}

export default HahaScreen;