import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    post: {
        borderRadius: 0,
    },
    postTitle: {
        paddingLeft: 20,
        paddingTop: 20,
    },
    postTitleFullName: {
        fontWeight: 'bold',
        textAlignVertical: 'top',
        marginBottom: -5,
    },
    postTitleCreatedAt: {
        fontSize: 12,
    },
    postTitleAvatar: {
        marginRight: 30,
    },
    postTitleMoreOptions: {
        marginRight: 20,
    },
    postContent: {
        paddingHorizontal: 0,
        paddingTop: 20,
        paddingBottom: 10,
    },
    postContentText: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    postContentImages: {
        marginTop: 10,
    },
    postContentImage: {
        height: 400,
        marginBottom: 20,
    },
    postInteractionStatistics: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    interactionBar: {
        position: 'absolute',
        marginHorizontal: 0,
        marginVertical: 0,
    },
    interactionBarActions: {
        justifyContent: 'center',
        marginTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 8,
    },
    likeButton: {
        flex: 5,
        borderRadius: 0,
        marginLeft: 0,
    },
    commentButton: {
        flex: 5,
        borderRadius: 0,
        marginLeft: 0,
    },
});

export default styles;