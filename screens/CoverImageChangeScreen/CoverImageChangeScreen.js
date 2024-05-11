import { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
    Divider,
    IconButton,
    Title,
    Card,
    Button,
    ActivityIndicator,
    useTheme
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../UserContext";
import { authAxios, endpoints } from "../../Axios";
import styles from "./styles";

const CoverImageChangeScreen = () => {
    const [currentUser, dispatch] = useContext(UserContext);
    const authUser = currentUser?.user ? currentUser?.user : currentUser;
    const [coverImage, setCoverImage] = useState({ 'uri': authUser?.cover_image });
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const navigation = useNavigation();

    const handleBackToProfileScreen = () => {
        navigation.navigate('Profile');
    }

    const handleSave = async () => {
        if (authUser?.cover_image !== coverImage.uri) {
            try {
                formData = new FormData();
                formData.append('cover_image', {
                    uri: coverImage.uri,
                    name: coverImage.fileName,
                    type: coverImage.mimeType,
                });

                const accessToken = await AsyncStorage.getItem('access-token');

                setLoading(true);
                const res = await authAxios(accessToken).put(endpoints['currentUser'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                dispatch({
                    type: 'imageChange',
                    payload: {
                        'cover_image': res.data['user'] ?
                            res.data['user']['cover_image'] : res.data['cover_image'],
                    },
                });

                navigation.navigate('Profile');
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            navigation.navigate('Profile');
        }
    }

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập bị từ chối', "Bạn không có quyền truy cập vào thư viện ảnh.");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setCoverImage(result.assets[0]);
            }
        }
    }

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.background
        }}>
            <View style={styles.header}>
                <View style={styles.actionBar}>
                    <IconButton
                        icon='keyboard-backspace'
                        size={30}
                        onPress={handleBackToProfileScreen}
                        style={{ margin: 0 }}
                    />
                </View>

                <View style={styles.title}>
                    <Title>Thay đổi ảnh bìa</Title>
                </View>
            </View>

            <Divider />

            <View style={styles.content}>
                <TouchableOpacity onPress={handlePickImage}>
                    <Card.Cover
                        style={styles.coverImage}
                        source={coverImage.uri ? { uri: coverImage.uri } : require('../../assets/images/default-cover-image.jpg')}
                    />
                </TouchableOpacity>

                <Button style={styles.saveButton} mode='contained-tonal' onPress={handleSave}>
                    {loading ? <ActivityIndicator color={theme.colors.onSecondaryContainer} size={18} /> : 'Lưu thay đổi'}
                </Button>
            </View>
        </View>
    );
}

export default CoverImageChangeScreen;