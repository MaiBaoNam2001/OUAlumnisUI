import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Card, Paragraph, Title, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios, { authAxios, endpoints } from "../../Axios";
import UserContext from "../../UserContext";
import GlobalStyles from "../../styles/GlobalStyles";
import styles from "./styles";

const LoadingScreen = () => {
    const [lockUserAccount, setLockUserAccount] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);

    const theme = useTheme();
    const navigation = useNavigation();
    const [, dispatch] = useContext(UserContext);

    useEffect(() => {
        setTimeout(async () => {
            const accessToken = await AsyncStorage.getItem('access-token');
            if (accessToken) {
                try {
                    const currentUser = await authAxios(accessToken).get(endpoints['currentUser']);

                    dispatch({
                        type: 'login',
                        payload: {
                            ...currentUser.data,
                        }
                    });

                    navigation.navigate('Home');
                } catch (error) {
                    if (error.response.status === 500) {
                        setLockUserAccount(true)
                    } else {
                        const refreshToken = await AsyncStorage.getItem('refresh-token');

                        try {
                            const res = await Axios.post(endpoints['login'], {
                                'grant_type': 'refresh_token',
                                'client_id': 'DKLDT4HuMKoWKP8RuPWnunlZMD2NSewi2c8yfnXq',
                                'client_secret': 'lC1sJZs1nKS3q2K80JyVrVtCRqBfHGGe8eYNpQtqGDQKTxJ3KLfPX5Fp837mwovpbLidV6tVxa6PU5yCUn8PUoDHgsw6alL13x7HEa2Kc3XRxcvB6N2kBskQAahs4HCO',
                                'refresh_token': refreshToken,
                            });

                            const currentUser = await authAxios(res.data['access_token']).get(endpoints['currentUser']);
                            await AsyncStorage.setItem('access-token', res.data['access_token']);
                            await AsyncStorage.setItem('refresh-token', res.data['refresh_token']);

                            dispatch({
                                type: 'login',
                                payload: {
                                    ...currentUser.data,
                                }
                            });

                            navigation.navigate('Home');
                        } catch (error) {
                            if (error.response.status === 500) {
                                setLockUserAccount(true)
                            }
                        }
                    }
                }
            } else {
                navigation.navigate('Login');
            }
        }, 2000);
    }, []);

    useEffect(() => {
        if (lockUserAccount) {
            if (timeLeft > 0) {
                const intervalId = setInterval(() => {
                    setTimeLeft(timeLeft - 1);
                }, 1000);

                return () => clearInterval(intervalId);
            } else {
                handleRemoveUserTokens();
                navigation.navigate('Login');
            }
        }
    }, [timeLeft, lockUserAccount]);

    const handleRemoveUserTokens = async () => {
        await AsyncStorage.removeItem('access-token');
        await AsyncStorage.removeItem('refresh-token');
    }

    return (
        <View style={{ ...GlobalStyles.container, ...styles.container, backgroundColor: theme.colors.background }}>
            <View>
                <Avatar.Icon size={100} icon='book-open-blank-variant' />
                <Title>OU Alumnis</Title>
            </View>
            {lockUserAccount &&
                <View style={{ marginTop: 40 }}>
                    <Card>
                        <Card.Content>
                            <Title>Tài khoản của bạn hiện đang bị khóa</Title>
                            <Paragraph>Bạn sẽ được tự động chuyển hướng đến trang đăng nhập sau {timeLeft} giây.</Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            }
        </View>
    );
}

export default LoadingScreen;