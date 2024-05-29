import { forwardRef, useEffect, useMemo, useState } from "react";
import { Alert, Image, View } from "react-native";
import {
    Button,
    Divider,
    IconButton,
    Title,
    useTheme
} from "react-native-paper";
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";

const ImageEditBottomSheet = (props, ref) => {
    const [images, setImages] = useState([...props.data]);

    const theme = useTheme();

    const snapPoints = useMemo(() => ['100%'], []);

    useEffect(() => {
        setImages([...props.data]);
    }, [props.data])

    const handlePickMultipleImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập bị từ chối', "Bạn không có quyền truy cập vào thư viện ảnh.");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
            });
            if (!result.canceled) {
                setImages(prev => [...prev, ...result.assets]);
            }
        }
    }

    const handleRemoveImage = (index) => {
        setImages(prev => {
            const updatedImages = [...prev];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    }

    const handleSave = () => {
        if (props.data !== images) {
            props.onSave([...images]);
        }

        props.onHide();
    }

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: theme.colors.background }}
            handleIndicatorStyle={{ backgroundColor: 'transparent' }}
            enableContentPanningGesture={false}
            stackBehavior='push'
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftHeader}>
                        <View style={{ marginRight: 5 }}>
                            <IconButton
                                icon='keyboard-backspace'
                                size={30}
                                onPress={() => {
                                    setImages([...props.data]);
                                    props.onHide();
                                }}
                                style={{ margin: 0 }}
                            />
                        </View>

                        <View>
                            <Title>Chỉnh sửa</Title>
                        </View>
                    </View>

                    <View style={styles.rightHeader}>
                        <Button
                            labelStyle={styles.saveButton}
                            mode='text'
                            onPress={handleSave}>
                            Lưu
                        </Button>
                    </View>
                </View>

                <Divider />

                <BottomSheetScrollView contentContainerStyle={styles.content}>
                    {images.map((image, index) =>
                        <View
                            key={index}
                            style={styles.contentItem}
                        >
                            <Image
                                source={{ uri: image.uri }}
                                style={styles.image}
                            />

                            <View style={styles.removeButton}>
                                <IconButton
                                    icon='close'
                                    onPress={() => handleRemoveImage(index)}
                                />
                            </View>
                        </View>
                    )}

                    <Button
                        style={{
                            ...styles.addImageButton,
                            marginTop: images.length === 0 ? 40 : 0,
                        }}
                        mode='elevated'
                        icon='image-multiple'
                        onPress={handlePickMultipleImages}
                    >
                        Thêm ảnh
                    </Button>
                </BottomSheetScrollView>
            </View>
        </BottomSheetModal>
    );
}

export default forwardRef(ImageEditBottomSheet);