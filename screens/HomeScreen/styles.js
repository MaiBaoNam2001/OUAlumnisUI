import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
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
    addPostButton: {
        marginVertical: 0,
        marginLeft: 0,
        marginRight: 6,
    },
    searchButton: {
        marginVertical: 0,
        marginLeft: 6,
        marginRight: 0,
    },
    post: {
        borderRadius: 0,
        marginVertical: 5,
    },
    addPostContainer: {
        borderRadius: 0,
        marginBottom: 10,
    },
    addPostWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    addPostBar: {
        flex: 1,
        marginHorizontal: 20,
    },
});

export default styles;