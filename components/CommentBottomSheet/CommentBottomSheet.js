import { forwardRef, useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import {
    Divider,
    IconButton,
    Title,
    useTheme
} from "react-native-paper";
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CommentItem from "../CommentItem/CommentItem";
import styles from "./styles";

const CommentBottomSheet = (props, ref) => {
    const [comment, setComment] = useState('');

    const theme = useTheme();

    const snapPoints = useMemo(() => ['100%'], []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: theme.colors.shadow }}
            handleIndicatorStyle={{ backgroundColor: theme.colors.onSurface }}
            stackBehavior='push'
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Title>Bình luận</Title>
                </View>

                <Divider />

                <BottomSheetScrollView contentContainerStyle={styles.content}>
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                </BottomSheetScrollView>

                <Divider />

                <View style={styles.footer}>
                    <View style={styles.commentInputWrapper}>
                        <TextInput
                            style={{
                                ...styles.commentInput,
                                color: theme.colors.onSecondaryContainer,
                                backgroundColor: theme.colors.secondaryContainer,
                            }}
                            multiline={true}
                            value={comment}
                            onChangeText={value => setComment(value)}
                            placeholder='Viết bình luận...'
                            placeholderTextColor={theme.colors.outline}
                        />
                    </View>

                    <View style={styles.sendButtonWrapper}>
                        <IconButton
                            icon='send'
                            size={30}
                            onPress={() => console.info('Send')}
                            iconColor={theme.colors.primary}
                            style={{ margin: 0 }}
                        />
                    </View>
                </View>
            </View>
        </BottomSheetModal>
    );
}

export default forwardRef(CommentBottomSheet);