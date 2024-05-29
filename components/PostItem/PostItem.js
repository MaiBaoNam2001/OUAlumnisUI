import { useCallback, useContext, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
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
    useTheme
} from "react-native-paper";
import FBCollage from "react-native-fb-collage";
import ScrollEnabledContext from "../../ScrollEnabledContext";
import CommentBottomSheet from "../CommentBottomSheet/CommentBottomSheet";
import InteractionBottomSheet from "../InteractionBottomSheet/InteractionBottomSheet";
import PostDetailsBottomSheet from "../PostDetailsBottomSheet/PostDetailsBottomSheet";
import styles from "./styles";

const PostItem = () => {
    const images = [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-41.jpg',
        'https://i.pinimg.com/736x/6d/7f/6d/6d7f6d16d3dd35f0eee515bacd8e4ade.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-phong-canh-dep-22.jpg',
        'https://vcdn-sohoa.vnecdn.net/2013/09/13/Landscape-Black-White-2215-1379037677.jpg',
        'https://i.pinimg.com/736x/2e/68/0d/2e680d985d7778ea9d82eb18d4b42d2b.jpg',
        'https://vuinhiepanh.com/assets/uploads/2017/11/14-2.jpg',
    ];

    const [selectedInteraction, setSelectedInteraction] = useState(null);
    const [selectedInteractionColor, setSelectedInteractionColor] = useState(null);
    const [showInteractionBar, setShowInteractionBar] = useState(false);
    const [likeButtonSize, setLikeButtonSize] = useState({ width: 0, height: 0 });
    const [likeButtonPosition, setLikeButtonPosition] = useState({ x: 0, y: 0 });

    const theme = useTheme();
    const setScrollEnabled = useContext(ScrollEnabledContext);

    const likeButtonRef = useRef(null);
    const commentBottomSheetRef = useRef(null);
    const interactionBottomSheetRef = useRef(null);
    const postDetailsBottomSheetRef = useRef(null);

    const handleToggleLike = () => {
        if (selectedInteraction) {
            handleSelectInteraction(null, null)
        } else {
            handleSelectInteraction('Thích', 'rgb(8, 102, 255)');
        }
    }

    const handleOpenInteractionBar = () => {
        if (likeButtonRef.current) {
            likeButtonRef.current.measure((fx, fy, width, height, px, py) => {
                if (likeButtonSize.width === 0 && likeButtonSize.height === 0) {
                    setLikeButtonSize({ width, height });
                }

                setLikeButtonPosition({ x: px, y: py });
                setShowInteractionBar(true);
                setScrollEnabled(false);
            });
        }
    }

    const handleHideInteractionBar = () => {
        setShowInteractionBar(false);
        setScrollEnabled(true);
    }

    const handleSelectInteraction = (value, color) => {
        setSelectedInteraction(value);
        setSelectedInteractionColor(color);
        handleHideInteractionBar();
    }

    const handleOpenCommentBottomSheet = useCallback(() => {
        commentBottomSheetRef.current?.present();
    }, []);

    const handleOpenInteractionBottomSheet = useCallback(() => {
        interactionBottomSheetRef.current?.present();
    }, []);

    const handleCloseInteractionBottomSheet = useCallback(() => {
        interactionBottomSheetRef.current?.close();
    }, []);

    const handleOpenPostDetailsBottomSheet = useCallback(() => {
        postDetailsBottomSheetRef.current?.present();
    }, []);

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

                {images.length !== 0 &&
                    <FBCollage
                        style={{
                            ...styles.postContentImages,
                            height: images.length === 1 ? 400 : 200,
                        }}
                        images={images}
                        imageOnPress={handleOpenPostDetailsBottomSheet}
                    />
                }

                <View style={styles.postInteractionStatistics}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={handleOpenInteractionBottomSheet}
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

                    <TouchableOpacity onPress={handleOpenCommentBottomSheet}>
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
                    onLongPress={handleOpenInteractionBar}
                    rippleColor={showInteractionBar ? 'transparent' : undefined}
                    labelStyle={{ color: selectedInteractionColor || theme.colors.onSurfaceVariant }}
                    contentStyle={{ paddingVertical: 5 }}
                    style={styles.likeButton}
                >
                    {selectedInteraction || 'Thích'}
                </Button>

                <Portal>
                    <Dialog
                        visible={showInteractionBar}
                        dismissable={false}
                        onDismiss={handleHideInteractionBar}
                        style={{
                            ...styles.interactionBar,
                            left: likeButtonPosition.x + likeButtonSize.width / 18,
                            top: likeButtonPosition.y - 2.5 * likeButtonSize.height,

                        }}
                    >
                        <Dialog.Actions style={styles.interactionBarActions}>
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
                    onPress={handleOpenCommentBottomSheet}
                    labelStyle={{ color: theme.colors.onSurfaceVariant }}
                    contentStyle={{ paddingVertical: 5 }}
                    style={styles.commentButton}
                >
                    Bình luận
                </Button>
            </Card.Actions>

            <CommentBottomSheet ref={commentBottomSheetRef} />

            <InteractionBottomSheet
                ref={interactionBottomSheetRef}
                onHide={handleCloseInteractionBottomSheet}
            />

            <PostDetailsBottomSheet ref={postDetailsBottomSheetRef} />
        </Card >
    );
}

export default PostItem;