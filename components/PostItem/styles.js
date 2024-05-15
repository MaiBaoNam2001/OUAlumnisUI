import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    post: {
        borderRadius: 0,
        marginBottom: 10,
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
        width: '100%',
        marginBottom: 10,
    },
    postInteractionStatistics: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    dialog: {
        position: 'absolute',
        marginHorizontal: 0,
        marginVertical: 0,
    },
    dialogActions: {
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
    commentModalContainer: {
        flex: 1,
    },
    commentModalHeader: {
        flexDirection: 'row',
        marginTop: 5,
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
    commentModalContent: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    commentModalFooter: {
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