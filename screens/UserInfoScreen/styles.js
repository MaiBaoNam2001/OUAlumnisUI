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
        paddingHorizontal: 20,
    },
    contentItem: {
        marginVertical: 5,
    },
    listSubHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 0,
    },
});

export default styles;