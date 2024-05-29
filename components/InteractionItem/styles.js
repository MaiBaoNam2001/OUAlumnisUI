import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        marginRight: 20,
    },
    icon: {
        position: 'absolute',
        left: 25,
        top: 25,
    },
    fullName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;