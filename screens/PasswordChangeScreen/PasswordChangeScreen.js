import { useRef, useState } from "react";
import { View } from "react-native";
import {
    Divider,
    IconButton,
    Title,
    Button,
    ActivityIndicator,
    useTheme,
    TextInput,
    HelperText,
    Portal,
    Dialog,
    Paragraph
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAxios, endpoints } from "../../Axios";
import styles from "./styles";

const PasswordChangeScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState('Vui lòng nhập mật khẩu hiện tại.')
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('Vui lòng nhập mật khẩu mới.')
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('Vui lòng nhập lại mật khẩu mới.')
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPasswordError, setShowCurrentPasswordError] = useState(false);
    const [showNewPasswordError, setShowNewPasswordError] = useState(false);
    const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const theme = useTheme();
    const navigation = useNavigation();

    const handleBackToMenuScreen = () => {
        navigation.navigate('Menu');
    }

    const handleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleHideDialog = () => {
        setShowDialog(false);
    }

    const hasValidFields = (currentPassword, newPassword, confirmPassword) => {
        return (
            currentPassword &&
            newPassword &&
            newPassword !== currentPassword &&
            confirmPassword &&
            confirmPassword === newPassword
        );
    }

    const handleSave = async () => {
        setShowCurrentPasswordError(!currentPassword);

        if (newPassword) {
            if (newPassword === currentPassword) {
                setNewPasswordErrorMessage('Mật khẩu mới không thể giống mật khẩu hiện tại.')
                setShowNewPasswordError(true);
            } else {
                setShowNewPasswordError(false);
            }
        } else {
            setNewPasswordErrorMessage('Vui lòng nhập mật khẩu mới.')
            setShowNewPasswordError(true);
        }

        if (confirmPassword) {
            if (confirmPassword !== newPassword) {
                setConfirmPasswordErrorMessage('Mật khẩu nhập lại không khớp mật khẩu mới.')
                setShowConfirmPasswordError(true)
            } else {
                setShowConfirmPasswordError(false)
            }
        } else {
            setConfirmPasswordErrorMessage('Vui lòng nhập lại mật khẩu mới.')
            setShowConfirmPasswordError(true)
        }

        if (hasValidFields(currentPassword, newPassword, confirmPassword)) {
            try {
                const accessToken = await AsyncStorage.getItem('access-token');

                setLoading(true);
                const checkCurrentPassword = await authAxios(accessToken).post(endpoints['checkPassword'], {
                    'password': currentPassword,
                });

                if (checkCurrentPassword.data.result) {
                    formData = new FormData();
                    formData.append('password', newPassword);

                    const res = await authAxios(accessToken).put(endpoints['currentUser'], formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });

                    setTitle('Đổi mật khẩu thành công')
                    setErrorMessage('Bạn đã đổi mật khẩu thành công.')
                    setShowDialog(true)
                } else {
                    setTitle('Đổi mật khẩu thất bại')
                    setErrorMessage('Mật khẩu hiện tại không chính xác.')
                    setShowDialog(true)
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
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
                        onPress={handleBackToMenuScreen}
                        style={{ margin: 0 }}
                    />
                </View>

                <View style={styles.title}>
                    <Title>Thay đổi mật khẩu</Title>
                </View>
            </View>

            <Divider />

            <View style={styles.content}>
                <View>
                    <TextInput
                        ref={currentPasswordRef}
                        mode='outlined'
                        value={currentPassword}
                        onChangeText={value => setCurrentPassword(value)}
                        onSubmitEditing={() => newPasswordRef.current.focus()}
                        secureTextEntry={!showCurrentPassword}
                        right={
                            <TextInput.Icon
                                icon={showCurrentPassword ? 'eye' : 'eye-off'}
                                onPress={handleShowCurrentPassword}
                                color={showCurrentPasswordError ? theme.colors.error : undefined}
                            />
                        }
                        label='Mật khẩu hiện tại'
                        error={showCurrentPasswordError}
                    />
                    <HelperText type='error' visible={showCurrentPasswordError}>
                        {currentPasswordErrorMessage}
                    </HelperText>
                </View>

                <View style={{ marginVertical: 5 }}>
                    <TextInput
                        ref={newPasswordRef}
                        mode='outlined'
                        value={newPassword}
                        onChangeText={value => setNewPassword(value)}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        secureTextEntry={!showNewPassword}
                        right={
                            <TextInput.Icon
                                icon={showNewPassword ? 'eye' : 'eye-off'}
                                onPress={handleShowNewPassword}
                                color={showNewPasswordError ? theme.colors.error : undefined}
                            />
                        }
                        label='Mật khẩu mới'
                        error={showNewPasswordError}
                    />
                    <HelperText type='error' visible={showNewPasswordError}>
                        {newPasswordErrorMessage}
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        ref={confirmPasswordRef}
                        mode='outlined'
                        value={confirmPassword}
                        onChangeText={value => setConfirmPassword(value)}
                        secureTextEntry={!showConfirmPassword}
                        right={
                            <TextInput.Icon
                                icon={showConfirmPassword ? 'eye' : 'eye-off'}
                                onPress={handleShowConfirmPassword}
                                color={showConfirmPasswordError ? theme.colors.error : undefined}
                            />
                        }
                        label='Nhập lại mật khẩu mới'
                        error={showConfirmPasswordError}
                    />
                    <HelperText type='error' visible={showConfirmPasswordError}>
                        {confirmPasswordErrorMessage}
                    </HelperText>
                </View>

                <Button style={styles.saveButton} mode='contained-tonal' onPress={handleSave}>
                    {loading ? <ActivityIndicator color={theme.colors.onSecondaryContainer} size={18} /> : 'Lưu thay đổi'}
                </Button>

                <Portal>
                    <Dialog visible={showDialog} onDismiss={handleHideDialog}>
                        <Dialog.Title>{title}</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>{errorMessage}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleHideDialog}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </View>
    );
}

export default PasswordChangeScreen;