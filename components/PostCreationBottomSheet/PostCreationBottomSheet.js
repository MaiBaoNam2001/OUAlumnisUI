import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import {
    Avatar,
    Button,
    Divider,
    IconButton,
    Text,
    Title,
    useTheme
} from "react-native-paper";
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import FBCollage from "react-native-fb-collage";
import ImageEditBottomSheet from "../ImageEditBottomSheet/ImageEditBottomSheet";

const PostCreationBottomSheet = (props, ref) => {
    const [postContent, setPostContent] = useState('');
    const [postImages, setPostImages] = useState([...props.data]);

    const theme = useTheme();

    const imageEditBottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ['100%'], []);

    useEffect(() => {
        setPostImages([...props.data]);
    }, [props.data]);

    const handlePickMultipleImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập bị từ chối', "Bạn không có quyền truy cập vào thư viện ảnh.");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
            });
            if (!result.canceled) {
                setPostImages(prev => [...prev, ...result.assets]);
            }
        }
    }

    const handleOpenImageEditBottomSheet = useCallback(() => {
        imageEditBottomSheetRef.current?.present();
    }, []);

    const handleCloseImageEditBottomSheet = useCallback(() => {
        imageEditBottomSheetRef.current?.close();
    }, []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: theme.colors.background }}
            handleIndicatorStyle={{ backgroundColor: 'transparent' }}
            enableContentPanningGesture={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftHeader}>
                        <View style={{ marginRight: 5 }}>
                            <IconButton
                                icon='keyboard-backspace'
                                size={30}
                                onPress={() => {
                                    setPostContent('');
                                    setPostImages([]);
                                    props.setData([]);
                                    props.onHide();
                                }}
                                style={{ margin: 0 }}
                            />
                        </View>

                        <View>
                            <Title>Tạo bài viết</Title>
                        </View>
                    </View>

                    <View style={styles.rightHeader}>
                        <Button
                            labelStyle={styles.postButton}
                            mode='text'
                            onPress={() => console.info('Post')}>
                            Đăng
                        </Button>
                    </View>
                </View>

                <Divider />

                <BottomSheetScrollView contentContainerStyle={styles.content}>
                    <View style={styles.profile}>
                        <Avatar.Image
                            size={50}
                            source={require('../../assets/images/default-avatar.png')}
                            style={styles.avatar}
                        />

                        <Text style={styles.fullName}>Mai Bảo Nam</Text>
                    </View>

                    <TextInput
                        style={{
                            ...styles.postContent,
                            color: theme.colors.onSurface,
                        }}
                        multiline={true}
                        value={postContent}
                        onChangeText={value => setPostContent(value)}
                        placeholder='Bạn đang nghĩ gì?'
                        placeholderTextColor={theme.colors.outline}
                    />

                    {postImages.length !== 0 &&
                        <FBCollage
                            style={{
                                ...styles.postImages,
                                height: postImages.length === 1 ? 400 : 200,
                            }}
                            images={postImages.map(postImage => postImage.uri)}
                            imageOnPress={handleOpenImageEditBottomSheet}
                        />
                    }

                    <Button
                        style={styles.addImageButton}
                        mode='elevated'
                        icon='image-multiple'
                        onPress={handlePickMultipleImages}
                    >
                        Thêm ảnh
                    </Button>
                </BottomSheetScrollView>

                <ImageEditBottomSheet
                    ref={imageEditBottomSheetRef}
                    data={postImages}
                    onSave={setPostImages}
                    onHide={handleCloseImageEditBottomSheet}
                />
            </View>
        </BottomSheetModal>
    );
}

export default forwardRef(PostCreationBottomSheet);