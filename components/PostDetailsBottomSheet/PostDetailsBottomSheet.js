import { forwardRef, useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import PostDetailsItem from "../PostDetailsItem/PostDetailsItem";
import styles from "./styles";

const PostDetailsBottomSheet = (props, ref) => {
    const theme = useTheme();

    const snapPoints = useMemo(() => ['100%'], []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: theme.colors.shadow }}
            handleIndicatorStyle={{ backgroundColor: theme.colors.onSurface }}
        >
            <View style={styles.container}>
                <PostDetailsItem />
            </View>
        </BottomSheetModal>
    );
}

export default forwardRef(PostDetailsBottomSheet);