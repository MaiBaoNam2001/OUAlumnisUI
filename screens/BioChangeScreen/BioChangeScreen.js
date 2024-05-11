import { useContext, useState } from "react";
import { View } from "react-native";
import {
    Divider,
    IconButton,
    Title,
    Button,
    ActivityIndicator,
    useTheme,
    TextInput,
    Text
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../../UserContext";
import { authAxios, endpoints } from "../../Axios";
import styles from "./styles";

const BioChangeScreen = () => {
    const [currentUser, dispatch] = useContext(UserContext);
    const [bio, setBio] = useState(currentUser?.bio);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    const { title } = route?.params;

    const handleBackToProfileScreen = () => {
        navigation.navigate('Profile');
    }

    const handleSave = async () => {
        if (currentUser?.bio !== bio) {
            try {
                formData = new FormData();
                formData.append('bio', bio);

                const accessToken = await AsyncStorage.getItem('access-token');

                setLoading(true);
                const res = await authAxios(accessToken).put(endpoints['currentUser'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                dispatch({
                    type: 'bioChange',
                    payload: {
                        'bio': res.data['bio'],
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
                    <Title>{title}</Title>
                </View>
            </View>

            <Divider />

            <View style={styles.content}>
                <TextInput
                    style={styles.bio}
                    mode='outlined'
                    multiline={true}
                    value={bio}
                    onChangeText={value => setBio(value)}
                    numberOfLines={5}
                    placeholder='Mô tả ngắn về bạn...'
                    outlineStyle={{ borderRadius: 10 }}
                />

                <Button style={styles.saveButton} mode='contained-tonal' onPress={handleSave}>
                    {loading ? <ActivityIndicator color={theme.colors.onSecondaryContainer} size={18} /> : 'Lưu thay đổi'}
                </Button>
            </View>
        </View>
    );
}

export default BioChangeScreen;