import { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
    Divider,
    IconButton,
    Title,
    Button,
    ActivityIndicator,
    Avatar,
    useTheme
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../UserContext";
import { authAxios, endpoints } from "../../Axios";
import styles from "./styles";

const AvatarChangeScreen = () => {
    const [currentUser, dispatch] = useContext(UserContext);
    const authUser = currentUser?.user ? currentUser?.user : currentUser;
    const [avatar, setAvatar] = useState({ 'uri': authUser?.avatar });
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const navigation = useNavigation();


    const handleBackToProfileScreen = () => {
        navigation.navigate('Profile');
    }

    const handleSave = async () => {
        if (authUser?.avatar !== avatar.uri) {
            try {
                formData = new FormData();
                formData.append('avatar', {
                    uri: avatar.uri,
                    name: avatar.fileName,
                    type: avatar.mimeType,
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
                        'avatar': res.data['user'] ?
                            res.data['user']['avatar'] : res.data['avatar'],
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
                setAvatar(result.assets[0]);
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
                    <Title>Thay đổi ảnh đại diện</Title>
                </View>
            </View>

            <Divider />

            <View style={styles.content}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handlePickImage}>
                        <Avatar.Image
                            size={150}
                            source={avatar.uri ? { uri: avatar.uri } : require('../../assets/images/default-avatar.png')}
                        />
                    </TouchableOpacity>
                </View>

                <Button style={styles.saveButton} mode='contained-tonal' onPress={handleSave}>
                    {loading ? <ActivityIndicator color={theme.colors.onSecondaryContainer} size={18} /> : 'Lưu thay đổi'}
                </Button>
            </View>
        </View>
    );
}

export default AvatarChangeScreen;