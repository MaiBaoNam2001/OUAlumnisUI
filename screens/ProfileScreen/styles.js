import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
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
    content: {
        // marginVertical: 20,
    },
    images: {
        position: 'relative',
    },
    coverImage: {
        width: '100%',
        height: 250,
    },
    avatarWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -40,
        zIndex: 1,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderWidth: 3,
        borderColor: '#fff',
    },
    itemWrapper: {
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    fullName: {
        marginTop: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;