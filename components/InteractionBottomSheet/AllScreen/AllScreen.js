import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import InteractionItem from "../../InteractionItem/InteractionItem";
import styles from "./styles";

const AllScreen = () => {
    const theme = useTheme();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
        }}>
            <ScrollView contentContainerStyle={styles.content}>
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
                <InteractionItem type='LIKE' />
            </ScrollView>
        </View>
    );
}

export default AllScreen;