import { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
    ActivityIndicator,
    Avatar,
    Button,
    Dialog,
    HelperText,
    Paragraph,
    Portal,
    TextInput,
    Title,
    useTheme
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios, { authAxios, endpoints } from "../../../Axios";
import UserContext from "../../../UserContext";
import GlobalStyles from "../../../styles/GlobalStyles";
import styles from "./styles";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showUsernameError, setShowUsernameError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const theme = useTheme();
    const navigation = useNavigation();
    const [, dispatch] = useContext(UserContext);

    useEffect(() => {
        setUsernameErrorMessage('Vui lòng nhập tên người dùng.');
        setPasswordErrorMessage('Vui lòng nhập mật khẩu.');
    }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleHideDialog = () => {
        setShowDialog(false);
    }

    const handleLogin = async () => {
        setShowUsernameError(!username);
        setShowPasswordError(!password);

        if (username && password) {
            try {
                setLoading(true);
                const res = await Axios.post(endpoints['login'], {
                    'grant_type': 'password',
                    'client_id': '8kWKQdFdPgGNHwn0cz23C16FL1moY6gyeUm3DiWd',
                    'client_secret': 'Xq1XvdeEs4czbatnCDptL1dJRtyDocRSpvBL5Wl5zCuYFVTpCjuoeW7lqjnt0z0KmhIivFr4D5GTBI500TVWQDVYA5xMaus34tKnVgAaBbtoeDEAld86ymaipe7uLbur',
                    'username': username,
                    'password': password,
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
                const errorMessages = Object.fromEntries([
                    ['invalid_grant', 'Có vẻ như bạn đã nhập sai tên người dùng hoặc mật khẩu. Vui lòng thử lại.'],
                    ['User account is not confirmed', 'Tài khoản của bạn chưa được xác nhận.',],
                    ['User account is locked', 'Tài khoản của bạn hiện đang bị khóa. Vui lòng liên hệ với bộ phận hỗ trợ để được trợ giúp.']
                ]);

                const errMessage = errorMessages[error.response.data.error];
                if (errMessage) {
                    setErrorMessage(errMessage);
                    setShowDialog(true);
                }
            } finally {
                setLoading(false);
            }
        }
    }

    const handleNavigateToAlumniRegisterScreen = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'AlumniRegister' },
            ]
        });
    }

    return (
        <View style={{
            ...GlobalStyles.container,
            ...styles.container,
            backgroundColor: theme.colors.background
        }}>
            <View style={styles.logo}>
                <Avatar.Icon size={100} icon='book-open-blank-variant' />
                <Title>OU Alumnis</Title>
            </View>

            <View>
                <TextInput
                    ref={usernameRef}
                    value={username}
                    onChangeText={value => setUsername(value)}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    autoCapitalize='none'
                    textContentType='username'
                    label='Tên người dùng'
                    style={{ backgroundColor: theme.colors.background }}
                    error={showUsernameError}
                />
                <HelperText type='error' visible={showUsernameError}>
                    {usernameErrorMessage}
                </HelperText>

                <TextInput
                    ref={passwordRef}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={!showPassword}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye' : 'eye-off'}
                            onPress={handleShowPassword}
                            color={showPasswordError ? theme.colors.error : undefined}
                        />
                    }
                    label='Mật khẩu'
                    style={{ backgroundColor: theme.colors.background }}
                    error={showPasswordError}
                />
                <HelperText type='error' visible={showPasswordError}>
                    {passwordErrorMessage}
                </HelperText>
            </View>

            <View>
                <Button style={styles.loginButton} mode='contained' onPress={handleLogin}>
                    {loading ? <ActivityIndicator color={theme.colors.onPrimary} size={18} /> : 'Đăng nhập'}
                </Button>

                <Portal>
                    <Dialog visible={showDialog} onDismiss={handleHideDialog}>
                        <Dialog.Title>Đăng nhập thất bại</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>{errorMessage}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleHideDialog}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <Button mode='outlined' onPress={handleNavigateToAlumniRegisterScreen}>Đăng ký thông tin cựu sinh viên</Button>
            </View>
        </View>
    );
}

export default LoginScreen;