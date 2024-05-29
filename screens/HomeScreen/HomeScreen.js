import { useCallback, useContext, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import {
    Avatar,
    Button,
    Card,
    Divider,
    Headline,
    IconButton,
    useTheme
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import UserContext from "../../UserContext";
import ScrollEnabledContext from "../../ScrollEnabledContext";
import PostCreationBottomSheet from "../../components/PostCreationBottomSheet/PostCreationBottomSheet";
import PostItem from "../../components/PostItem/PostItem";
import styles from "./styles";

const HomeScreen = () => {
    const [currentUser, dispatch] = useContext(UserContext);

    const [postImages, setPostImages] = useState([]);

    const theme = useTheme();

    const scrollViewRef = useRef(null);
    const postCreationBottomSheetRef = useRef(null);

    const setScrollEnabled = (boolean) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.setNativeProps({ scrollEnabled: boolean });
        }
    }

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
                handleOpenPostCreationBottomSheet();
            }
        }
    }

    const handleOpenPostCreationBottomSheet = useCallback(() => {
        postCreationBottomSheetRef.current?.present();
    }, []);

    const handleClosePostCreationBottomSheet = useCallback(() => {
        postCreationBottomSheetRef.current?.close();
    }, []);

    return (
        <ScrollEnabledContext.Provider value={setScrollEnabled}>
            <View style={{
                flex: 1,
                paddingTop: 20,
                backgroundColor: theme.colors.background
            }}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Headline style={{
                            fontWeight: 'bold',
                            color: theme.colors.primary,
                        }}>
                            OU Alumnis
                        </Headline>
                    </View>

                    <View style={styles.actionBar}>
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton
                                icon='plus-circle'
                                size={30}
                                onPress={handleOpenPostCreationBottomSheet}
                                style={styles.addPostButton}
                            />

                            <IconButton
                                icon='magnify'
                                size={30}
                                onPress={() => console.info('Press')}
                                style={styles.searchButton}
                            />
                        </View>
                    </View>
                </View>

                <Divider />

                <ScrollView ref={scrollViewRef}>
                    <Card style={styles.addPostContainer}>
                        <Card.Content style={styles.addPostWrapper}>
                            <View>
                                <Avatar.Image
                                    size={50}
                                    source={require('../../assets/images/default-avatar.png')}
                                />
                            </View>

                            <View style={styles.addPostBar}>
                                <Button
                                    mode='outlined'
                                    textColor={theme.colors.onSurfaceVariant}
                                    contentStyle={{ justifyContent: 'flex-start' }}
                                    onPress={handleOpenPostCreationBottomSheet}
                                >
                                    Bạn đang nghĩ gì?
                                </Button>

                            </View>

                            <View>
                                <IconButton
                                    icon='image-multiple'
                                    iconColor='#00cd00'
                                    onPress={handlePickMultipleImages}
                                    style={{ margin: 0 }}
                                />
                            </View>
                        </Card.Content>
                    </Card>

                    <PostItem />
                    <PostItem />
                    <PostItem />
                    <PostItem />
                </ScrollView>

                <PostCreationBottomSheet
                    ref={postCreationBottomSheetRef}
                    data={postImages}
                    setData={setPostImages}
                    onHide={handleClosePostCreationBottomSheet}
                />
            </View>
        </ScrollEnabledContext.Provider>
    );
}

export default HomeScreen;