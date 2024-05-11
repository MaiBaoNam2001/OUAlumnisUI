import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        marginTop: 20,
    },
    actionBar: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: 5,
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    content: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    coverImage: {
        height: 250,
    },
    saveButton: {
        marginTop: 30,
    }
});

export default styles;