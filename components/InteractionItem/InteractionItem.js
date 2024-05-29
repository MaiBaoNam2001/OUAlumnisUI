import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Text } from "react-native-paper";
import styles from "./styles";

const InteractionItem = ({ type }) => {
    const [iconURL] = useState({
        'LIKE': require('../../assets/icons/like-icon.png'),
        'LOVE': require('../../assets/icons/heart-icon.png'),
        'HAHA': require('../../assets/icons/haha-icon.png'),
    });

    return (
        <TouchableOpacity style={styles.contentItem}>
            <Avatar.Image
                size={44}
                source={require('../../assets/images/default-avatar.png')}
                style={styles.avatar}
            />

            {iconURL[type] &&
                <Avatar.Image
                    size={24}
                    source={iconURL[type]}
                    style={styles.icon}
                />
            }

            <Text style={styles.fullName}>Mai Bảo Nam</Text>
        </TouchableOpacity>
    );
}

export default InteractionItem;