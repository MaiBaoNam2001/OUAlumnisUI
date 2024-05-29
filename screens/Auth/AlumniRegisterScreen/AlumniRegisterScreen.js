import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import {
    ActivityIndicator,
    Avatar,
    Button,
    Card,
    Dialog,
    HelperText,
    Paragraph,
    Portal,
    TextInput,
    Title,
    useTheme
} from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Axios, { endpoints } from "../../../Axios";
import { isNumeric } from "../../../Utils";
import GlobalStyles from "../../../styles/GlobalStyles";
import styles from "./styles";

const AlumniRegisterScreen = () => {
    const [alumni, setAlumni] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        studentId: '',
        faculty: '',
        major: '',
        schoolYear: '',
        workplace: '',
        position: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        image: '',
    });
    const [alumniErrorMessage, setAlumniErrorMessage] = useState({
        firstName: 'Vui lòng nhập tên.',
        lastName: 'Vui lòng nhập họ.',
        dateOfBirth: 'Vui lòng nhập ngày sinh.',
        gender: 'Vui lòng chọn giới tính.',
        studentId: 'Vui lòng nhập mã số sinh viên.',
        faculty: 'Vui lòng chọn khoa.',
        major: 'Vui lòng chọn ngành.',
        schoolYear: 'Vui lòng chọn niên khóa.',
        workplace: '',
        position: '',
        email: 'Vui lòng nhập email.',
        username: 'Vui lòng nhập tên người dùng.',
        password: 'Vui lòng nhập mật khẩu.',
        confirmPassword: 'Vui lòng nhập lại mật khẩu.',
        image: 'Vui lòng chọn hình ảnh.',
    });
    const [showAlumniError, setShowAlumniError] = useState({
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        gender: false,
        studentId: false,
        faculty: false,
        major: false,
        schoolYear: false,
        workplace: false,
        position: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
        image: false,
    });
    const [loading, setLoading] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogMessage, setDialogMessage] = useState('');
    const [genders, setGenders] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [majors, setMajors] = useState([]);
    const [schoolYears, setSchoolYears] = useState([]);
    const [showGenderDropDown, setShowGenderDropDown] = useState(false);
    const [showFacultyDropDown, setShowFacultyDropDown] = useState(false);
    const [showMajorDropDown, setShowMajorDropDown] = useState(false);
    const [showSchoolYearDropDown, setShowSchoolYearDropDown] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const genderRef = useRef(null);
    const studentIdRef = useRef(null);
    const facultyRef = useRef(null);
    const majorRef = useRef(null);
    const schoolYearRef = useRef(null);
    const workplaceRef = useRef(null);
    const positionRef = useRef(null);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);


    const theme = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        const loadGenders = async () => {
            try {
                const { data: genders } = await Axios.get(endpoints['genders']);
                setGenders(genders.map(gender => ({
                    label: gender.name,
                    value: gender.code
                })));
            } catch (error) {
                console.error('Error loading genders: ', error);
            }
        }

        const loadFaculties = async () => {
            try {
                const { data: faculties } = await Axios.get(endpoints['faculties']);
                setFaculties(faculties.map(faculty => ({
                    label: faculty.name,
                    value: faculty.code
                })));
            } catch (error) {
                console.error('Error loading faculties: ', error);
            }
        }

        const loadSchoolYears = async () => {
            try {
                const { data: schoolYears } = await Axios.get(endpoints['school-years']);
                setSchoolYears(schoolYears.map(schoolYear => ({
                    label: schoolYear.name,
                    value: schoolYear.code
                })));
            } catch (error) {
                console.error('Error loading school-years: ', error);
            }
        }

        loadGenders();
        loadFaculties();
        loadSchoolYears();
    }, []);

    useEffect(() => {
        const loadMajors = async (facultyId) => {
            if (!facultyId) return;

            try {
                const { data: majors } = await Axios.get(endpoints['majors'](facultyId));
                setMajors(majors.map(major => ({
                    label: major.name,
                    value: major.code
                })));
            } catch (error) {
                console.error('Error loading majors: ', error);
            }
        }

        loadMajors(alumni.faculty);
    }, [alumni.faculty]);

    useEffect(() => {
        if (majors.length > 0) {
            handleChangeAlumniValue('major', majors[0].value);
        }
    }, [majors]);

    const handleChangeAlumniValue = (key, value) => {
        setAlumni(prev => ({ ...prev, [key]: value }));
    }

    const handleChangeAlumniErrorMessage = (key, errorMessage) => {
        setAlumniErrorMessage(prev => ({ ...prev, [key]: errorMessage }));
    }

    const handleChangeShowAlumniError = (key, showError) => {
        setShowAlumniError(prev => ({ ...prev, [key]: showError }));
    }

    const hasValidFields = (alumni) => {
        return (
            alumni.firstName &&
            alumni.lastName &&
            alumni.dateOfBirth &&
            alumni.gender &&
            isNumeric(alumni.studentId) &&
            alumni.faculty &&
            alumni.major &&
            alumni.schoolYear &&
            alumni.email.includes('@') &&
            alumni.username &&
            alumni.password &&
            alumni.confirmPassword &&
            alumni.confirmPassword === alumni.password &&
            alumni.image
        );
    }

    const handleRegister = async () => {
        for (const key in alumni) {
            switch (key) {
                case 'studentId':
                    if (alumni[key]) {
                        if (!isNumeric(alumni[key])) {
                            handleChangeAlumniErrorMessage('studentId', 'Mã số sinh viên không hợp lệ.');
                            handleChangeShowAlumniError('studentId', true);
                        } else {
                            handleChangeShowAlumniError('studentId', false);
                        }
                    } else {
                        handleChangeAlumniErrorMessage('studentId', 'Vui lòng nhập mã số sinh viên.');
                        handleChangeShowAlumniError('studentId', true);
                    }
                    break;
                case 'email':
                    if (alumni[key]) {
                        if (!alumni[key].includes('@')) {
                            handleChangeAlumniErrorMessage('email', 'Email không hợp lệ.');
                            handleChangeShowAlumniError('email', true);
                        } else {
                            handleChangeShowAlumniError('email', false);
                        }
                    } else {
                        handleChangeAlumniErrorMessage('email', 'Vui lòng nhập email.');
                        handleChangeShowAlumniError('email', true);
                    }
                    break;
                case 'confirmPassword':
                    if (alumni[key]) {
                        const password = alumni['password'];
                        if (alumni[key] !== password) {
                            handleChangeAlumniErrorMessage('confirmPassword', 'Mật khẩu nhập lại không khớp mật khẩu.')
                            handleChangeShowAlumniError('confirmPassword', true);
                        } else {
                            handleChangeShowAlumniError('confirmPassword', false);
                        }
                    } else {
                        handleChangeAlumniErrorMessage('confirmPassword', 'Vui lòng nhập lại mật khẩu.');
                        handleChangeShowAlumniError('confirmPassword', true);
                    }
                    break;
                default:
                    handleChangeShowAlumniError(key, !alumni[key]);

            }
        }

        if (hasValidFields(alumni)) {
            try {
                const alumniData = {
                    user: JSON.stringify({
                        username: alumni.username,
                        email: alumni.email,
                        password: alumni.password,
                        first_name: alumni.firstName,
                        last_name: alumni.lastName,
                        date_of_birth: moment(alumni.dateOfBirth).format("YYYY-MM-DD"),
                        gender: alumni.gender,
                        avatar: null,
                        cover_image: null,
                    }),
                    student_id: alumni.studentId,
                    image: {
                        uri: alumni.image.uri,
                        name: alumni.image.fileName,
                        type: alumni.image.mimeType,
                    },
                    faculty: alumni.faculty,
                    major: alumni.major,
                    school_year: alumni.schoolYear,
                    workplace: alumni.workplace,
                    position: alumni.position,
                    bio: '',
                }

                const formData = new FormData();

                for (const key in alumniData) {
                    formData.append(key, alumniData[key]);
                }

                setLoading(true);
                const res = await Axios.post(endpoints['alumniRegister'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                setDialogTitle('Đăng ký thành công');
                setDialogMessage('Thông tin cựu sinh viên của bạn đã đăng ký thành công. Vui lòng chờ quản trị viên xác nhận.')
                setShowDialog(true);
            } catch (error) {
                const errorMessages = Object.fromEntries([
                    ['alumnis_alumniprofile.student_id', 'Mã số sinh viên đã tồn tại.'],
                    ['alumnis_user.email', 'Địa chỉ email đã tồn tại.'],
                    ['alumnis_user.username', 'Tên người dùng đã tồn tại.'],
                ]);

                const regex = /for key '([^']+)'/;
                const match = regex.exec(error.response.data.error);

                if (match) {
                    const errorMessage = errorMessages[match[1]];
                    if (errorMessage) {
                        setDialogTitle('Đăng ký thất bại');
                        setDialogMessage(errorMessage);
                        setShowDialog(true);
                    }
                }
            } finally {
                setLoading(false);
            }
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleHideDialog = () => {
        setShowDialog(false);
    }

    const handleBackToLoginScreen = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: 'Login' },
            ]
        });
    }

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập bị từ chối', "Bạn không có quyền truy cập vào thư viện ảnh.");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                handleChangeAlumniValue('image', result.assets[0]);
            }
        }
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

            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 5
                }}>
                    <View style={styles.lastNameInput}>
                        <TextInput
                            ref={lastNameRef}
                            mode='outlined'
                            value={alumni.lastName}
                            onChangeText={value => handleChangeAlumniValue('lastName', value)}
                            onSubmitEditing={() => firstNameRef.current.focus()}
                            autoCapitalize='words'
                            label='Họ'
                            error={showAlumniError.lastName}
                        />
                        <HelperText type='error' visible={showAlumniError.lastName}>
                            {alumniErrorMessage.lastName}
                        </HelperText>
                    </View>

                    <View style={styles.firstNameInput}>
                        <TextInput
                            ref={firstNameRef}
                            mode='outlined'
                            value={alumni.firstName}
                            onChangeText={value => handleChangeAlumniValue('firstName', value)}
                            onSubmitEditing={() => dateOfBirthRef.current.focus()}
                            autoCapitalize='words'
                            label='Tên'
                            error={showAlumniError.firstName}
                        />
                        <HelperText type='error' visible={showAlumniError.firstName}>
                            {alumniErrorMessage.firstName}
                        </HelperText>
                    </View>
                </View>

                <View>
                    <DatePickerInput
                        ref={dateOfBirthRef}
                        mode='outlined'
                        value={alumni.dateOfBirth}
                        onChange={value => handleChangeAlumniValue('dateOfBirth', value)}
                        locale='en-GB'
                        inputMode='start'
                        label='Ngày sinh'
                        iconColor={showAlumniError.dateOfBirth ? theme.colors.error : undefined}
                        hasError={showAlumniError.dateOfBirth}
                    />
                    <HelperText type='error' visible={showAlumniError.dateOfBirth}>
                        {alumniErrorMessage.dateOfBirth}
                    </HelperText>
                </View>

                <View>
                    <DropDown
                        ref={genderRef}
                        mode='outlined'
                        value={alumni.gender}
                        setValue={value => handleChangeAlumniValue('gender', value)}
                        visible={showGenderDropDown}
                        showDropDown={() => setShowGenderDropDown(true)}
                        onDismiss={() => setShowGenderDropDown(false)}
                        list={genders}
                        inputProps={{
                            right: <TextInput.Icon
                                icon={showGenderDropDown ? "menu-up" : "menu-down"}
                                color={showAlumniError.gender ? theme.colors.error : undefined}
                            />,
                            error: showAlumniError.gender,
                        }}
                        dropDownItemTextStyle={{ color: theme.colors.onSurfaceVariant }}
                        label='Giới tính'
                    />
                    <HelperText type='error' visible={showAlumniError.gender}>
                        {alumniErrorMessage.gender}
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        ref={studentIdRef}
                        mode='outlined'
                        value={alumni.studentId}
                        onChangeText={value => handleChangeAlumniValue('studentId', value)}
                        keyboardType='numeric'
                        autoCapitalize='none'
                        label='Mã số sinh viên'
                        error={showAlumniError.studentId}
                    />
                    <HelperText type='error' visible={showAlumniError.studentId}>
                        {alumniErrorMessage.studentId}
                    </HelperText>
                </View>

                <View>
                    <DropDown
                        ref={facultyRef}
                        mode='outlined'
                        value={alumni.faculty}
                        setValue={value => handleChangeAlumniValue('faculty', value)}
                        visible={showFacultyDropDown}
                        showDropDown={() => setShowFacultyDropDown(true)}
                        onDismiss={() => setShowFacultyDropDown(false)}
                        list={faculties}
                        inputProps={{
                            right: <TextInput.Icon
                                icon={showFacultyDropDown ? "menu-up" : "menu-down"}
                                color={showAlumniError.faculty ? theme.colors.error : undefined}
                            />,
                            error: showAlumniError.faculty,
                        }}
                        dropDownItemTextStyle={{ color: theme.colors.onSurfaceVariant }}
                        label='Khoa'
                    />
                    <HelperText type='error' visible={showAlumniError.faculty}>
                        {alumniErrorMessage.faculty}
                    </HelperText>
                </View>

                <View>
                    <DropDown
                        ref={majorRef}
                        mode='outlined'
                        value={alumni.major}
                        setValue={value => handleChangeAlumniValue('major', value)}
                        visible={showMajorDropDown}
                        showDropDown={() => setShowMajorDropDown(true)}
                        onDismiss={() => setShowMajorDropDown(false)}
                        list={majors}
                        inputProps={{
                            right: <TextInput.Icon
                                icon={showMajorDropDown ? "menu-up" : "menu-down"}
                                color={showAlumniError.major ? theme.colors.error : undefined}
                            />,
                            error: showAlumniError.major,
                        }}
                        dropDownItemTextStyle={{ color: theme.colors.onSurfaceVariant }}
                        label='Ngành'
                    />
                    <HelperText type='error' visible={showAlumniError.major}>
                        {alumniErrorMessage.major}
                    </HelperText>
                </View>

                <View>
                    <DropDown
                        ref={schoolYearRef}
                        mode='outlined'
                        value={alumni.schoolYear}
                        setValue={value => handleChangeAlumniValue('schoolYear', value)}
                        visible={showSchoolYearDropDown}
                        showDropDown={() => setShowSchoolYearDropDown(true)}
                        onDismiss={() => setShowSchoolYearDropDown(false)}
                        list={schoolYears}
                        inputProps={{
                            right: <TextInput.Icon
                                icon={showSchoolYearDropDown ? "menu-up" : "menu-down"}
                                color={showAlumniError.schoolYear ? theme.colors.error : undefined}
                            />,
                            error: showAlumniError.schoolYear,
                        }}
                        dropDownItemTextStyle={{ color: theme.colors.onSurfaceVariant }}
                        label='Niên khóa'
                    />
                    <HelperText type='error' visible={showAlumniError.schoolYear}>
                        {alumniErrorMessage.schoolYear}
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        ref={workplaceRef}
                        mode='outlined'
                        value={alumni.workplace}
                        onChangeText={value => handleChangeAlumniValue('workplace', value)}
                        onSubmitEditing={() => positionRef.current.focus()}
                        label='Nơi làm việc'
                    />
                    <HelperText type='error' visible={false}></HelperText>
                </View>

                <View>
                    <TextInput
                        ref={positionRef}
                        mode='outlined'
                        value={alumni.position}
                        onChangeText={value => handleChangeAlumniValue('position', value)}
                        onSubmitEditing={() => emailRef.current.focus()}
                        label='Chức vụ'
                    />
                    <HelperText type='error' visible={false}></HelperText>
                </View>

                <View>
                    <TextInput
                        ref={emailRef}
                        mode='outlined'
                        value={alumni.email}
                        onChangeText={value => handleChangeAlumniValue('email', value)}
                        onSubmitEditing={() => usernameRef.current.focus()}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoComplete='email'
                        textContentType='emailAddress'
                        label='Email'
                        error={showAlumniError.email}
                    />
                    <HelperText type='error' visible={showAlumniError.email}>
                        {alumniErrorMessage.email}
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        ref={usernameRef}
                        mode='outlined'
                        value={alumni.username}
                        onChangeText={value => handleChangeAlumniValue('username', value)}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        autoCapitalize='none'
                        textContentType='username'
                        label='Tên người dùng'
                        error={showAlumniError.username}
                    />
                    <HelperText type='error' visible={showAlumniError.username}>
                        {alumniErrorMessage.username}
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        ref={passwordRef}
                        mode='outlined'
                        value={alumni.password}
                        onChangeText={value => handleChangeAlumniValue('password', value)}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        secureTextEntry={!showPassword}
                        right={
                            <TextInput.Icon
                                icon={showPassword ? 'eye' : 'eye-off'}
                                onPress={handleShowPassword}
                                color={showAlumniError.password ? theme.colors.error : undefined}
                            />
                        }
                        label='Mật khẩu'
                        error={showAlumniError.password}
                    />
                    <HelperText type='error' visible={showAlumniError.password}>
                        {alumniErrorMessage.password}
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        ref={confirmPasswordRef}
                        mode='outlined'
                        value={alumni.confirmPassword}
                        onChangeText={value => handleChangeAlumniValue('confirmPassword', value)}
                        secureTextEntry={!showConfirmPassword}
                        right={
                            <TextInput.Icon
                                icon={showConfirmPassword ? 'eye' : 'eye-off'}
                                onPress={handleShowConfirmPassword}
                                color={showAlumniError.confirmPassword ? theme.colors.error : undefined}
                            />
                        }
                        label='Nhập lại mật khẩu'
                        error={showAlumniError.confirmPassword}
                    />
                    <HelperText type='error' visible={showAlumniError.confirmPassword}>
                        {alumniErrorMessage.confirmPassword}
                    </HelperText>
                </View>

                <View style={{
                    marginTop: 12,
                    marginBottom: 5
                }}>
                    <Card style={{
                        borderWidth: 1,
                        borderColor: showAlumniError.image ? theme.colors.error : theme.colors.onSurfaceVariant,
                    }}>
                        <Card.Cover
                            source={alumni.image ? { uri: alumni.image.uri } : require('../../../assets/images/default-image.jpg')}
                            style={{ ...styles.image, height: 400 }}
                        />
                        <Button
                            mode='text'
                            icon='image'
                            style={styles.imagePicker}
                            onPress={handlePickImage}
                            textColor={showAlumniError.image ? theme.colors.error : theme.colors.onSurfaceVariant}
                        >
                            {alumni.image ? alumni.image.fileName : 'Chọn hình ảnh...'}
                        </Button>
                    </Card>
                    <HelperText type='error' visible={showAlumniError.image}>
                        {alumniErrorMessage.image}
                    </HelperText>
                </View>
            </ScrollView >

            <View style={styles.actions}>
                <Button style={styles.registerButton} mode='contained' onPress={handleRegister}>
                    {loading ? <ActivityIndicator color={theme.colors.onPrimary} size={18} /> : 'Đăng ký'}
                </Button>

                <Portal>
                    <Dialog visible={showDialog} onDismiss={handleHideDialog}>
                        <Dialog.Title>{dialogTitle}</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>{dialogMessage}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleHideDialog}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <Button mode='outlined' onPress={handleBackToLoginScreen}>Quay lại</Button>
            </View>
        </View >
    );
}

export default AlumniRegisterScreen;