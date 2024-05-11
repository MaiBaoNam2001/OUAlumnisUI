import { useContext } from "react";
import { ScrollView, View } from "react-native";
import {
    Divider,
    IconButton,
    Title,
    List,
    Avatar,
    Card,
    useTheme
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import UserContext from "../../UserContext";
import styles from "./styles";

const UserInfoScreen = () => {
    const [currentUser, dispatch] = useContext(UserContext);
    const authUser = currentUser?.user ? currentUser?.user : currentUser;

    const theme = useTheme();
    const navigation = useNavigation();


    const handleBackToProfileScreen = () => {
        navigation.navigate('Profile');
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
                    <Title>Giới thiệu</Title>
                </View>
            </View>

            <Divider />

            <ScrollView style={styles.content}>
                {authUser?.role === 'ALUMNI' &&
                    <View style={styles.contentItem}>
                        <List.Section>
                            <List.Subheader style={styles.listSubHeader}>Thông tin sinh viên</List.Subheader>
                            <List.Item
                                title={currentUser?.student_id}
                                description='Mã số sinh viên'
                                left={() => <Avatar.Icon size={44} icon='card-account-details' />}
                            />

                            <List.Item
                                title={currentUser?.faculty.name}
                                description='Khoa'
                                left={() => <Avatar.Icon size={44} icon='school' />}
                            />

                            <List.Item
                                title={currentUser?.major.name}
                                description='Ngành'
                                left={() => <Avatar.Icon size={44} icon='book-open-blank-variant' />}
                            />

                            <List.Item
                                title={currentUser?.school_year.name}
                                description='Niên khóa'
                                left={() => <Avatar.Icon size={44} icon='calendar' />}
                            />
                        </List.Section>
                    </View>
                }

                {authUser?.role === 'LECTURER' &&
                    <View style={styles.contentItem}>
                        <List.Section>
                            <List.Subheader style={styles.listSubHeader}>Thông tin giảng viên</List.Subheader>
                            <List.Item
                                title={currentUser?.faculty.name}
                                description='Khoa'
                                left={() => <Avatar.Icon size={44} icon='school' />}
                            />

                            <List.Item
                                title={currentUser?.academic_rank.name}
                                description='Học hàm'
                                left={() => <Avatar.Icon size={44} icon='medal' />}
                            />

                            <List.Item
                                title={currentUser?.academic_degree.name}
                                description='Học vị'
                                left={() => <Avatar.Icon size={44} icon='star-circle' />}
                            />
                        </List.Section>
                    </View>
                }

                <View style={styles.contentItem}>
                    <List.Section>
                        <List.Subheader style={styles.listSubHeader}>Thông tin cơ bản</List.Subheader>
                        <List.Item
                            title={authUser?.gender.name}
                            description='Giới tính'
                            left={() => <Avatar.Icon size={44} icon='account' />}
                        />

                        <List.Item
                            title={moment(authUser?.date_of_birth).format('DD/MM/YYYY')}
                            description='Ngày sinh'
                            left={() => <Avatar.Icon size={44} icon='cake-variant' />}
                        />
                    </List.Section>
                </View>

                {authUser?.role === 'ALUMNI' &&
                    <View style={styles.contentItem}>
                        <List.Section>
                            <List.Subheader style={styles.listSubHeader}>Thông tin công việc</List.Subheader>
                            <List.Item
                                title={currentUser?.workplace}
                                description='Nơi làm việc'
                                left={() => <Avatar.Icon size={44} icon='account' />}
                            />

                            <List.Item
                                title={currentUser?.position}
                                description='Chức vụ'
                                left={() => <Avatar.Icon size={44} icon='cake-variant' />}
                            />
                        </List.Section>
                    </View>
                }

                <View style={styles.contentItem}>
                    <List.Section>
                        <List.Subheader style={styles.listSubHeader}>Thông tin liên hệ</List.Subheader>
                        <List.Item
                            title={authUser?.email}
                            description='Email'
                            left={() => <Avatar.Icon size={44} icon='email' />}
                        />
                    </List.Section>
                </View>

                {authUser?.role !== 'ADMIN' &&
                    <View style={styles.contentItem}>
                        <List.Section>
                            <List.Subheader style={styles.listSubHeader}>Hình ảnh</List.Subheader>
                            <Card.Cover
                                style={{ height: 400, marginTop: 15 }}
                                source={{ uri: currentUser?.image }}
                            />
                        </List.Section>
                    </View>
                }
            </ScrollView>
        </View>
    );
}

export default UserInfoScreen;