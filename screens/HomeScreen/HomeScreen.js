import { useContext, useRef } from "react";
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
import UserContext from "../../UserContext";
import ScrollEnabledContext from "../../ScrollEnabledContext";
import PostItem from "../../components/PostItem/PostItem";
import styles from "./styles";

const HomeScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [currentUser, dispatch] = useContext(UserContext);

    const collageRef = useRef(null);
    const scrollViewRef = useRef(null);

    const setScrollEnabled = (boolean) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.setNativeProps({ scrollEnabled: boolean });
        }
    }

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
                                onPress={() => console.info('Press')}
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
                                    onPress={() => console.info('Press')}
                                >
                                    Bạn đang nghĩ gì?
                                </Button>

                            </View>

                            <View>
                                <IconButton
                                    icon='image-multiple'
                                    iconColor='#00cd00'
                                    onPress={() => console.info('Press')}
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
            </View>
        </ScrollEnabledContext.Provider>
    );
}

export default HomeScreen;