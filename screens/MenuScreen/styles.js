import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 20,
    },
    title: {
        flex: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    actionBar: {
        flex: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    profile: {
        marginVertical: 20
    },
    passwordChangeButton: {
        marginBottom: 20,
    }
});

export default styles;