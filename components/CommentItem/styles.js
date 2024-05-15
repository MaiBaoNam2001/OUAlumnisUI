import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentItem: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    avatar: {
        marginRight: 10,
    },
    comment: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    fullName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actions: {
        flexDirection: 'row',
    },
    createdAt: {
        fontWeight: 'bold',
        marginLeft: 12,
    },
    editButton: {
        fontWeight: 'bold',
        marginRight: 25,
    },
    deleteButton: {
        fontWeight: 'bold',
        marginRight: 12,
    },
});

export default styles;