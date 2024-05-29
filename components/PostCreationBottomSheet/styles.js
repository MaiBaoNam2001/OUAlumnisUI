import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightHeader: {
        marginRight: 10,
    },
    postButton: {
        fontSize: 20,
        lineHeight: 30,
    },
    content: {
        paddingVertical: 20,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    avatar: {
        marginRight: 20,
    },
    fullName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postContent: {
        fontSize: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    postImages: {
        width: '100%',
        marginBottom: 20,
    },
    addImageButton: {
        marginHorizontal: 20,
    }
});

export default styles;