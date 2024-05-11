import axios from "axios";

const HOST = 'http://192.168.1.6:8000';

export const endpoints = {
    'genders': '/genders/',
    'faculties': '/faculties/',
    'majors': (facultyId) => `/faculties/${facultyId}/majors/`,
    'school-years': '/school-years/',
    'login': '/o/token/',
    'currentUser': '/users/current-user/',
    'checkPassword': '/users/check-password/',
    'alumniRegister': '/alumni-profiles/register/',
}

export const authAxios = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    }
});

export default axios.create({
    baseURL: HOST,
});