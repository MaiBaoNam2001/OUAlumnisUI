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
    saveButton: {
        fontSize: 20,
        lineHeight: 30,
    },
    content: {
        paddingBottom: 20,
    },
    contentItem: {
        marginBottom: 40,
    },
    image: {
        height: 400,
    },
    removeButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    addImageButton: {
        marginHorizontal: 20,
    }
});

export default styles;