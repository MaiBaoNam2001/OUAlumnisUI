import { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
    Button,
    Card,
    Divider,
    IconButton,
    Paragraph,
    Title,
    useTheme
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../UserContext";
import styles from "./styles";

const ProfileScreen = () => {
    const [currentUser, dispatch] = useContext(UserContext);
    const authUser = currentUser?.user ? currentUser?.user : currentUser;

    const theme = useTheme();
    const navigation = useNavigation();


    const handleBackToMenuScreen = () => {
        navigation.navigate('Menu');
    }

    const handleNavigateToUserInfoScreen = () => {
        navigation.navigate('UserInfo');
    }

    const handleNavigateToCoverImageChangeScreen = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'CoverImageChange' },
            ]
        });
    }

    const handleNavigateToAvatarChangeScreen = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'AvatarChange' },
            ]
        });
    }

    const handleNavigateToBioChangeScreen = (title) => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'BioChange',
                    params: { 'title': title },
                },
            ]
        });
    }

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.background
        }}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <IconButton
                        icon='keyboard-backspace'
                        size={30}
                        onPress={handleBackToMenuScreen}
                        style={{ margin: 0 }}
                    />
                </View>

                <View style={styles.actionBar}>
                    <IconButton icon='magnify' size={30} onPress={() => console.info('Press')} style={{ margin: 0 }} />
                </View>
            </View>

            <Divider />

            <View style={styles.content}>
                <View style={styles.profile}>
                    <View style={styles.images}>
                        <TouchableOpacity onPress={handleNavigateToCoverImageChangeScreen}>
                            <Image
                                style={styles.coverImage}
                                source={authUser?.cover_image ? { uri: authUser?.cover_image } : require('../../assets/images/default-cover-image.jpg')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.avatarWrapper}
                            onPress={handleNavigateToAvatarChangeScreen}
                        >
                            <Image
                                style={{ ...styles.avatar, backgroundColor: theme.colors.primary }}
                                source={authUser?.avatar ? { uri: authUser?.avatar } : require('../../assets/images/default-avatar.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemWrapper}>
                        <Title style={styles.fullName}>{authUser?.last_name} {authUser?.first_name}</Title>
                    </View>

                    {authUser?.role !== 'ADMIN' &&
                        <View style={styles.itemWrapper}>
                            {currentUser?.bio ?
                                <TouchableOpacity onPress={() => handleNavigateToBioChangeScreen('Chỉnh sửa tiểu sử')}>
                                    <Card>
                                        <Card.Content>
                                            <Paragraph>{currentUser?.bio}</Paragraph>
                                        </Card.Content>
                                    </Card>
                                </TouchableOpacity>
                                : <Button
                                    mode='contained-tonal'
                                    onPress={() => handleNavigateToBioChangeScreen('Thêm tiểu sử')}
                                >
                                    Thêm tiểu sử
                                </Button>
                            }
                        </View>
                    }

                    <View style={styles.itemWrapper}>
                        <Button mode='outlined' onPress={handleNavigateToUserInfoScreen}>Xem thông tin giới thiệu</Button>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen;