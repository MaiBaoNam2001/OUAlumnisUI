import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginVertical: 10,
        alignItems: 'center',
    },
    content: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    commentInputWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    commentInput: {
        fontSize: 16,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    sendButtonWrapper: {
        justifyContent: 'center',
        marginLeft: 20,
    },
});

export default styles;