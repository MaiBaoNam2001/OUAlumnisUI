import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    logo: {
        alignItems: 'center',
        paddingTop: 10,
    },
    firstNameInput: {
        flex: 5,
        marginLeft: 5,
    },
    lastNameInput: {
        flex: 5,
        marginRight: 5,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    imagePicker: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    actions: {
        paddingTop: 10,
    },
    registerButton: {
        marginBottom: 15,
    }
});

export default styles;