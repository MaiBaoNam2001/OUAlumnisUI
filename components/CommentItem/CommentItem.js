import { TouchableOpacity, View } from "react-native";
import {
    Avatar,
    Card,
    Paragraph,
    Text,
    useTheme
} from "react-native-paper";
import styles from "./styles";

const CommentItem = () => {
    const theme = useTheme();

    return (
        <View style={styles.contentItem}>
            <TouchableOpacity>
                <Avatar.Image
                    size={44}
                    source={require('../../assets/images/default-avatar.png')}
                    style={styles.avatar}
                />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Card style={{ borderRadius: 20 }}>
                    <Card.Content style={styles.comment}>
                        <TouchableOpacity>
                            <Text style={styles.fullName}>Mai Bảo Nam</Text>
                        </TouchableOpacity>

                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Paragraph>
                    </Card.Content>
                </Card>

                <View style={styles.actionBar}>
                    <Text style={{ ...styles.createdAt, color: theme.colors.onSurfaceVariant }}>1 ngày</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => console.info('Edit')}>
                            <Text style={{ ...styles.editButton, color: theme.colors.onSurfaceVariant }}>Chỉnh sửa</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => console.info('Delete')}>
                            <Text style={{ ...styles.deleteButton, color: theme.colors.onSurfaceVariant }}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CommentItem;