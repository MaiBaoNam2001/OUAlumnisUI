import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import {
    Avatar,
    Button,
    Card,
    Headline,
    IconButton,
    useTheme
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../UserContext";
import GlobalStyles from "../../styles/GlobalStyles";
import styles from "./styles";

const MenuScreen = () => {
    const [currentUser, dispatch] = useContext(UserContext);
    const authUser = currentUser?.user ? currentUser?.user : currentUser;

    const theme = useTheme();
    const navigation = useNavigation();


    console.info(currentUser);

    const handleNavigateToProfileScreen = () => {
        navigation.navigate('Profile');
    }

    const handleNavigateToPasswordChangeScreen = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'PasswordChange' },
            ]
        });
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('access-token');
        await AsyncStorage.removeItem('refresh-token');

        dispatch({
            type: 'logout',
        });

        navigation.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ]
        });
    }

    return (
        <View style={{
            ...GlobalStyles.container,
            backgroundColor: theme.colors.background
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Headline>Menu</Headline>
                    </View>

                    <View style={styles.actionBar}>
                        <IconButton icon='magnify' size={30} onPress={() => console.info('Press')} style={{ margin: 0 }} />
                    </View>
                </View>

                <TouchableOpacity onPress={handleNavigateToProfileScreen}>
                    <Card>
                        <Card.Title
                            title={`${authUser?.last_name} ${authUser?.first_name}`}
                            titleStyle={{
                                textAlignVertical: 'center',
                                fontWeight: 'bold',
                            }}
                            left={(props) =>
                                <Avatar.Image
                                    {...props}
                                    source={authUser?.avatar ? { uri: authUser?.avatar } : require('../../assets/images/default-avatar.png')}
                                />
                            }
                        />
                    </Card>
                </TouchableOpacity>
            </View>

            <View>
                <Button style={styles.passwordChangeButton} mode='outlined' onPress={handleNavigateToPasswordChangeScreen}>Đổi mật khẩu</Button>
                <Button mode='contained-tonal' onPress={handleLogout}>Đăng xuất</Button>
            </View>
        </View>
    );
}

export default MenuScreen;