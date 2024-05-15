import { useContext, useRef, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import {
    Avatar,
    Button,
    Card,
    Dialog,
    Divider,
    IconButton,
    Paragraph,
    Portal,
    Text,
    Title,
    useTheme
} from "react-native-paper";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import FBCollage from "react-native-fb-collage";
import ScrollEnabledContext from "../../ScrollEnabledContext";
import CommentItem from "../CommentItem/CommentItem";
import styles from "./styles";

const PostItem = () => {
    const images = [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg',
        'https://i.pinimg.com/736x/6d/7f/6d/6d7f6d16d3dd35f0eee515bacd8e4ade.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-22.jpg',
        'https://vcdn-sohoa.vnecdn.net/2013/09/13/Landscape-Black-White-2215-1379037677.jpg',
        'https://i.pinimg.com/736x/2e/68/0d/2e680d985d7778ea9d82eb18d4b42d2b.jpg',
        'https://vuinhiepanh.com/assets/uploads/2017/11/14-2.jpg',
    ]

    const [selectedInteraction, setSelectedInteraction] = useState(null);
    const [selectedInteractionColor, setSelectedInteractionColor] = useState(null);

    const [comment, setComment] = useState('');
    const [visible, setVisible] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [likeButtonSize, setLikeButtonSize] = useState({ width: 0, height: 0 });
    const [likeButtonPosition, setLikeButtonPosition] = useState({ x: 0, y: 0 });

    const theme = useTheme();
    const setScrollEnabled = useContext(ScrollEnabledContext);

    const likeButtonRef = useRef(null);


    const handleToggleLike = () => {
        if (selectedInteraction) {
            handleSelectInteraction(null, null)
        } else {
            handleSelectInteraction('Thích', 'rgb(8, 102, 255)');
        }
    }

    const handleOpenDialog = () => {
        if (likeButtonRef.current) {
            likeButtonRef.current.measure((fx, fy, width, height, px, py) => {
                if (likeButtonSize.width === 0 && likeButtonSize.height === 0) {
                    setLikeButtonSize({ width, height });
                }

                setLikeButtonPosition({ x: px, y: py });
                setVisible(true);
                setScrollEnabled(false);
            });
        }
    }

    const handleHideDialog = () => {
        setVisible(false);
        setScrollEnabled(true);
    }

    const handleSelectInteraction = (value, color) => {
        setSelectedInteraction(value);
        setSelectedInteractionColor(color);
        handleHideDialog();
    }

    return (
        <Card style={styles.post}>
            <Card.Title
                title='Mai Bảo Nam'
                subtitle='1 ngày'
                left={() =>
                    <Avatar.Image
                        size={50}
                        source={require('../../assets/images/default-avatar.png')}
                    />
                }
                right={(props) =>
                    <IconButton
                        icon='dots-horizontal'
                        onPress={() => console.info('Press')}
                        style={{ margin: 0 }}
                        {...props}
                    />
                }
                style={styles.postTitle}
                titleStyle={styles.postTitleFullName}
                subtitleStyle={{
                    ...styles.postTitleCreatedAt,
                    color: theme.colors.onSurfaceVariant,
                }}
                leftStyle={styles.postTitleAvatar}
                rightStyle={styles.postTitleMoreOptions}
            />

            <Card.Content style={styles.postContent}>
                <Paragraph style={styles.postContentText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    {'\n'}
                    {'\n'}
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Paragraph>

                <FBCollage
                    style={styles.postContentImages}
                    images={images}
                    imageOnPress={(index, images) => console.info(`${index}: ${images}`)}
                />

                <View style={styles.postInteractionStatistics}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => setShowInteractionModal(true)}
                            style={{ flexDirection: 'row' }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Avatar.Image
                                    size={16}
                                    source={require('../../assets/icons/like-icon.png')}
                                />

                                <Avatar.Image
                                    size={16}
                                    source={require('../../assets/icons/heart-icon.png')}
                                />

                                <Avatar.Image
                                    size={16}
                                    source={require('../../assets/icons/haha-icon.png')}
                                />
                            </View>

                            <Text style={{
                                color: theme.colors.onSurfaceVariant,
                                marginLeft: 5,
                            }}>20</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => setShowCommentModal(true)}>
                        <Text style={{ color: theme.colors.onSurfaceVariant }}>10 bình luận</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>

            <Divider />

            <Card.Actions style={{ padding: 0 }}>
                <Button
                    ref={likeButtonRef}
                    mode='text'
                    onPress={handleToggleLike}
                    onLongPress={handleOpenDialog}
                    rippleColor={visible ? 'transparent' : undefined}
                    labelStyle={{ color: selectedInteractionColor || theme.colors.onSurfaceVariant }}
                    style={styles.likeButton}
                >
                    {selectedInteraction || 'Thích'}
                </Button>

                <Portal>
                    <Dialog
                        visible={visible}
                        dismissable={false}
                        onDismiss={handleHideDialog}
                        style={{
                            ...styles.dialog,
                            left: likeButtonPosition.x + likeButtonSize.width / 18,
                            top: likeButtonPosition.y - 2.5 * likeButtonSize.height,

                        }}
                    >
                        <Dialog.Actions style={styles.dialogActions}>
                            <TouchableOpacity onPress={() => handleSelectInteraction('Thích', 'rgb(8, 102, 255)')}>
                                <Avatar.Image
                                    size={34}
                                    source={require('../../assets/icons/like-icon.png')}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectInteraction('Yêu thích', 'rgb(243, 62, 88)')}>
                                <Avatar.Image
                                    size={34}
                                    source={require('../../assets/icons/heart-icon.png')}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectInteraction('Haha', 'rgb(247, 177, 37)')}>
                                <Avatar.Image
                                    size={34}
                                    source={require('../../assets/icons/haha-icon.png')}
                                />
                            </TouchableOpacity>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <Button
                    mode='text'
                    onPress={() => setShowCommentModal(true)}
                    labelStyle={{ color: theme.colors.onSurfaceVariant }}
                    style={styles.commentButton}
                >
                    Bình luận
                </Button>
            </Card.Actions>

            <Modal
                isVisible={showCommentModal}
                style={{ margin: 0 }}
            >
                <View style={{
                    ...styles.commentModalContainer,
                    backgroundColor: theme.colors.background,
                }}>
                    <View style={styles.commentModalHeader}>
                        <View style={styles.actionBar}>
                            <IconButton
                                icon='keyboard-backspace'
                                size={30}
                                onPress={() => setShowCommentModal(false)}
                                style={{ margin: 0 }}
                            />
                        </View>

                        <View style={styles.title}>
                            <Title>Bình luận</Title>
                        </View>
                    </View>


                    <Divider />

                    <ScrollView contentContainerStyle={styles.commentModalContent}>
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                    </ScrollView>

                    <Divider />

                    <View style={styles.commentModalFooter}>
                        <View style={styles.commentInputWrapper}>
                            <TextInput
                                style={{
                                    ...styles.commentInput,
                                    color: theme.colors.onSecondaryContainer,
                                    backgroundColor: theme.colors.secondaryContainer,
                                }}
                                multiline={true}
                                value={comment}
                                onChangeText={value => setComment(value)}
                                placeholder='Viết bình luận...'
                                placeholderTextColor={theme.colors.outline}
                            />
                        </View>

                        <View style={styles.sendButtonWrapper}>
                            <IconButton
                                icon='send'
                                size={30}
                                onPress={() => console.info('Send')}
                                iconColor={theme.colors.primary}
                                style={{ margin: 0 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </Card >
    );
}

export default PostItem;