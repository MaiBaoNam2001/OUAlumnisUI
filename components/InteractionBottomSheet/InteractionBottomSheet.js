import { forwardRef, useMemo } from "react";
import { View } from "react-native";
import {
    Avatar,
    Divider,
    IconButton,
    Title,
    useTheme
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AllScreen from "./AllScreen/AllScreen";
import LikeScreen from "./LikeScreen/LikeScreen";
import LoveScreen from "./LoveScreen/LoveScreen";
import HahaScreen from "./HahaScreen/HahaScreen";
import styles from "./styles";

const Tab = createMaterialTopTabNavigator();

const InteractionBottomSheet = (props, ref) => {
    const theme = useTheme();

    const snapPoints = useMemo(() => ['100%'], []);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: theme.colors.shadow }}
            handleIndicatorStyle={{ backgroundColor: 'transparent' }}
            enableContentPanningGesture={false}
            stackBehavior='push'
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.actionBar}>
                        <IconButton
                            icon='keyboard-backspace'
                            size={30}
                            onPress={props.onHide}
                            style={{ margin: 0 }}
                        />
                    </View>

                    <View style={styles.title}>
                        <Title>Người đã bày tỏ cảm xúc</Title>
                    </View>
                </View>

                <Divider />

                <NavigationContainer independent={true}>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarLabelStyle: {
                                textTransform: 'none',
                                fontSize: 14,
                            },
                            tabBarItemStyle: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            tabBarAndroidRipple: {
                                borderless: false,
                                color: 'transparent',
                            },
                            tabBarPressColor: 'transparent',
                            tabBarActiveTintColor: theme.colors.onSurface,
                            tabBarIndicatorContainerStyle: { backgroundColor: theme.colors.shadow },
                            tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
                        }}
                    >
                        <Tab.Screen
                            name='All'
                            component={AllScreen}
                            options={{ tabBarLabel: 'Tất cả 100', }}
                        />
                        <Tab.Screen
                            name='Like'
                            component={LikeScreen}
                            options={{
                                tabBarLabel: '60',
                                tabBarIcon: (focused, color) => (
                                    <Avatar.Image
                                        size={24}
                                        source={require('../../assets/icons/like-icon.png')}
                                    />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name='Love'
                            component={LoveScreen}
                            options={{
                                tabBarLabel: '30',
                                tabBarIcon: (focused, color) => (
                                    <Avatar.Image
                                        size={24}
                                        source={require('../../assets/icons/heart-icon.png')}
                                    />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name='Haha'
                            component={HahaScreen}
                            options={{
                                tabBarLabel: '10',
                                tabBarIcon: (focused, color) => (
                                    <Avatar.Image
                                        size={24}
                                        source={require('../../assets/icons/haha-icon.png')}
                                    />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </BottomSheetModal>
    );
}

export default forwardRef(InteractionBottomSheet);